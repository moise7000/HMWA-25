<template>
	<!--<HeroCard title="title" description="description" />-->
	<div class = 'container'>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png'/>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png'/>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png'/>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png'/>
		<TopicRight imagePath = 'assets/yoga_courses/yoga_course_0.png'/>
	</div>
</template>

<script setup>

import TopicRight from '~/components/common/topic-right.vue'
import HeroCard from '~/layouts/Hero.vue'

const title = 'About Yoga'

const description = 'Hello from about Yoga'

</script>

<style scoped>

.container {
	display : flex;
	flex-direction : column;
	gap : 50px;
}

</style>