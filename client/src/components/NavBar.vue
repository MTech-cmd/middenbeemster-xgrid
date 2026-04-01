<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="#" class="navbar-brand">
        <div class="navbar-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <span class="navbar-title">Midden-Beemster</span>
      </a>

      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }" aria-label="Menu openen">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar-links" :class="{ open: menuOpen }">
        <a href="#ontdekken" class="nav-link" @click="menuOpen = false">Ontdekken</a>
        <a href="#tour" class="nav-link" @click="menuOpen = false">3D Tour</a>
        <a href="#spelen" class="nav-btn" @click="menuOpen = false">Speel Nu →</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #1c2b1c;
  padding: 0 1.25rem;
  height: 60px;
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
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
}

.navbar-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

/* Hamburger — zichtbaar op mobile */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Dropdown menu op mobile */
.navbar-links {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: -1.25rem;
  right: -1.25rem;
  background-color: #1c2b1c;
  padding: 0.5rem 1.25rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.navbar-links.open {
  display: flex;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: color 0.2s;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.nav-link:hover {
  color: white;
}

.nav-btn {
  background-color: #c9a55a;
  color: #1c2b1c;
  padding: 0.75rem 1.1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s;
  margin-top: 0.75rem;
  text-align: center;
}

.nav-btn:hover {
  background-color: #b8923f;
}

/* Desktop */
@media (min-width: 768px) {
  .navbar {
    padding: 0 2rem;
  }

  .hamburger {
    display: none;
  }

  .navbar-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    position: static;
    background: none;
    padding: 0;
    border-top: none;
    box-shadow: none;
  }

  .nav-link {
    padding: 0;
    border-bottom: none;
    font-size: 0.9rem;
  }

  .nav-btn {
    margin-top: 0;
    padding: 0.45rem 1.1rem;
    border-radius: 20px;
    text-align: left;
  }
}
</style>
