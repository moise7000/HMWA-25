<template>
	<Hero :title = "title" :description = "description" />
	<div class = "image-wrapper standard-padding">
		<img src = "/assets/yoga_courses/yoga_course_0.png">
	</div>
	<TopicCard v-for = "topic in topics" :key = "topic.topicTitle" :no-link = "true" :topic-title = "topic.topicTitle"  :topic-description = "topic.topicDescription" :image-path = "topic.imagePath" :side = "topic.side"/>
</template>

<script setup>

import Hero from "~/layouts/hero.vue"
import TopicCard from "~/components/common/topic.vue"

const title = "Our story"

const description = "Know about us."

const topics = [{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Our founder",
		topicDescription : "Meet Emma Blasco, our founder.",
		side : true
	},{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Achievments",
		topicDescription : "Discover our success.",
		side : false
	},{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Milestones",
		topicDescription : "Since our origins.",
		side : true
}]

</script>

<style scoped>

.image-wrapper {
	display : flex ;
	justify-content : center ;
	width : 100% ;
}

</style>