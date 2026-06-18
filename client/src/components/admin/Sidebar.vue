<template>
  <aside class="sidebar">

    <div class="sidebar-logo">
      <span class="logo-mark">⚙</span>
      <span class="logo-text">Admin</span>
    </div>

    <nav class="sidebar-nav">

      <RouterLink
        to="/admin/pages"
        class="nav-item"
        :class="{ active: isPagesActive }"
      >
        <i class="ti ti-layout-grid"></i>
        <span>Pagina's</span>
      </RouterLink>

      <RouterLink
        to="/admin/navbar"
        class="nav-item"
        :class="{ active: isNavbarActive }"
      >
        <i class="ti ti-menu-2"></i>
        <span>Navigatie</span>
      </RouterLink>

    </nav>

    <slot />

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isPagesActive = computed(() =>
  route.name === 'admin-pages' || route.name === 'admin-page-edit'
)

const isNavbarActive = computed(() => route.name === 'admin-navbar')
</script>
