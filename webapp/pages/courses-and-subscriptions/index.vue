<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'

const title = 'Courses & Subscriptions'

const description = 'Hello from C&S'

const topics = [
	{
		imagePath : 'assets/yoga_courses/yoga_course_0.png',
		topicDescription : 'FLAG{r54bh6v18vrs8_8v6t17b8b17v_v716}',
		linkPath : '/courses-and-subscriptions/courses',
		topicTitle : 'Courses',
		side : true
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_0.png',
		//topicDescription
		linkPath : '/courses-and-subscriptions/subscriptions',
		topicTitle : 'Subscriptions',
		side : false
	}
]	

</script>