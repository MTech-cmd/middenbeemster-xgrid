<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <div>
          <p class="footer-brand-name">{{ get('1') }}</p>
          <p class="footer-brand-sub">{{ get('2') }}</p>
        </div>
      </div>

      <div class="footer-center">
        <p class="footer-meta">{{ get('3') }}</p>
        <p class="footer-copy">{{ get('4') }}</p>
      </div>

      <div class="footer-links">
        <a href="#" class="footer-link">{{ get('5') }}</a>
        <a href="#" class="footer-link">{{ get('6') }}</a>
        <a href="#" class="footer-link">{{ get('7') }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const activeCard = ref('info')
const data = ref([])

// helper functie
const get = (id) => {
  return data.value.find(item => item.ApiName === id)?.Content || ''
}

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/content/FooterSection')
  data.value = await res.json()
})
</script>
<style scoped>
.footer {
  background-color: #1c2b1c;
  padding: 2rem 1.25rem;
}

/* Mobile-first: gestapeld gecentreerd */
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.25rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo {
  width: 36px;
  height: 36px;
  background-color: #c9a55a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c2b1c;
  flex-shrink: 0;
}

.footer-brand-name {
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.footer-brand-sub {
  color: rgba(255,255,255,0.45);
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
}

.footer-center {
  text-align: center;
}

.footer-meta {
  color: rgba(255,255,255,0.5);
  font-size: 0.78rem;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.2rem;
}

.footer-copy {
  color: rgba(255,255,255,0.35);
  font-size: 0.74rem;
  font-family: 'Inter', sans-serif;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-link {
  color: rgba(255,255,255,0.55);
  text-decoration: none;
  font-size: 0.82rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}

.footer-link:hover {
  color: white;
}

/* Desktop */
@media (min-width: 700px) {
  .footer {
    padding: 2rem;
  }

  .footer-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    gap: 2rem;
  }
}
</style>
