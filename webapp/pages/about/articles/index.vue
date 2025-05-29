<template>
	<HeroCard title="Meet the articles" description="<br>Meet our passionate and experienced yoga teachers, each dedicated to guiding you on your journey with care, knowledge, and inspiration. <br> Discover the heart of our studio through the people who bring it to life." />
	<ArticleGrid :articles = "articles"/>
</template>

<script setup>

import ArticleGrid from "~/components/article/article-grid.vue"
import HeroCard from '~/layouts/Hero.vue'

const articles = [
	{ id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"},
	{ id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_2.png', description: 'In a 2nd world...', url : "/"},
	{ id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_3.png', description: 'In a 3rd world...', url : "/"},
	{ id: 4, title: 'Yoga for Beginners2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_4.png', description: 'In a 4th world...', url : "/"},
	{ id: 5, title: 'Mindful Movement2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_5.png', description: 'In a 5th world...', url : "/"},
	{ id: 6, title: 'Spirit & Balance2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_6.png', description: 'In a 6th world...', url : "/"}
]

</script>

<style scoped>

</style>