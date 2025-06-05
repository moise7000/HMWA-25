<!-- SafetyCard.vue - Composant de base -->
<template>
  <div class="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
    <div class="flex items-start space-x-4">
      <div class="text-2xl">{{ icon }}</div>
      <div class="flex-1">
        <h3 class="font-semibold text-lg text-gray-900 mb-2">{{ title }}</h3>
        <p class="text-gray-600 text-sm leading-relaxed">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>