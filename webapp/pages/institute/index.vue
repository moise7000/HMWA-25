<template>
	<MultiTopic :title = "title" :description = "description" :topics = "topics"/>
</template>

<script setup>

import MultiTopic from '~/components/common/indexes.vue'
import {useInstituePage} from "~/composables/useInstituePage.js";

const {
  title,
  description,
  topics
} = useInstituePage()

useSeoMeta({
  title: title,
  description: description
})
</script>