<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description"/>
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
import { ref, onMounted } from 'vue'
import { useEquipment } from '~/managers/equipmentManager'
import EquipmentCard from '~/components/equipment/EquipmentCard.vue'
import type { Equipment } from '@/types/Equipment'

const title = "Our yoga equipments"

const description = "Discover our selection of recommended yoga equipment gear and accessories, with links to our partner sites where you can explore and purchase the items we love and use."

const breadCrumps = [{
		name : "About",
		link : "/about"
	}, {
		name : "Equipments",
		link : "/about/equipments"
}]

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
