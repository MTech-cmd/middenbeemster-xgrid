<template>
  <section class="home-shell">
    <div class="home-grid">
      <article class="home-card home-intro">
        <div class="home-badge">Home</div>
        <h2>Recente pagina's</h2>
        <p>
          Hier zie je de meest recente pagina's waar aan gewerkt is voor
          <strong>{{ websiteLabel }}</strong>.
        </p>

        <div class="home-stats">
          <div class="stat-box">
            <span class="stat-value">{{ recentPages.length }}</span>
            <span class="stat-label">Pagina's gevonden</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">{{ websiteLabel }}</span>
            <span class="stat-label">Actieve website</span>
          </div>
        </div>
      </article>

      <article class="home-card home-list">
        <div class="card-head">
          <h3>Meest recent bewerkt</h3>
          <span class="card-subtitle">Op basis van de laatste wijziging</span>
        </div>

        <div v-if="loading" class="home-state">Pagina's laden...</div>

        <div v-else-if="errorMessage" class="home-state home-state-error">
          {{ errorMessage }}
        </div>

        <div v-else-if="recentPages.length === 0" class="home-state">
          Nog geen pagina's om te tonen.
        </div>

        <div v-else class="recent-list">
          <article
            v-for="page in recentPages"
            :key="page.id"
            class="recent-item"
          >
            <div>
              <div class="recent-route">{{ page.Routing }}</div>
              <div class="recent-template">{{ page.Template }}</div>
            </div>

            <div class="recent-meta">
              <span>{{ formatDate(page.UpdatedAt || page.CreatedAt) }}</span>
              <button class="recent-action" type="button" @click="openPage(page.id)">
                Open
              </button>
            </div>
          </article>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getPages } from '../../services/admin.js'

const props = defineProps({
  websiteId: {
    type: String,
    default: '',
  },
  websiteLabel: {
    type: String,
    default: 'de actieve website',
  },
})

const emit = defineEmits(['open-page'])

const pages = ref([])
const loading = ref(false)
const errorMessage = ref('')

const recentPages = computed(() => [...pages.value].slice(0, 6))

function formatDate(value) {
  if (!value) return 'Zojuist'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Zojuist'

  return date.toLocaleString('nl-NL', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function openPage(pageId) {
  emit('open-page', pageId)
}

async function loadPages() {
  loading.value = true
  errorMessage.value = ''

  try {
    pages.value = await getPages(props.websiteId)
  } catch (error) {
    errorMessage.value = error.message || "Kon pagina's niet laden."
  } finally {
    loading.value = false
  }
}

onMounted(loadPages)

watch(
  () => props.websiteId,
  () => {
    loadPages()
  }
)
</script>

<style scoped>
.home-shell {
  padding: 1.3rem;
}

.home-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 1rem;
}

.home-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: linear-gradient(180deg, #17171a 0%, #111113 100%);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
  padding: 1.25rem;
}

.home-badge {
  display: inline-flex;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #2a1114;
  color: #ffb3bb;
  border: 1px solid #4a2026;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.home-intro h2,
.card-head h3 {
  margin: 0;
  color: #ffffff;
}

.home-intro p {
  margin: 0.85rem 0 0;
  color: #d8d8d8;
  line-height: 1.6;
}

.home-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.stat-box {
  border-radius: 18px;
  padding: 0.95rem;
  background: #1f1214;
  border: 1px solid #4a2026;
  display: grid;
  gap: 0.3rem;
}

.stat-value {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
}

.stat-label,
.card-subtitle,
.recent-template,
.home-state {
  color: #d8d8d8;
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.card-subtitle {
  font-size: 0.9rem;
}

.recent-list {
  display: grid;
  gap: 0.75rem;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  background: #17171a;
  border: 1px solid #343434;
}

.recent-route {
  color: #ffffff;
  font-weight: 700;
}

.recent-template {
  margin-top: 0.25rem;
  font-size: 0.92rem;
}

.recent-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  color: #b8b8b8;
  font-size: 0.85rem;
  white-space: nowrap;
}

.recent-action {
  border: 0;
  border-radius: 999px;
  padding: 0.55rem 0.95rem;
  background: linear-gradient(135deg, #d72638 0%, #a91d2a 100%);
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.home-state {
  padding: 1rem;
  border-radius: 18px;
  background: #1a1a1d;
  border: 1px dashed #4a2026;
}

.home-state-error {
  color: #ffb3bb;
}

@media (max-width: 980px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .home-shell {
    padding: 1rem;
  }

  .home-stats {
    grid-template-columns: 1fr;
  }

  .recent-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .recent-meta {
    width: 100%;
    align-items: flex-start;
    white-space: normal;
  }
}
</style>