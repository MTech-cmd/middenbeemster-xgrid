<template>
  <section class="tab-content">
    <div class="content-header">
      <div>
        <p class="section-kicker">Navigatie</p>
        <h1>Navbar beheren</h1>
        <p class="section-subtitle">
          Boven zie je een live preview van de navbar. Daaronder beheer je de blokken voor {{ websiteLabel }}.
        </p>
      </div>

      <div class="header-pill">
        {{ websiteLabel }}
      </div>
    </div>

    <div v-if="error" class="alert alert-error">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>

    <div class="navbar-editor-layout">
      <section class="card preview-card">
        <div class="card-title-row">
          <h2 class="card-title">Preview</h2>
          <span class="preview-note">Logo en links zoals ze live zichtbaar zijn</span>
        </div>

        <div class="navbar-preview">
          <div class="preview-logo-wrap">
            <img
              v-if="logoPreviewSrc"
              :src="logoPreviewSrc"
              :alt="logo.altText"
              class="preview-logo-image"
              :style="logoImageStyle"
            >
            <div v-else class="preview-logo-placeholder">
              Logo
            </div>
          </div>

          <nav class="preview-links" aria-label="Navbar preview">
            <a
              v-for="block in items"
              :key="block.id"
              href="#"
              class="preview-link"
              @click.prevent
            >
              {{ block.name || 'Nieuw blok' }}
            </a>
          </nav>
        </div>
      </section>

      <section class="card editor-card">
        <div class="card-title-row">
          <h2 class="card-title">Blokken</h2>
          <button class="btn-ghost" type="button" @click="addBlock">
            <i class="ti ti-plus"></i>
            Blok toevoegen
          </button>
        </div>

        <div class="editor-stack">
          <article class="block-card logo-card">
            <div class="block-head">
              <div>
                <p class="block-type">Standaard blok</p>
                <h3>Logo</h3>
              </div>
              <span class="block-lock">Niet verwijderbaar</span>
            </div>

            <div class="logo-editor-grid">
              <div class="logo-preview-box">
                <img
                  v-if="logoPreviewSrc"
                  :src="logoPreviewSrc"
                  :alt="logo.altText"
                  class="logo-preview-image"
                  :style="logoImageStyle"
                >
                <div v-else class="logo-placeholder">
                  Voeg een logo-afbeelding toe
                </div>
              </div>

              <div class="logo-fields">
                <label class="field-label" for="logo-upload">Logo afbeelding</label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  class="field-input"
                  @change="handleLogoUpload"
                >

                <label class="field-label" for="logo-url">Afbeeldings-URL</label>
                <input
                  id="logo-url"
                  v-model="logo.imageUrl"
                  type="text"
                  class="field-input"
                  placeholder="/uploads/logo.png"
                >

                <label class="field-label" for="logo-alt">Alt-tekst</label>
                <input
                  id="logo-alt"
                  v-model="logo.altText"
                  type="text"
                  class="field-input"
                  placeholder="Middenbeemster Smidse"
                >

                <div class="size-grid">
                  <div>
                    <label class="field-label" for="logo-width">Breedte</label>
                    <input
                      id="logo-width"
                      v-model.number="logo.width"
                      type="number"
                      min="1"
                      class="field-input"
                    >
                  </div>

                  <div>
                    <label class="field-label" for="logo-height">Hoogte</label>
                    <input
                      id="logo-height"
                      v-model.number="logo.height"
                      type="number"
                      min="1"
                      class="field-input"
                    >
                  </div>
                </div>

                <p class="helper-text">
                  Aanbevolen formaat: 180 x 48 px. Houd het logo compact zodat de navbar rustig blijft.
                </p>
              </div>
            </div>
          </article>

          <article
            v-for="block in items"
            :key="block.id"
            class="block-card nav-card"
          >
            <div class="block-head">
              <div>
                <p class="block-type">Link blok</p>
                <h3>{{ block.name || 'Nieuw blok' }}</h3>
              </div>

              <div class="block-actions">
                <button class="btn-chip" type="button" @click="toggleBlock(block.id)">
                  {{ block.isEditing ? 'Sluiten' : 'Bewerken' }}
                </button>
                <button class="btn-chip danger" type="button" @click="removeBlock(block.id)">
                  Verwijderen
                </button>
              </div>
            </div>

            <div v-if="block.isEditing" class="block-form">
              <div class="field-group">
                <label class="field-label" :for="`name-${block.id}`">Naam</label>
                <input
                  :id="`name-${block.id}`"
                  v-model="block.name"
                  type="text"
                  class="field-input"
                  placeholder="Over ons"
                >
              </div>

              <div class="field-group">
                <label class="field-label" :for="`link-${block.id}`">Link</label>
                <input
                  :id="`link-${block.id}`"
                  v-model="block.link"
                  type="text"
                  class="field-input"
                  placeholder="/over-ons"
                >
              </div>
            </div>
          </article>

          <div v-if="items.length === 0" class="empty-state">
            Nog geen blokken toegevoegd.
          </div>
        </div>

        <div class="editor-footer">
          <button
            class="btn-primary"
            type="button"
            @click="save"
            :disabled="saving"
          >
            <i class="ti ti-device-floppy"></i>
            {{ saving ? 'Opslaan...' : 'Opslaan' }}
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import {
  getNavbar,
  saveNavbar,
  uploadImage,
} from '../../services/admin.js'

const props = defineProps({
  websiteId: {
    type: String,
    default: '',
  },
  websiteLabel: {
    type: String,
    default: 'de actieve website',
  },
})

const saving = ref(false)
const error = ref('')
const success = ref('')
const logo = ref(createDefaultLogo())
const items = ref([])

const logoImageStyle = computed(() => ({
  width: `${Number(logo.value.width) || 180}px`,
  height: `${Number(logo.value.height) || 48}px`,
}))

const logoPreviewSrc = computed(() => resolveAssetUrl(logo.value.imageUrl))

onMounted(loadNavbar)

function createDefaultLogo() {
  return {
    imageUrl: '',
    altText: 'Middenbeemster Smidse',
    width: 180,
    height: 48,
  }
}

function resolveAssetUrl(value) {
  if (!value) return ''
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value, 'http://localhost:3000').href
}

function createBlock(overrides = {}) {
  return {
    id: `block-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: '',
    link: '',
    isEditing: true,
    ...overrides,
  }
}

function normalizeNavbar(data) {
  const source = Array.isArray(data) ? { items: data } : (data || {})
  const incomingLogo = source.logo || {}
  const incomingItems = Array.isArray(source.items) ? source.items : []

  logo.value = {
    imageUrl: incomingLogo.imageUrl || '',
    altText: incomingLogo.altText || 'Middenbeemster Smidse',
    width: Number(incomingLogo.width) || 180,
    height: Number(incomingLogo.height) || 48,
  }

  items.value = incomingItems.map((item, index) => ({
    id: item.id ?? `saved-${index}-${Date.now()}`,
    name: item.name ?? item.Name ?? '',
    link: item.link ?? item.Link ?? '',
    isEditing: false,
  }))
}

async function loadNavbar() {
  error.value = ''

  try {
    const data = await getNavbar(props.websiteId)
    normalizeNavbar(data)
  } catch (exception) {
    logo.value = createDefaultLogo()
    items.value = [
      createBlock({
        name: 'Midden-Beemster',
        link: '/',
        isEditing: false,
      }),
      createBlock({
        name: 'Ontdekken',
        link: '/ontdekken',
        isEditing: false,
      }),
      createBlock({
        name: '3D Tour',
        link: '/3d-tour',
        isEditing: false,
      }),
    ]
    success.value = ''
    error.value = exception.message || 'Kon de navbar niet laden.'
  }
}

function addBlock() {
  items.value.unshift(createBlock())
}

function toggleBlock(id) {
  const block = items.value.find(item => item.id === id)
  if (block) {
    block.isEditing = !block.isEditing
  }
}

function removeBlock(id) {
  items.value = items.value.filter(item => item.id !== id)
}

async function handleLogoUpload(event) {
  const [file] = event.target.files || []
  if (!file) return

  try {
    error.value = ''
    const url = await uploadImage(file)
    logo.value.imageUrl = url
  } catch (exception) {
    error.value = exception.message || 'Logo uploaden mislukt.'
  } finally {
    event.target.value = ''
  }
}

async function save() {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const payload = {
      logo: {
        imageUrl: logo.value.imageUrl,
        altText: logo.value.altText,
        width: Number(logo.value.width) || 180,
        height: Number(logo.value.height) || 48,
      },
      items: items.value
        .map(item => ({
          id: item.id,
          name: item.name,
          link: item.link,
        }))
        .filter(item => item.name.trim() || item.link.trim()),
    }

    const saved = await saveNavbar(payload, props.websiteId)
    normalizeNavbar(saved)
    success.value = 'Navbar opgeslagen.'
  } catch (exception) {
    error.value = exception.message || 'Opslaan mislukt.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.tab-content {
  padding: 1.3rem;
  display: grid;
  gap: 1rem;
}

.content-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.section-kicker {
  margin: 0 0 0.35rem;
  color: #ffb3bb;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.content-header h1,
.card-title,
.block-card h3 {
  margin: 0;
  color: #ffffff;
}

.section-subtitle,
.preview-note,
.helper-text,
.block-type,
.block-lock,
.empty-state {
  color: #d8d8d8;
}

.section-subtitle {
  margin: 0.45rem 0 0;
  max-width: 68ch;
  line-height: 1.6;
}

.header-pill {
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: #2a1114;
  color: #ffb3bb;
  border: 1px solid #4a2026;
  font-weight: 700;
  white-space: nowrap;
}

.navbar-editor-layout {
  display: grid;
  gap: 1rem;
}

.card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  background: linear-gradient(180deg, #17171a 0%, #111113 100%);
  padding: 1.25rem;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
}

.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.btn-primary,
.btn-ghost,
.btn-chip {
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, color 0.18s ease;
}

.btn-primary,
.btn-ghost {
  padding: 0.8rem 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #d72638 0%, #a91d2a 100%);
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.28);
}

.btn-primary:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.btn-ghost {
  background: #2a1114;
  color: #ffb3bb;
}

.btn-chip {
  padding: 0.55rem 0.9rem;
  background: #2a1114;
  color: #ffb3bb;
  border: 1px solid #4a2026;
}

.btn-chip.danger {
  background: #341315;
  color: #ffc6c6;
}

.navbar-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.1rem;
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #0f0f10 0%, #1a1a1d 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
}

.preview-logo-wrap,
.preview-logo-image,
.preview-logo-placeholder {
  display: grid;
  place-items: center;
}

.preview-logo-image {
  max-width: 100%;
  object-fit: contain;
}

.preview-logo-placeholder {
  min-width: 170px;
  min-height: 48px;
  padding: 0.5rem 0.8rem;
  border-radius: 14px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  color: #ffffff;
}

.preview-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.preview-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.35rem 0.25rem;
}

.editor-stack {
  display: grid;
  gap: 0.9rem;
}

.block-card {
  border-radius: 20px;
  padding: 1rem;
  background: #17171a;
  border: 1px solid #343434;
}

.block-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.block-type {
  margin: 0 0 0.2rem;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.block-lock {
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: #2a1114;
  border: 1px solid #4a2026;
  font-size: 0.84rem;
}

.block-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.logo-editor-grid {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.logo-preview-box {
  min-height: 180px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  background: linear-gradient(180deg, #1f1f23 0%, #141416 100%);
  display: grid;
  place-items: center;
  padding: 1rem;
}

.logo-placeholder {
  color: #d8d8d8;
  text-align: center;
  line-height: 1.5;
}

.logo-preview-image {
  max-width: 100%;
  object-fit: contain;
}

.logo-fields,
.block-form {
  display: grid;
  gap: 0.85rem;
}

.field-group {
  display: grid;
  gap: 0.45rem;
}

.field-label {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
}

.field-input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #343434;
  background: #111113;
  color: #ffffff;
  padding: 0.82rem 0.95rem;
  font: inherit;
}

.field-input:focus {
  outline: none;
  border-color: #d72638;
  box-shadow: 0 0 0 4px rgba(215, 38, 56, 0.15);
}

.size-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.helper-text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.empty-state {
  padding: 1rem;
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  text-align: center;
}

@media (max-width: 900px) {
  .content-header,
  .card-title-row,
  .block-head,
  .navbar-preview {
    flex-direction: column;
    align-items: flex-start;
  }

  .logo-editor-grid {
    grid-template-columns: 1fr;
  }

  .size-grid {
    grid-template-columns: 1fr;
  }
}
</style>
