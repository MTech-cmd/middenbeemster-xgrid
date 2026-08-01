<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <span class="logo-mark">⚙</span>
      <span class="logo-text">Admin</span>
    </div>

    <div class="website-switcher">
      <label for="website-select">Website</label>
      <select
        id="website-select"
        :value="selectedWebsite"
        @change="$emit('website-change', $event.target.value)"
      >
        <option
          v-for="website in websites"
          :key="website.id"
          :value="website.id"
        >
          {{ website.label }}
        </option>
      </select>
    </div>

    <nav class="sidebar-nav">
      <button
        class="nav-item"
        :class="{ active: active === 'home' }"
        @click="$emit('change','home')"
      >
        <i class="ti ti-home"></i>
        <span>Home</span>
      </button>

      <button
        class="nav-item"
        :class="{ active: active === 'pages' }"
        @click="$emit('change','pages')"
      >
        <i class="ti ti-layout-grid"></i>
        <span>Pagina's</span>
      </button>

      <button
        class="nav-item"
        :class="{ active: active === 'navbar' }"
        @click="$emit('change','navbar')"
      >
        <i class="ti ti-menu-2"></i>
        <span>Navigatie</span>
      </button>
    </nav>

    <div class="sidebar-note">
      De gekozen website bepaalt de context van je bewerkingen.
    </div>
  </aside>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    required: true,
  },
  selectedWebsite: {
    type: String,
    required: true,
  },
  websites: {
    type: Array,
    required: true,
  },
})

defineEmits(['change', 'website-change'])
</script>

<style scoped>
.sidebar {

  width: 280px;

  min-height: 100vh;

  padding: 1.4rem 1rem;

  display: flex;

  flex-direction: column;

  gap: 1.2rem;

  background: linear-gradient(180deg, #111113 0%, #1a1a1d 100%);

  border-right: 1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 12px 0 30px rgba(0, 0, 0, 0.28);

}

.sidebar-logo {

  display: flex;

  align-items: center;

  gap: 0.75rem;

  padding: 0.85rem 0.9rem;

  border-radius: 18px;

  background: linear-gradient(135deg, #d72638 0%, #a91d2a 100%);

  color: #ffffff;

}

.logo-mark {

  width: 2rem;

  height: 2rem;

  border-radius: 50%;

  display: grid;

  place-items: center;

  background: rgba(255, 255, 255, 0.14);

  font-size: 1rem;

}

.logo-text {

  font-weight: 700;

  letter-spacing: 0.02em;

}

.website-switcher {

  display: grid;

  gap: 0.45rem;

  padding: 1rem;

  border-radius: 18px;

  background: #17171a;

  border: 1px solid #343434;

}

.website-switcher label {

  font-size: 0.8rem;

  font-weight: 700;

  letter-spacing: 0.12em;

  text-transform: uppercase;

  color: #ffb3bb;

}

.website-switcher select {

  width: 100%;

  border: 1px solid #4a2026;

  border-radius: 14px;

  background: #111113;

  color: #ffffff;

  padding: 0.85rem 0.95rem;

  font: inherit;

}

.website-switcher select:focus {

  outline: none;

  border-color: #d72638;

  box-shadow: 0 0 0 4px rgba(215, 38, 56, 0.15);

}

.sidebar-nav {

  display: grid;

  gap: 0.7rem;

}

.nav-item {

  width: 100%;

  border: 1px solid transparent;

  border-radius: 16px;

  padding: 0.95rem 1rem;

  display: flex;

  align-items: center;

  gap: 0.8rem;

  background: #17171a;

  color: #f5f5f5;

  font: inherit;

  font-weight: 600;

  cursor: pointer;

  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;

}

.nav-item i {

  font-size: 1.15rem;

  color: #d72638;

}

.nav-item:hover {

  transform: translateY(-1px);

  border-color: rgba(215, 38, 56, 0.22);

  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);

}

.nav-item.active {

  background: linear-gradient(135deg, #241115 0%, #161417 100%);

  border-color: rgba(215, 38, 56, 0.28);

  color: #ffffff;

  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);

}

.nav-item.active i {

  color: #ff6b77;

}

.sidebar-note {

  margin-top: auto;

  padding: 0.95rem 1rem;

  border-radius: 18px;

  background: #1a1a1d;

  border: 1px solid #4a2026;

  color: #d8d8d8;

  line-height: 1.5;

}

@media (max-width: 920px) {

  .sidebar {

    width: 100%;

    min-height: auto;

    border-right: 0;

    border-bottom: 1px solid rgba(215, 38, 56, 0.18);

  }

  .sidebar-nav {

    grid-template-columns: repeat(3, minmax(0, 1fr));

  }

}

@media (max-width: 560px) {

  .sidebar-nav {

    grid-template-columns: 1fr;

  }

}
</style>
