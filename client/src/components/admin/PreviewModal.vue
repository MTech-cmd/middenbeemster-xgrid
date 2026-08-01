<template>
  <Transition name="modal">
    <div>
        <div
          v-if="modelValue"
          class="modal-overlay"
          @click.self="$emit('update:modelValue', false)"
        >
          <div class="preview-modal">


        <div class="preview-modal-header">
          <span>Preview</span>

          <button
            class="modal-close"
            @click="$emit('update:modelValue', false)"
          >
            ✕
          </button>
        </div>

        <div class="preview-frame-wrap">

          <div class="tpl tpl-landing">

            <div
              class="tpl-hero"
              :style="heroStyle"
            >
              <div class="tpl-hero-overlay">

                <h2>{{ get('hero_title') }}</h2>

                <p>{{ get('hero_subtitle') }}</p>

                <button class="tpl-cta">
                  {{ get('cta_label') }}
                </button>

              </div>
            </div>

            <div class="tpl-section">

              <img
                v-if="get('section1_image')"
                :src="get('section1_image')"
                class="tpl-section-img"
              >

              <div>
                <h3>{{ get('section1_title') }}</h3>
                <p>{{ get('section1_text') }}</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>



    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { resolveUploadUrl } from '../../services/admin.js'

const props = defineProps({
  modelValue: Boolean,
  fields: Array
})

defineEmits(['update:modelValue'])

function get(key) {
  const field = props.fields.find(
    f => f.apiName === key
  )

  return resolveUploadUrl(field?.value || '')
}

const heroStyle = computed(() => {
  const image = get('hero_image')

  return image
    ? `background-image:url(${image})`
    : ''
})
</script>

<style scoped>
.modal-overlay {

  position: fixed;

  inset: 0;

  z-index: 50;

  display: grid;

  place-items: center;

  padding: 1rem;

  background: rgba(0, 0, 0, 0.72);

  backdrop-filter: blur(8px);

}

.preview-modal {

  width: min(1100px, 100%);

  max-height: 90vh;

  overflow: hidden;

  display: grid;

  grid-template-rows: auto 1fr;

  border-radius: 28px;

  background: #111113;

  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.38);

  border: 1px solid rgba(215, 38, 56, 0.18);

}

.preview-modal-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 1rem;

  padding: 1rem 1.2rem;

  background: linear-gradient(135deg, #1f1214 0%, #17171a 100%);

  border-bottom: 1px solid #4a2026;

  color: #ffffff;

  font-weight: 700;

}

.modal-close {

  width: 2.25rem;

  height: 2.25rem;

  display: grid;

  place-items: center;

  background: #2a1114;

  color: #ffb3bb;

}

.modal-close:hover {

  background: #3a171c;

}

.preview-frame-wrap {

  overflow: auto;

  padding: 1rem;

  background: #0f0f10;

}

.tpl {

  border-radius: 22px;

  overflow: hidden;

  border: 1px solid #343434;

  background: #17171a;

}

.tpl-hero {

  min-height: 340px;

  background-size: cover;

  background-position: center;

  position: relative;

}

.tpl-hero-overlay {

  min-height: 340px;

  padding: 2rem;

  display: grid;

  align-content: end;

  gap: 0.75rem;

  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.78) 100%);

  color: #ffffff;

}

.tpl-hero-overlay h2 {

  margin: 0;

  font-size: clamp(1.7rem, 3vw, 3rem);

}

.tpl-hero-overlay p {

  margin: 0;

  max-width: 60ch;

  color: rgba(255, 255, 255, 0.88);

}

.tpl-cta {

  justify-self: start;

  padding: 0.8rem 1.1rem;

  background: linear-gradient(135deg, #d72638 0%, #a91d2a 100%);

  color: #ffffff;

}

.tpl-section {

  display: grid;

  grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);

  gap: 1rem;

  padding: 1.2rem;

  align-items: center;

}

.tpl-section h3 {

  margin: 0 0 0.35rem;

  color: #ffffff;

}

.tpl-section p {

  margin: 0;

  color: #d8d8d8;

  line-height: 1.6;

}

.tpl-section-img {

  width: 100%;

  border-radius: 18px;

  object-fit: cover;

}

@media (max-width: 760px) {

  .tpl-section {

    grid-template-columns: 1fr;

  }

  .tpl-hero,
  .tpl-hero-overlay {

    min-height: 280px;

  }

}
</style>
