<template>
  <div>


    <FeedbackCard :feedback="MOCK_FEEDBACK" />
    <FeedbackCard :feedback="MOCK_FEEDBACK" />
    <FeedbackCard :feedback="MOCK_FEEDBACK" />
    <FeedbackCard :feedback="MOCK_FEEDBACK" />
  </div>
</template>

<script setup lang="ts">
import FeedbackCard from './components/FeedbackCard.vue'
import { MOCK_FEEDBACK } from './types/mock'


</script>