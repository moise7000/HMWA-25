<template>
	<article class="yoga-card">
		<img :src="imagePath" :alt="`Image of course ${title}`" class="thumbnail"/>
		<time class="date">{{date}}</time>
		<h2 class="title">{{title}}</h2>
		<p class="excerpt">{{description}}</p>
		<MyButton :url="url">Start yoga now</MyButton>
	</article>
</template>

<script setup>

defineProps({
	date : {type : String, required : false, default : "Error loading date"},
	title : {type : String, required : false, default : "Error loading title"},
	description : {type : String, required : false, default : "Error loading description"},
	url : {type : String, required : false, default : "/"},
	imagePath : {type : String, required : true}
})

import MyButton from '~/components/common/button.vue'

</script>

<style scoped>

.yoga-card {
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 20rem;
	background: #ffffff;
	padding: 1rem;
	/* border-radius: 1rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(0, 0, 0, 0.05); */
	transition: transform 0.15s ease;
}
.yoga-card:hover {
	transform: translateY(-2px);
}

.thumbnail {
	display: block;
	width: 100%;
	height: 10rem;							 /* 160 px */
	object-fit: cover;
	border-radius: 0.75rem;			/* 12 px */
	margin-bottom: 1rem;				 /* 16 px */
}

.date {
	display: block;
	font-size: 0.75rem;					/* 12 px */
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: #6b7280;							/* gris moyen */
	margin-bottom: 0.25rem;			/* 4 px */
}

.title {
	font-size: 1.25rem;					/* 20 px */
	font-weight: 600;
	line-height: 1.2;
	margin-bottom: 0.75rem;			/* 12 px */
}

.excerpt {
	font-size: 0.875rem;				 /* 14 px */
	line-height: 1.6;
	color: #000000;							/* gris foncé */
	margin-bottom: 1.5rem;			 /* 24 px */
}

</style>
