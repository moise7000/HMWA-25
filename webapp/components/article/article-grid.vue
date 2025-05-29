<template>
	<section class="articles-grid">
		<Article v-for = "article in visibleArticles" :key = "article.id" :title = "article.title" :date = "article.date" :imagePath = "article.image" :description = "article.description" :url = "article.url"/>
	</section>
	<div class="btn-wrapper" v-if="visibleArticles.length < articles.length">
		<MyButton classTypeInt = 2 id = "more-button" v-on:click="loadMore">More</MyButton>
	</div>
</template>

<script setup>

import Article from '~/components/article/article-card.vue'
import MyButton from '~/components/common/button.vue'
import { ref, computed, onMounted } from 'vue'

// defineProps({
// 	articles : {type : Array, required : false, default : [{ id: 1, title: 'No articles found', date: '00/00/0000', image: '', description: 'No articles', url : "/"}]}
// })

const articles = [
	{ id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"},
	{ id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_2.png', description: 'In a 2nd world...', url : "/"},
	{ id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_3.png', description: 'In a 3rd world...', url : "/"},
	{ id: 4, title: 'Yoga for Beginners2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_4.png', description: 'In a 4th world...', url : "/"},
	{ id: 5, title: 'Mindful Movement2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_5.png', description: 'In a 5th world...', url : "/"},
	{ id: 6, title: 'Spirit & Balance2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_6.png', description: 'In a 6th world...', url : "/"}
]

const shown = ref(0)

const columnCount = ref(0)

onMounted(() => {
	const container = document.querySelector('.articles-grid');
	if (container) {
	const style = window.getComputedStyle(container);
	const gridTemplateColumns = style.getPropertyValue('grid-template-columns');
	columnCount.value = gridTemplateColumns.split(' ').length;
	shown.value = columnCount.value
	console.log('Articles per row:', columnCount);
	}

	else {console.log('Articles per row: error');}
})

function loadMore () {
//  shown.value = Math.min(shown.value + props.step, props.bunches.length)
	shown.value = Math.min(shown.value + columnCount.value, articles.length)
}

const visibleArticles = computed(() =>                      // slice the array reactively
//  props.bunches.slice(0, shown.value)
	articles.slice(0, shown.value)
)

</script>

<style scoped>

.articles-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 1.5rem;
	margin: 0;
	padding-left : 10% ;
	padding-right : 10%
}

@media (min-width: 600px) {
	.articles-grid {
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	}
}

@media (min-width: 900px) {
	.articles-grid {
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
}

.articles-grid :deep(img) {
	width: 100%;
	height: auto;
	display: block
}

.btn-wrapper {
	display: flex;
	justify-content: center;     /* center the “More” button */
	margin-top: 2rem;
	width: 100%;
}

#more-button {width : 10%}

</style>
