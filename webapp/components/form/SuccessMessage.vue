<template>
  <div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
    <p class="text-green-800">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Your message has been sent successfully!'
  }
})
</script>