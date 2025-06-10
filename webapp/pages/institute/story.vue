<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description" />
	<div class = "image-wrapper standard-padding animate-fade-in">
		<img src = "/assets/yoga_courses/yoga_course_0.png">
	</div>
	<TopicCard v-for = "topic in topics" :key = "topic.topicTitle" :no-link = "true" :topic-title = "topic.topicTitle"  :topic-description = "topic.topicDescription" :image-path = "topic.imagePath" :side = "topic.side"/>
</template>

<script setup>

import Hero from "~/layouts/hero.vue"
import TopicCard from "~/components/common/topic.vue"
import BreadCrumps from "~/components/common/bread-crumps.vue"
import {useStoryPage} from "~/composables/useStoryPage.js";

const {
  title,
  description,
  topics
} = useStoryPage()

</script>

<style scoped>

.image-wrapper {
	display : flex ;
	justify-content : center ;
	width : 100% ;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>