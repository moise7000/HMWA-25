<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'

const title = "Courses & Subscriptions"

const description = 'Whether you\'re just beginning or looking to deepen your practice, our Courses are designed for you. <br>' +

    'Explore our Subscriptions for unlimited classes, exclusive content, and personalized support to help you stay consistent and inspired.'

const topics = [
	{
		imagePath: 'assets/yoga_courses/yoga_course_11.png',
		topicDescription: 'Our yoga courses are designed for all levels, from beginners to advanced practitioners. Each class focuses on improving flexibility, strength, and mindfulness through guided postures, breathing techniques, and meditation. Join us to nurture your body and mind in a supportive and peaceful environment.',
		linkPath : '/courses-and-subscriptions/courses',
		topicTitle : 'Courses',
		side : true,
    linkText:"See all courses"
	}, {
		imagePath: 'assets/yoga_courses/yoga_course_12.png',
		topicDescription: "Our yoga subscriptions offer unlimited access to a variety of classes, workshops, and exclusive content. Enjoy the flexibility to practice anytime, anywhere, and stay motivated with personalized plans and community support. Perfect for deepening your practice at your own pace.",
		linkPath : '/courses-and-subscriptions/subscriptions',
		topicTitle : 'Subscriptions',
		side : false,
    linkText: "See all subscriptions"
	}
]	

</script>