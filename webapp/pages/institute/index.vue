<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'

const title = 'The institute'

const description = 'Hello from out institute.'

const topics = [
	{
		imagePath : 'assets/yoga_courses/yoga_course_4.png',
		topicDescription : 'Ceci est un 2eme test.',
		linkPath : '/institute/story',
		topicTitle : 'Our story',
		side : true
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_5.png',
		//topicDescription
		linkPath : '/institute/teachers',
		topicTitle : 'Your teachers',
		side : false
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_6.png',
		//topicDescription
		linkPath : '/institute/opening-hours',
		topicTitle : 'Opening hours',
		side : true
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_7.png',
		//topicDescription
		linkPath : '/institute/location',
		topicTitle : 'Our address',
		side : false
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_8.png',
		//topicDescription
		linkPath : '/institute/contact',
		topicTitle : 'Contact us',
		side : true
	}
]	

</script>