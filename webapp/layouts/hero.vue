<template>
	<div class = "custom-wrapper">
		<h1 v-if = "showTitle" class = "title main-title standard-padding">{{title}}</h1>
		<p v-if = "showDescritpion" class = "description standard-text standard-padding">{{description}}</p>
		<h2 v-if = "showSubtitle" class = "subtitle main-subtitle standard-padding">{{subtitle}}</h2>
	</div>
</template>

<script setup>

const props = defineProps({
	title : {type : String, required : false, default : ""},
	description : {type : String, required : false, default : ''},
	subtitle : {type : String, required : false, default : ''}
})

let showTitle = false

let showSubtitle = false

let showDescritpion = false

if (props.title != "") {showTitle = true}

if (props.description != "") {showDescritpion = true}

if (props.subtitle != "") {showSubtitle = true}

</script>

<style scoped>

.custom-wrapper {
	text-align: center ;
	width : 100% ;
}

.title {
	color: #000 ;
}

.description {
	color: #000 ;
	max-width: 70% ;
	margin : auto ;
}

</style>