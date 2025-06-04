<template>
  <Hero :title="title" :description="description" />
  <div class="about">
    <TopicRight
        v-for="(topic, index) in topics"
        :key="index"
        :imagePath="topic.imagePath"
        :topicDescription="topic.topicDescription"
        :linkPath="topic.linkPath"
        :topicTitle="topic.topicTitle"
        :side="topic.side"
        :linkText="topic.linkText"
    />
  </div>
</template>

<script setup>
import TopicRight from '~/components/common/topic.vue'
import Hero from '~/layouts/hero.vue'

defineProps({
  title: { type: String, required: false, default: 'Missing title' },
  description: { type: String, required: false, default: 'Missing description.' },
  topics: {
    type: Array,
    required: false,
    default: () => [
      {
        imagePath: 'assets/yoga_courses/yoga_course_0.png',
        topicDescription: 'No description provided.',
        linkPath: '/',
        topicTitle: 'No title provided',
        side: false,
        linkText: 'Read more'
      }
    ]
  }
})
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
}
</style>
