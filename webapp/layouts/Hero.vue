<template>
  <div class="text-center my-8">
    <h1 class="text-5xl font-semibold text-black mb-2" v-html="title" />
    <p class="text-base text-black" v-html="description" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
