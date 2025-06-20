<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description" />
  <div class="p-6 animate-fade-in">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error : {{ error.message }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      <EquipmentCard
          v-for="equipment in equipmentList"
          :key="equipment.id"
          :equipment="equipment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import EquipmentCard from '~/components/equipment/EquipmentCard.vue'
import { useEquipmentsPage } from '~/composables/useEquipmentsPage'

const {
  title,
  description,
  breadCrumps,
  equipmentList,
  loading,
  error
} = useEquipmentsPage()

useSeoMeta({
  title: title,
  description: description
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>