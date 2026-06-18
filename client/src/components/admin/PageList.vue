<template>
  <section class="tab-content">

    <div class="content-header">
      <div>
        <h1>Pagina's</h1>
        <p class="subtitle">Beheer je pagina's, routes en templates</p>
      </div>

      <RouterLink to="/admin/pages/new" class="btn-primary">
        Nieuwe pagina
      </RouterLink>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div class="card">
      <div v-if="loading" class="state-msg">Pagina's laden...</div>

      <div v-else-if="pages.length === 0" class="state-msg">
        Geen pagina's gevonden. Voeg er een toe!
      </div>

      <table v-else class="pages-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Route</th>
            <th>Template</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="page in pages"
            :key="page.id"
            class="page-row"
            @click="goToEdit(page.id)"
          >
            <td class="id-cell">{{ page.id }}</td>
            <td><code class="route">{{ page.Routing || page.routing }}</code></td>
            <td>{{ page.Template || page.template || '—' }}</td>
            <td class="actions-cell" @click.stop>
              <button class="btn-ghost" @click="goToEdit(page.id)">Bewerken</button>
              <button class="btn-ghost" @click="confirmDelete(page)">Verwijderen</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { getPages, deletePage } from '@/services/admin.js'

const router = useRouter()

const pages   = ref([])
const loading = ref(false)
const error   = ref('')

onMounted(fetchPages)

async function fetchPages() {
  loading.value = true
  error.value   = ''

  try {
    pages.value = await getPages()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function goToEdit(id) {
  router.push(`/admin/pages/${id}`)
}

async function confirmDelete(page) {
  const label = page.Routing || page.routing || page.id

  if (!window.confirm(`Pagina "${label}" verwijderen?`)) return

  try {
    await deletePage(page.id)
    pages.value = pages.value.filter(p => p.id !== page.id)
  } catch (e) {
    error.value = e.message
  }
}
</script>
