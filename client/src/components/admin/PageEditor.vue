```vue
<template>
  <section class="tab-content">

    <div class="content-header">

      <h1>
        {{ isEditing ? 'Pagina bewerken' : 'Nieuwe pagina' }}
      </h1>

      <div class="header-actions">

        <button
          class="btn-ghost"
          @click="showPreview = true"
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
      :fields="contentFields"
    />

  </section>
</template>

<script setup>
import { ref } from 'vue'

import PreviewModal from './PreviewModal.vue'

import {
  getPage,
  createPage,
  updatePage,
  updatePageContent,
  uploadImage as uploadImageApi
}
from '../../../../server/routes/admin.js'

const saving = ref(false)

const pageError = ref('')
const pageSuccess = ref('')

const showPreview = ref(false)

const isEditing = ref(false)

const selectedPage = ref(null)

const pageForm = ref({
  template: '',
  routing: ''
})

const contentFields = ref([])

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
          data.value || ''

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
</script>
```
