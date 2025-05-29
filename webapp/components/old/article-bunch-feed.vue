<template>
  <!--<section class="bunch-feed">-->
    <Bunch
      v-for="(visibleBunch, index) in visibleBunches"
      :key="index"
      :articles = "visibleBunch"
      class = "bunch-item"
    />

    <div class="btn-wrapper" v-if="visibleBunches.length < bunches.length">
      <MyButton classTypeInt = 2 id = "more-button" v-on:click="loadMore">More</MyButton>
    </div>
  <!--</section>-->
</template>

<script setup>

import { ref, computed } from 'vue'
import Bunch from '~/components/article-bunch.vue'
import MyButton from '~/components/common/button.vue'

// const props = defineProps({
//   bunches: { type: Array, required: true },
//   step:    { type: Number, default: 1 }
// })

const bunches = [
	[
		{ id: 1, title: 'Yoga for Beginners', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_1.png', description: 'In a world...', url : "/"},
		{ id: 2, title: 'Mindful Movement', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_2.png', description: 'In a 2nd world...', url : "/"},
		{ id: 3, title: 'Spirit & Balance', date: '12/05/2025', image: '/assets/yoga_courses/yoga_course_3.png', description: 'In a 3rd world...', url : "/"}
	], [
		{ id: 4, title: 'Yoga for Beginners2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_4.png', description: 'In a 4th world...', url : "/"},
		{ id: 5, title: 'Mindful Movement2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_5.png', description: 'In a 5th world...', url : "/"},
		{ id: 6, title: 'Spirit & Balance2', date: '14/05/2025', image: '/assets/yoga_courses/yoga_course_6.png', description: 'In a 6th world...', url : "/"}
	]
]

const shown = ref(1)                              // how many <Bunch/> to show

const visibleBunches = computed(() =>                      // slice the array reactively
//  props.bunches.slice(0, shown.value)
  bunches.slice(0, shown.value)
)

function loadMore () {
//  shown.value = Math.min(shown.value + props.step, props.bunches.length)
  shown.value = Math.min(shown.value + 1, bunches.length)
}

</script>

<style scoped>

.bunch-feed {
  display: flex;
  flex-direction: column;      /* stack <Bunch/> blocks vertically */
  /*margin: 0 auto;              /* center in its container */
}

.bunch-item {
  width: 100%;                 /* let <Bunch/> fill the column */
}

.btn-wrapper {
  display: flex;
  justify-content: center;     /* center the “More” button */
  margin-top: 2rem;
  width: 100%;
}

#more-button {width : 10%}

</style>
