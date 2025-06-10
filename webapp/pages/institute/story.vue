<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title = "title" :description = "description" />
	<div class = "image-wrapper standard-padding animate-fade-in">
		<img src = "/assets/yoga_courses/yoga_course_0.png">
	</div>
	<TopicCard v-for = "topic in topics" :key = "topic.topicTitle" :no-link = "true" :topic-title = "topic.topicTitle"  :topic-description = "topic.topicDescription" :image-path = "topic.imagePath" :side = "topic.side"/>
</template>

<script setup>

import Hero from "~/layouts/hero.vue"
import TopicCard from "~/components/common/topic.vue"
import BreadCrumps from "~/components/common/bread-crumps.vue"
import {useHead} from "#app";

const title = "Our story"

const description = "Know about us."

useHead({
  title: title,
  meta: [
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/institute/story',
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: description
    }
  ]
})

const breadCrumps = [{
		name : "Insitute",
		link : "/institute"
	}, {
		name : "Story",
		link : "/institute/story"
}]

const topics = [{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Our founder",
		topicDescription : "Meet Emma Blasco, our founder.",
		side : true
	},{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Achievments",
		topicDescription : "Discover our success.",
		side : false
	},{
		imagePath : "/assets/yoga_courses/yoga_course_0.png",
		topicTitle : "Milestones",
		topicDescription : "Since our origins.",
		side : true
}]

</script>

<style scoped>

.image-wrapper {
	display : flex ;
	justify-content : center ;
	width : 100% ;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>