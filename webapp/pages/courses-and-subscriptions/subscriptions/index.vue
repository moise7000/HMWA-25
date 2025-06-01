<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description"/>
	

</template>

<script setup>

import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'

const title = "Subscriptions"

const description = "Discorver our subscriptions"

const breadCrumps = [{
		name : "Courses and Subscriptions",
		link : "/courses-and-subscriptions"
	}, {
		name : "Subscriptions",
		link : "/courses-and-subscriptions/subscriptions"
}]

</script>

<style scoped>

</style>