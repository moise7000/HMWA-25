<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>


import MultiTopic from '~/components/common/indexes.vue'
import { useAboutPage } from '~/composables/useAboutPage'

const {
  title,
  description,
  topics
} = useAboutPage()

</script>