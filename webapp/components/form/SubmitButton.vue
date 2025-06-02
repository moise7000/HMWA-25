<template>
  <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span v-if="isSubmitting">{{ submittingText }}</span>
    <span v-else>{{ submitText }}</span>
  </button>
</template>

<script setup>
defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  submittingText: {
    type: String,
    default: 'Submitting...'
  }
})
</script>