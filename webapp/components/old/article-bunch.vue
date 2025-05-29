<template>
  <div class="articles-container">
	<Article v-for = "article in articles" :key = "article.id" :title = "article.title" :date = "article.date" :imagePath = "article.image" :description = "article.description" :url = "article.url"/>
  </div>
</template>

<script setup>

import Article from '~/components/article-card.vue'

// export default {
//   components: { Article },
//   data() {
//     return {
//       // replace these with your real data
//       articles: [
//         { id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/yoga1.jpg', description: 'In a world...' },
//         { id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/yoga2.jpg', description: 'In a world...' },
//         { id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/yoga3.jpg', description: 'In a world...' }
//       ]
//     }
//   }
// }

// const articles = [
// 		{ id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"},
// 		{ id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"},
// 		{ id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"}
// 	  ]

defineProps({
	articles : {type : Array, required : false, default : [{ id: 1, title: 'No articles found', date: '00/00/0000', image: '', description: 'No articles', url : "/"}]}
})

</script>

<style scoped>

.articles-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: start;
  padding-left: 10%;
  padding-right: 10%;
}

</style>
