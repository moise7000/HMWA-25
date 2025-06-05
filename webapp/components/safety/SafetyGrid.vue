<!-- SafetyGrid.vue - Composant conteneur -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <SafetyCard
        v-for="item in items"
        :key="item.id"
        :icon="item.icon"
        :title="item.title"
        :description="item.description"
    />
  </div>
</template>

<script setup lang="ts">
interface SafetyItem {
  id: string
  icon: string
  title: string
  description: string
}

interface Props {
  items: SafetyItem[]
}

defineProps<Props>()
</script>