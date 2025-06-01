<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = title :description = "description" />
	<Hero :subtitle = "subtitleOne" />
	<Grid :articles = "exercices" padding-side = "35" min-width = "200" :display-all = "true"/>
	<Hero :subtitle = "subtitleTwo" />
	<div class = "video-wrapper standard-padding">
		<div class = "video-links">
			<p class = "description standard-text">Here's some videos:</p>
			<div v-for = "link in links" >
				<p>- <a :href = "link.link" class = "link standard-text">{{link.name}}</a></p>
			</div>
		</div>
		<div class = "image-wrapper">
			<img src = "/assets/yoga_courses/yoga_course_0.png" />
		</div>
	</div>
	<Hero :subtitle = "subtitleThree" />
	<Hero class = "little-text" :description = "safetyGuidelines" />
</template>

<script setup>

import Hero from "~/layouts/hero.vue"
import Grid from "~/components/common/grid.vue"
import BreadCrumps from "~/components/common/bread-crumps.vue"

const title = "My title"

const description = "My description"

const breadCrumps = [{
		name : "About",
		link : "/about"
	}, {
		name : "Practice at home",
		link : "/about/practice-at-home"
}]

const subtitleOne = "Exercices"

const subtitleTwo = "Videos"

const subtitleThree = "Safety guidelines"

const safetyGuidelines = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."

const exercices = [{
		description : "Exercice description",
		buttonDisplay : false,
		image : "/assets/yoga_courses/yoga_course_0.png"
	}, {
		description : "Exercice description",
		buttonDisplay : false,
		image : "/assets/yoga_courses/yoga_course_0.png"
	}, {
		description : "Exercice description",
		buttonDisplay : false,
		image : "/assets/yoga_courses/yoga_course_0.png"
	}, {
		description : "Exercice description",
		buttonDisplay : false,
		image : "/assets/yoga_courses/yoga_course_0.png"
}]

const links = [{
		name : "My video",
		link : "https://www.google.com"
	},{
		name : "My video",
		link : "https://www.google.com"
	},{
		name : "My video",
		link : "https://www.youtube.com"
	},{
		name : "My video",
		link : "https://www.google.com"
}]

</script>

<style scoped>

.video-wrapper {
	display : flex ;
	flex-direction: row ;
	width : 100% ;
}

.video-links {
	display : flex ;
	justify-content : center ;
	flex-direction : column ;
	margin-left : 10% ;
	width : 50% ;
}

.link {
	text-decoration : underline ;
}

.link:hover {
	color : #555 ;
}

.image-wrapper {
	width : 50% ;
}

img {
	width : 80% ;
	height : auto ;
	object-fit : cover ;
	border-radius : 10px
}

</style>