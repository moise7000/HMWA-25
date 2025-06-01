<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title="title" :description="description" />
</template>

<script setup>

import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'

const title = "Need a hand? Contact us"

const description = ""

const breadCrumps = [{
		name : "Insitute",
		link : "/institute"
	}, {
		name : "Contact",
		link : "/institute/contact"
}]

</script>

<style scoped>

</style>