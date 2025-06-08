<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description"/>



  <div class="benefits-grid grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <BenefitCard
        v-for="benefit in benefits"
        :key="benefit.id"
        :title="benefit.title"
        :description="benefit.description"
        :icon="benefit.icon"
        @click="handleBenefitClick(benefit)"
    />
  </div>

</template>

<script setup>

import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'


const title = "Benefits"

const description = "Yoga offers more than flexibility — it enhances mental clarity, reduces stress, strengthens the body, and supports overall well-being. Discover how a regular practice can transform your life."

const breadCrumps = [{
		name : "About",
		link : "/about"
	}, {
		name : "Benefits",
		link : "/about/benefits"
}]


const benefits = [
  {
    id: 1,
    title: "Stress Relief",
    description: "Yoga encourages mindfulness and deep breathing, helping to calm the nervous system and reduce everyday stress.",
    icon: "🎯"
  },
  {
    id: 2 ,
    title: "Improved Flexibility & Strength",
    description: "Through regular practice, yoga gently stretches and strengthens muscles, increasing mobility and balance.",
    icon:"💪"
  },
  {
    id: 3 ,
    title: "Better Sleep Quality",
    description: "Relaxation-focused poses and breathing techniques prepare the body and mind for restful, deeper sleep.",
    icon:"💤"
  },
  {
    id: 4 ,
    title: "Enhanced Mental Focus",
    description: "Yoga promotes concentration and clarity, supporting mental sharpness and emotional balance throughout the day.",
    icon:"🧘"
  }

]


</script>

<style scoped>

</style>