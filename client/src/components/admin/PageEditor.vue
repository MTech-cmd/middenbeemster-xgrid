```vue
<template>
  <section class="tab-content">

    <div class="page-overview card">

      <div class="overview-header">

        <div>
          <p class="section-kicker">Website: {{ websiteLabel }}</p>
          <h1>Pagina's</h1>
          <p class="section-subtitle">
            Bekijk de routing, template en open een live preview of test de pagina direct.
          </p>
        </div>

        <button
          class="btn-ghost"
          @click="loadPageList"
        >
          Ververs
        </button>

      </div>

      <div class="page-list">

        <div class="page-list-head">
          <span>Routing</span>
          <span>Template</span>
          <span>Bewerkt</span>
          <span>Acties</span>
        </div>

        <div v-if="pageListLoading" class="page-list-state">
          Pagina's laden...
        </div>

        <div v-else-if="pageListError" class="page-list-state page-list-state-error">
          {{ pageListError }}
        </div>

        <div v-else-if="pageList.length === 0" class="page-list-state">
          Geen pagina's gevonden voor deze website.
        </div>

        <article
          v-for="page in pageList"
          :key="page.id"
          class="page-list-row"
        >

          <div class="page-routing-block">
            <div class="page-routing">{{ page.Routing }}</div>
            <div class="page-website">{{ websiteLabel }}</div>
          </div>

          <div class="page-template">{{ page.Template }}</div>

          <div class="page-updated">
            {{ formatDate(page.UpdatedAt || page.CreatedAt) }}
          </div>

          <div class="page-actions">
            <button class="btn-chip" type="button" @click="loadPage(page.id)">Bewerk</button>
            <button class="btn-chip" type="button" @click="openPreview(page.id)">Preview</button>
            <button class="btn-chip" type="button" @click="testPage(page.Routing)">Test</button>
          </div>

        </article>

      </div>

    </div>

    <div class="content-header">

      <h1>
        {{ isEditing ? 'Pagina bewerken' : 'Nieuwe pagina' }}
      </h1>

      <div class="header-actions">

        <button
          class="btn-ghost"
          @click="openEditorPreview"
        >
          Preview
        </button>

        <button
          class="btn-primary"
          @click="savePage"
          :disabled="saving"
        >
          {{ saving ? 'Opslaan...' : 'Opslaan' }}
        </button>

      </div>

    </div>

    <div
      v-if="pageError"
      class="alert alert-error"
    >
      {{ pageError }}
    </div>

    <div
      v-if="pageSuccess"
      class="alert alert-success"
    >
      {{ pageSuccess }}
    </div>

    <!-- template -->
    <div class="card">

      <h2 class="card-title">
        Template & routing
      </h2>

      <div class="form-row">

        <div class="form-group">

          <label>Template</label>

          <input
            v-model="pageForm.template"
            type="text"
          >

        </div>

        <div class="form-group">

          <label>Routing</label>

          <input
            v-model="pageForm.routing"
            type="text"
          >

        </div>

      </div>

    </div>

    <!-- content -->
    <div class="card">

      <div class="card-title-row">

        <h2 class="card-title">
          Content velden
        </h2>

        <button
          class="btn-ghost"
          @click="addContentField"
        >
          Veld toevoegen
        </button>

      </div>

      <div
        v-for="(field,index) in contentFields"
        :key="index"
        class="content-field-row"
      >

        <div class="form-group">

          <label>ApiName</label>

          <input
            v-model="field.apiName"
            type="text"
          >

        </div>

        <div class="form-group">

          <label>Type</label>

          <select v-model="field.type">

            <option value="text">
              Tekst
            </option>

            <option value="image">
              Afbeelding
            </option>

            <option value="video">
              Video
            </option>

          </select>

        </div>

        <div class="form-group">

          <label>Waarde</label>

          <textarea
            v-if="field.type === 'text'"
            rows="3"
            v-model="field.value"
          ></textarea>

          <input
            v-else-if="field.type === 'video'"
            type="text"
            v-model="field.value"
          >

          <div v-else>

            <input
              type="text"
              v-model="field.value"
            >

            <input
              type="file"
              accept="image/*"
              @change="uploadImage($event,index)"
            >

          </div>

        </div>

        <button
          class="remove-field-btn"
          @click="removeContentField(index)"
        >
          X
        </button>

      </div>

    </div>

    <PreviewModal
      v-model="showPreview"
      :fields="previewFields"
    />

  </section>
</template>

<script setup>
import { ref, watch } from 'vue'

import PreviewModal from './PreviewModal.vue'

import {
  getPages,
  getPage,
  createPage,
  updatePage,
  updatePageContent,
  uploadImage as uploadImageApi,
  resolveUploadUrl
}
from '../../services/admin.js'

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

const pageError = ref('')
const pageSuccess = ref('')

const pageList = ref([])
const pageListLoading = ref(false)
const pageListError = ref('')

const showPreview = ref(false)
const previewFields = ref([])

const isEditing = ref(false)

const selectedPage = ref(null)
const selectedPageWebsite = ref(props.websiteId)

const pageForm = ref({
  template: '',
  routing: ''
})

const contentFields = ref([])

function formatDate(value) {
  if (!value) return 'Zojuist'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Zojuist'

  return date.toLocaleString('nl-NL', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function resetEditor() {
  isEditing.value = false
  selectedPage.value = null
  selectedPageWebsite.value = props.websiteId
  pageForm.value = {
    template: '',
    routing: '',
  }
  contentFields.value = []
  pageError.value = ''
  pageSuccess.value = ''
  previewFields.value = []
}

function openEditorPreview() {
  previewFields.value = contentFields.value.map(field => ({ ...field }))
  showPreview.value = true
}

async function loadPageList() {
  pageListLoading.value = true
  pageListError.value = ''

  try {
    pageList.value = await getPages(props.websiteId)
  } catch (error) {
    pageListError.value = error.message || "Kon pagina's niet laden."
  } finally {
    pageListLoading.value = false
  }
}

async function openPreview(pageId) {
  try {
    const page = await getPage(pageId)

    previewFields.value = Object.entries(page.content || {}).map(([apiName, data]) => ({
      apiName,
      type: data.type || 'text',
      value: resolveUploadUrl(data.value || ''),
    }))

    showPreview.value = true
  } catch (error) {
    pageError.value = error.message
  }
}

function testPage(routing) {
  const route = routing.startsWith('/') ? routing : `/${routing}`
  window.open(`/#${route}`, '_blank', 'noopener,noreferrer')
}

watch(
  () => props.websiteId,
  () => {
    resetEditor()
    loadPageList()
  },
  { immediate: true }
)

function addContentField() {

  contentFields.value.push({
    apiName: '',
    type: 'text',
    value: ''
  })

}

function removeContentField(index) {

  contentFields.value.splice(index,1)

}

async function uploadImage(event,index) {

  const file = event.target.files[0]

  if (!file) return

  try {

    const url =
      await uploadImageApi(file)

    contentFields.value[index].value =
      url

  }
  catch (e) {

    pageError.value = e.message

  }

}

async function loadPage(id) {

  try {

    const page =
      await getPage(id)

    selectedPage.value = page

    isEditing.value = true
    selectedPageWebsite.value = page.Website || page.website || props.websiteId

    pageForm.value = {

      template:
        page.Template ||
        page.template,

      routing:
        page.Routing ||
        page.routing

    }

    contentFields.value =
      Object.entries(
        page.content || {}
      ).map(([apiName,data]) => ({

        apiName,

        type:
          data.type || 'text',

        value:
          resolveUploadUrl(data.value || '' )

      }))

  }
  catch (e) {

    pageError.value = e.message

  }

}

async function savePage() {

  saving.value = true

  pageError.value = ''
  pageSuccess.value = ''

  try {

    let pageId

    if (
      isEditing.value &&
      selectedPage.value
    ) {

      await updatePage(
        selectedPage.value.id,
        {
          website:
            selectedPageWebsite.value,

          template:
            pageForm.value.template,

          routing:
            pageForm.value.routing
        }
      )

      pageId =
        selectedPage.value.id

    }
    else {

      const created =
        await createPage({

          website:
            selectedPageWebsite.value || props.websiteId,

          template:
            pageForm.value.template,

          routing:
            pageForm.value.routing

        })

      pageId = created.id

    }

    const contentObj = {}

    contentFields.value.forEach(field => {

      if (field.apiName) {

        contentObj[field.apiName] = {

          value: field.value,

          type: field.type

        }

      }

    })

    await updatePageContent(
      pageId,
      contentObj
    )

    await loadPageList()

    pageSuccess.value =
      'Pagina opgeslagen'

  }
  catch (e) {

    pageError.value = e.message

  }
  finally {

    saving.value = false

  }

}

defineExpose({
  loadPage,
})
</script>

<style scoped>
.tab-content {

  padding: 1.3rem;

  display: grid;

  gap: 1rem;

}

.page-overview {

  display: grid;

  gap: 1rem;

}

.overview-header {

  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  gap: 1rem;

}

.section-kicker {

  margin: 0 0 0.35rem;

  font-size: 0.76rem;

  font-weight: 700;

  letter-spacing: 0.14em;

  text-transform: uppercase;

  color: #ffb3bb;

}

.section-subtitle {

  margin: 0.5rem 0 0;

  color: #d8d8d8;

  line-height: 1.6;

}

.page-list {

  display: grid;

  gap: 0.75rem;

}

.page-list-head,
.page-list-row {

  display: grid;

  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 0.8fr) auto;

  gap: 0.75rem;

  align-items: center;

}

.page-list-head {

  padding: 0 0.35rem;

  color: #b8b8b8;

  font-size: 0.8rem;

  text-transform: uppercase;

  letter-spacing: 0.1em;

}

.page-list-row {

  padding: 0.95rem 1rem;

  border-radius: 18px;

  border: 1px solid #343434;

  background: #17171a;

}

.page-routing {

  color: #ffffff;

  font-weight: 700;

}

.page-website,
.page-updated {

  color: #d8d8d8;

  font-size: 0.92rem;

}

.page-routing-block {

  display: grid;

  gap: 0.25rem;

}

.page-actions {

  display: flex;

  gap: 0.45rem;

  justify-content: flex-end;

  flex-wrap: wrap;

}

.btn-chip {

  border: 1px solid #4a2026;

  border-radius: 999px;

  padding: 0.55rem 0.85rem;

  background: #2a1114;

  color: #ffb3bb;

  font: inherit;

  font-weight: 600;

  cursor: pointer;

}

.btn-chip:hover {

  background: #3a171c;

}

.page-list-state {

  padding: 1rem;

  border-radius: 18px;

  border: 1px dashed #4a2026;

  background: #1a1a1d;

  color: #d8d8d8;

}

.page-list-state-error {

  color: #ffb3bb;

}

@media (max-width: 920px) {

  .page-list-head {

    display: none;

  }

  .page-list-row {

    grid-template-columns: 1fr;

  }

  .page-actions {

    justify-content: flex-start;

  }

}

.content-header,
.card-title-row,
.form-row,
.content-field-row {

  display: flex;

  gap: 1rem;

}

.content-header {

  align-items: center;

  justify-content: space-between;

}

.content-header h1 {

  margin: 0;

  font-size: 1.6rem;

  color: #ffffff;

}

.header-actions,
.card-title-row {

  align-items: center;

  justify-content: space-between;

}

.header-actions {

  display: flex;

  gap: 0.75rem;

}

.card {

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 24px;

  background: linear-gradient(180deg, #17171a 0%, #111113 100%);

  padding: 1.25rem;

  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);

}

.card-title {

  margin: 0;

  font-size: 1.05rem;

  color: #ffffff;

}

.form-row,
.content-field-row {

  flex-wrap: wrap;

}

.form-group {

  flex: 1 1 240px;

  display: grid;

  gap: 0.45rem;

}

.form-group label {

  font-size: 0.9rem;

  font-weight: 600;

  color: #d8d8d8;

}

input,
select,
textarea {

  width: 100%;

  border: 1px solid #343434;

  border-radius: 14px;

  background: #17171a;

  color: #f5f5f5;

  padding: 0.85rem 0.95rem;

  font: inherit;

  transition: border-color 0.18s ease, box-shadow 0.18s ease;

}

input:focus,
select:focus,
textarea:focus {

  outline: none;

  border-color: #d72638;

  box-shadow: 0 0 0 4px rgba(215, 38, 56, 0.15);

}

textarea {

  resize: vertical;

  min-height: 110px;

}

.btn-primary,
.btn-ghost,
.remove-field-btn {

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

.btn-primary:hover:not(:disabled) {

  transform: translateY(-1px);

}

.btn-primary:disabled {

  opacity: 0.65;

  cursor: not-allowed;

}

.btn-ghost {

  background: #2a1114;

  color: #ffb3bb;

  border: 1px solid #4a2026;

}

.btn-ghost:hover {

  background: #3a171c;

}

.alert {

  padding: 0.9rem 1rem;

  border-radius: 16px;

  border: 1px solid transparent;

  font-weight: 500;

}

.alert-error {

  background: #2a1114;

  border-color: #4a2026;

  color: #ffb3bb;

}

.alert-success {

  background: #1f1214;

  border-color: #4a2026;

  color: #ffb3bb;

}

.content-field-row {

  align-items: end;

  padding: 1rem;

  border: 1px solid #343434;

  border-radius: 18px;

  background: #17171a;

}

.remove-field-btn {

  width: 42px;

  height: 42px;

  display: grid;

  place-items: center;

  background: #2a1114;

  color: #ffb3bb;

  border: 1px solid #4a2026;

}

.remove-field-btn:hover {

  background: #3a171c;

}

@media (max-width: 820px) {

  .content-header,
  .card-title-row {

    flex-direction: column;

    align-items: flex-start;

  }

  .header-actions {

    width: 100%;

  }

  .header-actions > * {

    flex: 1;

  }

}

@media (max-width: 640px) {

  .tab-content {

    padding: 1rem;

  }

  .card,
  .content-field-row {

    border-radius: 18px;

  }

}
</style>
```
