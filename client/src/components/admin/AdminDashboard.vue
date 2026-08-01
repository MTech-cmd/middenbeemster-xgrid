```vue
<template>
  <div class="admin-layout">
    <Sidebar
      :active="activeTab"
      :selected-website="selectedWebsite"
      :websites="websites"
      @change="changeTab"
      @website-change="changeWebsite"
    />

    <main class="admin-main">
      <section class="admin-hero">
        <div>
          <p class="admin-kicker">Admin portal</p>
          <h1>Beheeromgeving</h1>
          <p class="admin-subtitle">
            Werk content, pagina's en navigatie bij voor {{ currentWebsiteLabel }}.
          </p>
        </div>

        <div class="admin-status">
          <span class="status-dot"></span>
          <span>{{ currentWebsiteLabel }}</span>
        </div>
      </section>

      <div class="admin-panel">
        <AdminHome
          v-if="activeTab === 'home'"
            :website-id="selectedWebsite"
            :website-label="currentWebsiteLabel"
          @open-page="openPage"
        />

        <PageEditor
          v-if="activeTab === 'pages'"
            :website-id="selectedWebsite"
            :website-label="currentWebsiteLabel"
          ref="pageEditorRef"
        />

        <NavbarEditor
          v-if="activeTab === 'navbar'"
          :website-id="selectedWebsite"
          :website-label="currentWebsiteLabel"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import Sidebar from './Sidebar.vue'
import AdminHome from './AdminHome.vue'
import PageEditor from './PageEditor.vue'
import NavbarEditor from './NavbarEditor.vue'

const websites = [
  { id: 'middenbeemster-smidse', label: 'Middenbeemster Smidse' },
  { id: 'werelderfgoed-beemster', label: 'Werelderfgoed Beemster' },
  { id: 'test-omgeving', label: 'Test omgeving' },
]

const activeTab = ref('home')
const selectedWebsite = ref(
  localStorage.getItem('admin-selected-website') || websites[0].id
)
const pageEditorRef = ref(null)

const currentWebsiteLabel = computed(() => {
  const website = websites.find(item => item.id === selectedWebsite.value)
  return website?.label || websites[0].label
})

function changeTab(tab) {
  activeTab.value = tab
}

function changeWebsite(websiteId) {
  selectedWebsite.value = websiteId
  localStorage.setItem('admin-selected-website', websiteId)
}

function openPage(pageId) {
  activeTab.value = 'pages'
  pageEditorRef.value?.loadPage(pageId)
}
</script>

<style scoped>
.admin-layout {

  --admin-red: #d72638;
  --admin-red-strong: #a91d2a;
  --admin-red-soft: #2a1114;
  --admin-text: #f5f5f5;
  --admin-muted: #b8b8b8;
  --admin-shadow: 0 18px 50px rgba(0, 0, 0, 0.28);

  display: flex;

  min-height: 100vh;

  background:
    radial-gradient(circle at top left, rgba(215, 38, 56, 0.18), transparent 35%),
    linear-gradient(180deg, #0f0f10 0%, #1a1a1d 100%);

  color: var(--admin-text);

}

.admin-main {

  flex: 1;

  padding: 2rem;

  display: grid;

  gap: 1.25rem;

  overflow-y: auto;

}

.admin-hero {

  display: flex;

  align-items: flex-end;

  justify-content: space-between;

  gap: 1rem;

  padding: 1.5rem 1.6rem;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 24px;

  background: rgba(18, 18, 20, 0.82);

  backdrop-filter: blur(12px);

  box-shadow: var(--admin-shadow);

}

.admin-kicker {

  margin: 0 0 0.4rem;

  font-size: 0.76rem;

  font-weight: 700;

  letter-spacing: 0.16em;

  text-transform: uppercase;

  color: var(--admin-red);

}

.admin-hero h1 {

  margin: 0;

  font-size: 2rem;

  line-height: 1.1;

  color: #ffffff;

}

.admin-subtitle {

  margin: 0.45rem 0 0;

  max-width: 64ch;

  color: var(--admin-muted);

  line-height: 1.6;

}

.admin-status {

  display: inline-flex;

  align-items: center;

  gap: 0.5rem;

  padding: 0.72rem 1rem;

  border-radius: 999px;

  background: var(--admin-red-soft);

  color: var(--admin-red-strong);

  font-weight: 600;

  white-space: nowrap;

}

.status-dot {

  width: 0.6rem;

  height: 0.6rem;

  border-radius: 50%;

  background: #d72638;

  box-shadow: 0 0 0 6px rgba(215, 38, 56, 0.18);

}

.admin-panel {

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 28px;

  background: rgba(17, 17, 19, 0.92);

  box-shadow: var(--admin-shadow);

  overflow: hidden;

}

@media (max-width: 920px) {

  .admin-layout {

    flex-direction: column;

  }

  .admin-main {

    padding: 1rem;

  }

  .admin-hero {

    flex-direction: column;

    align-items: flex-start;

  }

}

@media (max-width: 640px) {

  .admin-hero {

    padding: 1.1rem;

    border-radius: 20px;

  }

  .admin-hero h1 {

    font-size: 1.6rem;

  }

}
</style>
