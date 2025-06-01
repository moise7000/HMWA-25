<template>
	<div class = "wrapper standard-padding">
		<NuxtLink class = "link standard-text" :to = "breadCrumps[0].link">{{breadCrumps[0].name}}</NuxtLink>
		<p class = "separator standard-text"> > </p>
		<NuxtLink class = "link standard-text" :to = "breadCrumps[1].link">{{breadCrumps[1].name}}</NuxtLink>
		<p v-if = "breadCrumps[2]" class = "separator standard-text"> > </p>
		<p v-if = "breadCrumps[2]" class = "standard-text">{{breadCrumps[2].name}}</p>
	</div>
</template>

<script setup>

defineProps({
	breadCrumps : {type : Array, required : false, default : [{name : '', link : ''}, {name : '', link : ''}]}
})

</script>

<style>

.wrapper {
	display : flex ;
	flex-direction : row ;
	width : 100% ;
	margin-left : 10%
}

.separator {
	color : #999999 ;
	white-space: pre-wrap;
}

.link {
	text-decoration : underline ;
}

.link:hover {
	color : #999999 ;
}

</style>