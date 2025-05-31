<template>
	<Hero :title = "title" :description = "description" />
	<div class = 'about'>
		<TopicRight v-for = "topic in topics" :imagePath = "topic.imagePath" :topicDescription = "topic.topicDescription" :linkPath = 'topic.linkPath' :topicTitle = 'topic.topicTitle' :side = "topic.side" />
	</div>
</template>

<script setup>

import TopicRight from '~/components/common/topic.vue'
import Hero from '~/layouts/hero.vue'

defineProps({
	title : {type : String, required : false, default : 'Missing title'},
	description : {type : String, required : false, default : 'Missing description.'},
	topics : {type : Array, requied : false, default : [{
		imagePath : 'assets/yoga_courses/yoga_course_0.png',
		topicDescription : 'No description provided.',
		linkPath : '/',
		topicTitle : 'No title provided',
		side : false
	}]}
})

</script>

<style scoped>

.about {
	display : flex;
	flex-direction : column;
	gap : 50px;
	width : 100%
}

</style>