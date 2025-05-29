<template>
	<HeroCard :title = "title" :description = "description" />
	<div class = 'about'>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png' :side = "true" />
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png' :side = "false" />
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png' :side = "true" />
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png' :side = "false" />
		</div>
</template>

<script setup>

import TopicRight from '~/components/common/topic.vue'
import HeroCard from '~/layouts/Hero.vue'

const title = 'About Yoga'

const description = 'Hello from about Yoga'

</script>

<style scoped>

.about {
	display : flex;
	flex-direction : column;
	gap : 50px;
	width : 100%
}

</style>