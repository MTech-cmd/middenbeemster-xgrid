<template>
  <div class="admin-layout">

    <Sidebar />

    <main class="admin-main">
      <RouterView />
    </main>

  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import Sidebar from '@/components/admin/Sidebar.vue'
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f4f0;
}

.admin-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>
