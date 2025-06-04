<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'

const title = 'The institute'

const description = 'A peaceful space dedicated to well-being, self-discovery, and growth through the art of yoga. Join us to explore balance, strength, and inner harmony — guided by tradition and inspired by community.'

const topics = [
	{
		imagePath : 'assets/yoga_courses/yoga_course_4.png',
		topicDescription : 'Born from a passion for mindful living, our institute was founded to share the timeless practice of yoga. What began as a small community has grown into a sanctuary for personal transformation and connection.',
		linkPath : '/institute/story',
		topicTitle : 'Our story',
		side : true,
    linkText: "Learn more about us"
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_5.png',
		topicDescription: "Guided by years of experience and a deep love for yoga, your teacher is here to support your journey with compassion, clarity, and wisdom.",
		linkPath : '/institute/teachers',
		topicTitle : 'Your teachers',
		side : false,
    linkText: "See your teachers"
	},
  // {
	// 	imagePath : 'assets/yoga_courses/yoga_course_6.png',
	// 	//topicDescription
	// 	linkPath : '/institute/opening-hours',
	// 	topicTitle : 'Opening hours',
	// 	side : true
	// },
  {
		imagePath : 'assets/yoga_courses/yoga_course_7.png',
		topicDescription: "Find us in the heart of the city — a peaceful space dedicated to your well-being.",
		linkPath : '/institute/location',
		topicTitle : 'Our address',
		side : true,
    linkText: "Where to find us?"
	}, {
		imagePath : 'assets/yoga_courses/yoga_course_8.png',
		topicDescription: 'Reach out anytime — we\'re here to support your journey.',
		linkPath : '/institute/contact',
		topicTitle : 'Contact us',
		side : false,
    linkText: 'Need a hand?'
	}
]	

</script>