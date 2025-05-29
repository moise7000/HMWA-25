<template>
	<HeroCard title="Yoga articles" description="<br>Meet our passionate and experienced yoga teachers, each dedicated to guiding you on your journey with care, knowledge, and inspiration. <br> Discover the heart of our studio through the people who bring it to life." />
	<Grid :articles = "articles" :paddingSide = "15" :minWidth = "400" />
</template>

<script setup>

import Grid from "~/components/common/grid.vue"
import HeroCard from '~/layouts/Hero.vue'

const articles = [
	{ id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_0.png', description: "In a 1st world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
	{ id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_2.png', description: "In a 2nd world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
	{ id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_3.png', description: "In a 3rd world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
	{ id: 4, title: 'Yoga for Beginners2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_4.png', description: "In a 4th world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
	{ id: 5, title: 'Mindful Movement2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_5.png', description: "In a 5th world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
	{ id: 6, title: 'Spirit & Balance2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_6.png', description: "In a 6th world... Unwind and reconnect with your breath in Serenity Flow, a gentle vinyasa-style class designed to soothe the nervous system and restore inner balance. Perfect for all levels, this class emphasizes mindful movement, deep stretching, and calming breathwork to help release tension and cultivate a sense of peace. Whether you're winding down after a busy day or looking for a moment of stillness, Serenity Flow offers a tranquil space to reset and recharge.", url : "/"},
]

</script>

<style scoped>

</style>