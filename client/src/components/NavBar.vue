<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="#" class="navbar-brand">
        <div class="navbar-logo">
          <img
            v-if="navbar.logo.imageUrl"
            :src="resolveUploadUrl(navbar.logo.imageUrl)"
            :alt="navbar.logo.altText"
            class="navbar-logo-image"
          >
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <span class="navbar-title">{{ navbar.logo.altText || 'Midden-Beemster' }}</span>
      </a>

      <div class="navbar-links">
        <a
          v-for="item in navbar.items"
          :key="item.id"
          :href="item.link"
          :class="item.id === navbar.items[navbar.items.length - 1]?.id ? 'nav-btn' : 'nav-link'"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { resolveUploadUrl } from '../services/admin.js'

const activeCard = ref('info')
const navbar = ref({
  logo: {
    imageUrl: '',
    altText: 'Midden-Beemster',
    width: 180,
    height: 48,
  },
  items: [],
})

onMounted(async () => {
  const res = await fetch('http://localhost:3000/api/content/navbar')
  navbar.value = await res.json()
})
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #1c2b1c;
  padding: 0 2rem;
  height: 60px;
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.navbar-logo {
  width: 34px;
  height: 34px;
  background-color: #c9a55a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c2b1c;
  flex-shrink: 0;
  overflow: hidden;
}

.navbar-logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.navbar-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.9rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
}

.nav-link:hover {
  color: white;
}

.nav-btn {
  background-color: #c9a55a;
  color: #1c2b1c;
  padding: 0.45rem 1.1rem;
  border-radius: 20px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: #b8923f;
}
</style>