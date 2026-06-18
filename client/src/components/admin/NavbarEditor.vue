<template>
  <section class="tab-content">

    <div class="content-header">
      <h1>Navigatiebalk beheren</h1>

      <button
        class="btn-primary"
        :disabled="saving"
        @click="saveNavbar"
      >
        <i class="ti ti-device-floppy"></i>
        {{ saving ? 'Opslaan...' : 'Opslaan' }}
      </button>
    </div>

    <div v-if="error"   class="alert alert-error">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <div class="navbar-editor-grid">

      <!-- Items kolom -->
      <div class="card">

        <div class="card-title-row">
          <h2 class="card-title">Items</h2>

          <button class="btn-ghost" @click="addItem">
            <i class="ti ti-plus"></i>
            Item toevoegen
          </button>
        </div>

        <div class="nav-items-list">

          <div
            v-for="(item, index) in navItems"
            :key="item._id"
            class="nav-item-row"
            draggable="true"
            :class="{ 'drag-over': dragOverIndex === index }"
            @dragstart="dragStart(index)"
            @dragover.prevent="dragOver(index)"
            @drop="dropItem(index)"
          >
            <span class="drag-handle">
              <i class="ti ti-grip-vertical"></i>
            </span>

            <div class="nav-item-fields">
              <input
                v-model="item.Name"
                type="text"
                placeholder="Naam"
                class="nav-field-name"
              >
              <input
                v-model="item.Link"
                type="text"
                placeholder="/over-ons"
                class="nav-field-link"
              >
            </div>

            <button class="remove-field-btn" @click="removeItem(index)">
              <i class="ti ti-trash"></i>
            </button>
          </div>

          <div v-if="navItems.length === 0" class="empty-state">
            Geen navigatie-items
          </div>

        </div>
      </div>

      <!-- Preview kolom -->
      <div class="card preview-card">

        <h2 class="card-title">Live preview</h2>

        <div class="navbar-preview">
          <div class="preview-brand">Middenbeemster Smidse</div>

          <nav class="preview-nav">
            <a
              v-for="item in navItems"
              :key="item._id"
              href="#"
              class="preview-link"
              @click.prevent
            >
              {{ item.Name || 'Item' }}
            </a>
          </nav>

          <button class="preview-cta">Contact</button>
        </div>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const BASE_URL = 'http://localhost:3000/api'

const navItems     = ref([])
const saving       = ref(false)
const success      = ref('')
const error        = ref('')
const dragIndex    = ref(null)
const dragOverIndex = ref(null)

onMounted(loadNavbar)

async function loadNavbar() {
  try {
    const res = await fetch(`${BASE_URL}/admin/navbar`)

    if (!res.ok) throw new Error('Laden mislukt')

    const data = await res.json()

    navItems.value = data.map(item => ({
      ...item,
      _id: item.id || Date.now()
    }))
  } catch {
    navItems.value = []
  }
}

function addItem() {
  navItems.value.push({ _id: Date.now(), Name: '', Link: '' })
}

function removeItem(index) {
  navItems.value.splice(index, 1)
}

async function saveNavbar() {
  saving.value = true
  error.value   = ''
  success.value  = ''

  try {
    for (const item of navItems.value) {
      const payload = { Name: item.Name, Link: item.Link }

      if (item.id) {
        await fetch(`${BASE_URL}/admin/navbar/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      } else {
        await fetch(`${BASE_URL}/admin/navbar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }
    }

    success.value = 'Navigatie opgeslagen'
  } catch (e) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}

function dragStart(index) {
  dragIndex.value = index
}

function dragOver(index) {
  dragOverIndex.value = index
}

function dropItem(index) {
  const from = dragIndex.value

  if (from === null) return

  const items = [...navItems.value]
  const moved = items.splice(from, 1)[0]
  items.splice(index, 0, moved)

  navItems.value      = items
  dragIndex.value     = null
  dragOverIndex.value = null
}
</script>
