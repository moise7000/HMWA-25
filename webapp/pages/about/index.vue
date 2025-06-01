<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'

const title = 'About Yoga'

const description = 'Hello from about Yoga'

const topics = [
	{
		imagePath : 'assets/yoga_courses/yoga_course_0.png',
		topicDescription : 'Ceci est un test.',
		linkPath : '/about/benefits',
		topicTitle : 'Benefits',
		side : true
	}, {imagePath : 'assets/yoga_courses/yoga_course_0.png',
		//topicDescription
		linkPath : '/about/equipments',
		topicTitle : 'Equipments',
		side : false
	}, {imagePath : 'assets/yoga_courses/yoga_course_0.png',
		//topicDescription
		linkPath : '/about/practice-at-home',
		topicTitle : 'Practice at home',
		side : true
	}, {imagePath : 'assets/yoga_courses/yoga_course_0.png',
		//topicDescription
		linkPath : '/about/articles',
		topicTitle : 'Articles',
		side : false
	}
]	

</script>