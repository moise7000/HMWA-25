<template>
	<article :class = "card">
		<img :src = "imagePath" :alt = "`Image of course ${title}`" class = "thumbnail"/>
		<p class = "date">{{date}}</p>
		<h2 class = "title">{{title}}</h2>
		<p class = "excerpt">{{description}}</p>
		<p class = "other">{{other}}</p>
		<MyButton v-if = "buttonDisplay" :url = "url">Read</MyButton>
	</article>
</template>

<script setup>

defineProps({
	date : {type : String, required : false, default : ""},
	title : {type : String, required : false, default : ""},
	description : {type : String, required : false, default : ""},
	buttonDisplay : {type : Boolean, required : false, default : true},
	url : {type : String, required : false, default : "/"},
	imagePath : {type : String, required : true},
	other : {type : String, required : false, default : ""}
})

import MyButton from '~/components/common/button.vue'

</script>

<style scoped>

.card {
	margin-left: auto ;
	margin-right: auto ;
	width: 100% ;
	/* max-width: 20rem ; */
	background: #ffffff ;
	padding: 1rem ;
	transition: transform 0.15s ease ;
}

.card:hover {
	transform: translateY(-2px) ;
}

.thumbnail {
	display: block ;
	width: 100% ;
	height: 10rem ;
	object-fit: cover ;
	border-radius: 0.75rem ;
	margin-bottom: 1rem ;
}

.date {
	display: block ;
	font-size: 0.75rem ;
	font-weight: 500 ;
	text-transform: uppercase ;
	letter-spacing: 0.05em ;
	color: #6b7280 ;
	margin-bottom: 0.25rem ;
}

.title {
	font-size: 1.25rem ;
	font-weight: 600 ;
	line-height: 1.2 ;
	margin-bottom: 0.75rem ;
}

.excerpt {
	font-size: 0.875rem ;
	line-height: 1.6 ;
	color: #000000 ;
	margin-bottom: 1.5rem ;
}

.other {
	font-size: 1rem ;
	line-height: 1.6 ;
	color: #000000 ;
	margin-bottom: 1.5rem ;
}

</style>
