<template>
	<section class = "articles-grid animate-fade-in" :style = "{'padding' : padding, 'grid-template-columns' : gridTemplateColumn}">
		<Article v-for = "article in visibleArticles" :key = "article.id" :title = "article.title" :date = "article.date" :imagePath = "article.image" :description = "article.description" :url = "article.url" :button-display = "article.buttonDisplay"/>
	</section>
	<div class = "btn-wrapper" v-if = "visibleArticles.length < articles.length">
		<div id = "more-button" v-on:click = "loadMore">
      <BaseButton as-button :variant="2">
        <span>More</span>
      </BaseButton>
		</div>
	</div>
</template>

<script setup>

import Article from '~/components/common/card.vue'
import MyButton from '~/components/common/button.vue'
import { ref, computed, onMounted } from 'vue'
import BaseButton from "~/components/common/BaseButton.vue";

const props = defineProps({
	articles : {type : Array, required : false, default : [{ id : 1, title : 'No articles found', date : '00/00/0000', image : '', description : 'No articles', url : "/"}]},
	paddingSide : {type : String, required : false, default : "10"},
	minWidth : {type : String, required : false, default : "10"},
	displayAll : {type : Boolean, required : false, default : false},
	customStep : {type : Number, required : false, default : 0}
})

const shown = ref(0)

const columnCount = ref(0)

onMounted(() => {
	if (!props.displayAll) {
		const container = document.querySelector('.articles-grid') ;
		if (container) {
			const style = window.getComputedStyle(container) ;
			const gridTemplateColumns = style.getPropertyValue('grid-template-columns') ;
			columnCount.value = gridTemplateColumns.split(' ').length ;
			shown.value = columnCount.value ;
		}
	}
	else {shown.value = props.articles.length}
	if (props.customStep != 0) {columnCount.value = props.customStep}
})

function loadMore () {shown.value = Math.min(shown.value + columnCount.value, props.articles.length)}

const visibleArticles = computed(() => props.articles.slice(0, shown.value))

const padding = computed(() => `0 ${props.paddingSide}%`)

const gridTemplateColumn = computed(() => `repeat(auto-fill, minmax(${props.minWidth}px, 1fr))`)

</script>

<style scoped>

.articles-grid {
	display : grid ;
	gap : 1.5rem ;
	margin : 0 ;
}

/* @media (min-width : 600px) {
	.articles-grid {grid-template-columns : repeat(auto-fill, minmax(280px, 1fr)) ;}
}

@media (min-width : 900px) {
	.articles-grid {grid-template-columns : repeat(auto-fill, minmax(300px, 1fr)) ;}
} */

.articles-grid :deep(img) {
	width : 100% ;
	height : auto ;
	display : block
}

.btn-wrapper {
	display : flex ;
	justify-content : center ;     /* center the “More” button */
	margin-top : 2rem ;
	width : 100% ;
}

#more-button {width : 10%}

#more-button:hover {cursor : pointer}

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
