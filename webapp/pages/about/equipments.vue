<template>
  <HeroCard
      title="Our Yoga Equipment"
      description="Discover our selection of recommended yoga equipment gear and accessories, <br> with links to our partner sites where you can explore and purchase the items we love and use."
  />
  <div class="p-6">


    <div v-if="loading">Chargement...</div>
    <div v-else-if="error" class="text-red-500">Erreur : {{ error.message }}</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <EquipmentCard
          v-for="equipment in equipmentList"
          :key="equipment.id"
          :equipment="equipment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroCard from '~/layouts/Hero.vue'
import { ref, onMounted } from 'vue'
import { useEquipment } from '~/managers/equipmentManager'
import EquipmentCard from '~/components/equipment/EquipmentCard.vue'
import type { Equipment } from '@/types/Equipment'

const { getAllEquipment } = useEquipment()
const equipmentList = ref<Equipment[]>([])
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    equipmentList.value = await getAllEquipment()
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
