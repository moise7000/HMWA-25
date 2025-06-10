<template>
  <NuxtLink
      v-if="!asButton && !fake"
      :to="url"
      :class="[finalClass, $attrs.class]"
      v-bind="$attrs"
  >
    <slot />
  </NuxtLink>

  <button
      v-else
      :disabled="disabled"
      :class="[finalClass, $attrs.class]"
      v-bind="$attrs"
      @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  url: { type: String, default: '/' },
  variant: { type: Number, default: 1 },
  fake: { type: Boolean, default: false },
  asButton: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['click'])



const variantClasses = computed(() => {
  if (props.variant === 1) {
    return "w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center block font-medium"
  } else if (props.variant === 2) {
    return "px-4 py-3 text-center text-sm font-semibold rounded-md transition-transform transition-colors duration-200 ease-in-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/30 text-black bg-white border-2 border-black hover:bg-neutral-200"
  } else if (props.variant === 3) {
    return "inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
  }
  return ''
})

const finalClass = computed(() => `${variantClasses.value}`)
</script>
