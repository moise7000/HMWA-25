<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-8">
    <h1 class="text-4xl font-bold text-red-600 mb-4">Erreur {{ error.statusCode }}</h1>
    <p class="text-lg mb-4">
      {{ error.message || "An error has occurred." }}
    </p>
    <NuxtLink to="/" class="text-blue-500 hover:underline">
      Back to home lmlml
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})
</script>
