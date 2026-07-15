```vue
<template>
  <div class="admin-layout">

    <!-- Sidebar -->
    <Sidebar
      :active="activeTab"
      @change="changeTab"
    />

    <!-- Main -->
    <main class="admin-main">

      <!-- PAGINA'S -->
      <PageEditor
        v-if="activeTab === 'pages'"
      />

      <!-- NAVBAR -->
      <NavbarEditor
        v-if="activeTab === 'navbar'"
      />

    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'

import Sidebar from './Sidebar.vue'

import PageEditor from './PageEditor.vue'
import NavbarEditor from './NavbarEditor.vue'

const activeTab = ref('pages')

function changeTab(tab) {

  activeTab.value = tab

}
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
```
