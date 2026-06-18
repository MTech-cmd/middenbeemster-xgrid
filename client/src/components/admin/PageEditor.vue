<template>
  <section class="tab-content">

    <div class="content-header">
      <div>
        <RouterLink to="/admin/pages" class="back-link">← Terug naar overzicht</RouterLink>
        <h1>{{ isEditing ? 'Pagina bewerken' : 'Nieuwe pagina' }}</h1>
      </div>

      <div class="header-actions">
        <button class="btn-ghost" @click="showPreview = true">
          Preview
        </button>

        <button
          class="btn-primary"
          :disabled="saving"
          @click="savePage"
        >
          {{ saving ? 'Opslaan...' : 'Opslaan' }}
        </button>
      </div>
    </div>

    <div v-if="pageError"   class="alert alert-error">{{ pageError }}</div>
    <div v-if="pageSuccess" class="alert alert-success">{{ pageSuccess }}</div>

    <!-- Template & routing -->
    <div class="card">
      <h2 class="card-title">Template & routing</h2>

      <div class="form-row">
        <div class="form-group">
          <label>Template</label>
          <input v-model="pageForm.template" type="text">
        </div>

        <div class="form-group">
          <label>Routing</label>
          <input v-model="pageForm.routing" type="text">
        </div>
      </div>
    </div>

    <!-- Content velden -->
    <div class="card">
      <div class="card-title-row">
        <h2 class="card-title">Content velden</h2>

        <button class="btn-ghost" @click="addContentField">
          Veld toevoegen
        </button>
      </div>

      <div
        v-for="(field, index) in contentFields"
        :key="index"
        class="content-field-row"
      >
        <div class="form-group">
          <label>ApiName</label>
          <input v-model="field.apiName" type="text">
        </div>

        <div class="form-group">
          <label>Type</label>
          <select v-model="field.type">
            <option value="text">Tekst</option>
            <option value="image">Afbeelding</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div class="form-group">
          <label>Waarde</label>

          <textarea
            v-if="field.type === 'text'"
            v-model="field.value"
            rows="3"
          ></textarea>

          <input
            v-else-if="field.type === 'video'"
            v-model="field.value"
            type="text"
          >

          <div v-else>
            <input v-model="field.value" type="text">
            <input
              type="file"
              accept="image/*"
              @change="uploadImage($event, index)"
            >
          </div>
        </div>

        <button class="remove-field-btn" @click="removeContentField(index)">
          <i class="ti ti-trash"></i>
        </button>
      </div>
    </div>

    <PreviewModal
      v-model="showPreview"
      :fields="contentFields"
    />

  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import PreviewModal from '@/components/admin/PreviewModal.vue'

import {
  getPage,
  createPage,
  updatePage,
  updatePageContent,
  uploadImage as uploadImageApi
} from '@/services/admin.js'

const route  = useRoute()
const router = useRouter()

const saving       = ref(false)
const pageError    = ref('')
const pageSuccess  = ref('')
const showPreview  = ref(false)
const isEditing    = ref(false)
const selectedPage = ref(null)

const pageForm = ref({
  template: '',
  routing:  ''
})

const contentFields = ref([])

function addContentField() {
  contentFields.value.push({ apiName: '', type: 'text', value: '' })
}

function removeContentField(index) {
  contentFields.value.splice(index, 1)
}

async function uploadImage(event, index) {
  const file = event.target.files[0]

  if (!file) return

  try {
    contentFields.value[index].value = await uploadImageApi(file)
  } catch (e) {
    pageError.value = e.message
  }
}

function resetForm() {
  selectedPage.value = null
  isEditing.value    = false
  pageForm.value     = { template: '', routing: '' }
  contentFields.value = []
  pageError.value    = ''
  pageSuccess.value  = ''
}

async function loadPage(id) {
  try {
    const page = await getPage(id)

    selectedPage.value = page
    isEditing.value    = true

    pageForm.value = {
      template: page.Template || page.template,
      routing:  page.Routing  || page.routing
    }

    contentFields.value = Object.entries(page.content || {}).map(
      ([apiName, data]) => ({
        apiName,
        type:  data.type  || 'text',
        value: data.value || ''
      })
    )
  } catch (e) {
    pageError.value = e.message
  }
}

function initFromRoute() {
  const id = route.params.id

  if (!id || id === 'new') {
    resetForm()
    return
  }

  loadPage(id)
}

onMounted(initFromRoute)

watch(() => route.params.id, initFromRoute)

async function savePage() {
  saving.value      = true
  pageError.value   = ''
  pageSuccess.value = ''

  try {
    let pageId

    if (isEditing.value && selectedPage.value) {
      await updatePage(selectedPage.value.id, {
        template: pageForm.value.template,
        routing:  pageForm.value.routing
      })
      pageId = selectedPage.value.id
    } else {
      const created = await createPage({
        template: pageForm.value.template,
        routing:  pageForm.value.routing
      })
      pageId = created.id
      selectedPage.value = created
      isEditing.value    = true
    }

    const contentObj = {}

    contentFields.value.forEach(field => {
      if (field.apiName) {
        contentObj[field.apiName] = {
          value: field.value,
          type:  field.type
        }
      }
    })

    await updatePageContent(pageId, contentObj)

    pageSuccess.value = 'Pagina opgeslagen'

    if (route.params.id === 'new') {
      router.replace(`/admin/pages/${pageId}`)
    }
  } catch (e) {
    pageError.value = e.message
  } finally {
    saving.value = false
  }
}

</script>
