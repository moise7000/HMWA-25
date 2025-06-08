<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description"/>
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

</script>

<style scoped>

</style>