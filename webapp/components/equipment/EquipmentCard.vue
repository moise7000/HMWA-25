<template>
  <div class="equipment-card border rounded p-4 shadow-sm">
    <div class="mb-2">
      <img
          v-if="equipment.image"
          :src="equipment.image"
          :alt="`Image of ${equipment.name}`"
          class="w-48 h-auto rounded"


      />
      <div v-else class="w-48 h-32 flex items-center justify-center bg-gray-200 text-gray-500 rounded">

        📷 No image available
      </div>
    </div>
    <h3 class="text-lg font-semibold mb-2">{{ equipment.name }}</h3>
    <p class="text-sm text-gray-600 mb-1">{{ equipment.description }}</p>



    <a
        v-if="equipment.purchase_link"
        :href="equipment.purchase_link"
        target="_blank"
        class="text-blue-500 text-sm underline"
    >
      See product
    </a>
  </div>
</template>

<script setup lang="ts">
import type { Equipment } from '~/types/Equipment'
import { formatDate } from '~/scripts/equipment/equipmentCardLogic'

defineProps<{
  equipment: Equipment
}>()
</script>


<style scoped>
.equipment-card {
  transition: transform 0.2s;
}
.equipment-card:hover {
  transform: scale(1.02);
}
</style>
