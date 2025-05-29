<template>
	<div class = "topic-card">
		<div class = "image-wrapper" v-if = "side">
			<img :src = "imagePath" :alt = "topicTitle" />
		</div>
		<div class = "content">
			<h2 class = "title main-title">{{topicTitle}}</h2>
			<p class = "description standard-text">{{topicDescription}}</p>
			<NuxtLink :to = "linkPath" class = "link"><em>Read more</em></NuxtLink>
		</div>
		<div class = "image-wrapper" v-if = "!side">
			<img :src = "imagePath" :alt = "topicTitle" />
		</div>
	</div>
</template>

<script setup>

defineProps({
	imagePath : {type : String, required : true},
	topicDescription : {type : String, required : false, default : 'No description provided.'},
	linkPath : {type : String, required : false, default : '/'},
	topicTitle : {type : String, required :  true, default : 'No title provided'},
	side : {type : Boolean, required : false, default : false}
}) ;

</script>

<style scoped>

.topic-card {
	display : flex ;
	align-items : stretch ;
	width : 100% ;
	padding : 30px 0;
}

.content {
	flex : 1 ;
	display : flex ;
	flex-direction : column ;
	justify-content : center ;
	text-align : center ;
}

.title {
	margin-bottom : 1rem ;
}

.description {
	line-height : 1.6 ;
	margin-bottom : 1.5rem ;
}

.link {
	font-size : 1.7rem ;
	text-decoration : underline ;
	color : #1a1a1a ;
	cursor : pointer ;
}

.link:hover {
	color : #555 ;
}

.image-wrapper {
	flex : 1 ;
	display : flex ;
	align-items : center ;
	justify-content : center ;
	overflow : hidden ;
	width : 50% ;
}

.image-wrapper img {
	width : 100% ;
	height :auto ;
	object-fit : cover ;
}

</style>