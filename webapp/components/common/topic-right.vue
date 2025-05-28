<template>
	<div class="topic-card">
		<div class="content">
			<h2 class="title">{{topicTitle}}</h2>
			<p class="description">{{topicDescription}}</p>
			<NuxtLink :to="linkPath" class="link"><em>{{linkText}}</em></NuxtLink>
		</div>
		<div class="image-wrapper">
			<!--<img :src="imagePath" :alt="topicTitle	" />-->
		<img :src="imagePath" :alt="topicTitle	" />
		</div>
	</div>
</template>

<script setup>

defineProps({
	imagePath : {type : String, required : true},
	topicDescription : {type: String, required: false, default : 'No description provided.'},
	linkPath : {type: String, required : false, default : '/'},
	linkText : {typ : String, required : false, default : 'No link prodided'},
	topicTitle	: {type: String, required: true, default : 'No title provided'}
}) ;

</script>

<style scoped>
.topic-card {
	display: flex;
	align-items: stretch;
	justify-content: center;
	gap: 2rem;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
}

.content {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	padding: 2rem;
}

.title {
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 1rem;
}

.description {
	font-size: 1rem;
	line-height: 1.6;
	margin-bottom: 1.5rem;
}

.link {
	font-size: 1rem;
	text-decoration: underline;
	color: #1a1a1a;
	cursor: pointer;
}

.link:hover {
	color: #555;
}

.image-wrapper {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}

.image-wrapper img {
	width: 100%;
	height: auto;
	object-fit: cover;
}

</style>