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

const props = defineProps({
  modelValue: Boolean,
  fields: Array
})

defineEmits(['update:modelValue'])

function get(key) {
  const field = props.fields.find(
    f => f.apiName === key
  )

  return field?.value || ''
}

const heroStyle = computed(() => {
  const image = get('hero_image')

  return image
    ? `background-image:url(${image})`
    : ''
})
</script>
