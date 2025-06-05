<template>
  <div class="about-page">
    <Hero :title="title" :description="description" />
    <section class="about-content" aria-label="About topics">
      <TopicRight
          v-for="(topic, index) in topics"
          :key="`topic-${index}`"
          :imagePath="topic.imagePath"
          :topicDescription="topic.topicDescription"
          :linkPath="topic.linkPath"
          :topicTitle="topic.topicTitle"
          :side="topic.side"
          :linkText="topic.linkText"
          :noLink="topic.noLink"
          :index="index"
          class="topic-item"
      />
    </section>
  </div>
</template>

<script setup>
import {computed} from 'vue'
import TopicRight from '~/components/common/topic.vue'
import Hero from '~/layouts/hero.vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Missing title'
  },
  description: {
    type: String,
    required: false,
    default: 'Missing description.'
  },
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
        linkText: 'Read more',
        noLink: false
      }
    ],
    validator: (topics) => {
      return Array.isArray(topics) && topics.every(topic =>
          typeof topic.imagePath === 'string' &&
          typeof topic.topicTitle === 'string'
      )
    }
  }
})

// Computed pour optimiser le rendu
const processedTopics = computed(() => {
  return props.topics.map((topic, index) => ({
    ...topic,
    id: `topic-${index}`,
    // Alternance automatique des côtés si non spécifié
    side: topic.side !== undefined ? topic.side : index % 2 === 0
  }))
})

// SEO et Meta
useHead({
  title: props.title !== 'Missing title' ? props.title : 'About Us',
  meta: [
    {
      name: 'description',
      content: props.description !== 'Missing description.' ? props.description : 'Learn more about us and our services'
    }
  ]
})
</script>

<style scoped>
.about-page {
  width: 100%;
  min-height: 100vh;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 5vw, 4rem);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) 1rem;
}

.topic-item {
  scroll-margin-top: 2rem;
}

/* Animations d'entrée */
.topic-item {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.topic-item:nth-child(1) {
  animation-delay: 0.1s;
}

.topic-item:nth-child(2) {
  animation-delay: 0.2s;
}

.topic-item:nth-child(3) {
  animation-delay: 0.3s;
}

.topic-item:nth-child(4) {
  animation-delay: 0.4s;
}

.topic-item:nth-child(n+5) {
  animation-delay: 0.5s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .about-content {
    gap: clamp(1.5rem, 4vw, 2.5rem);
    padding: clamp(1.5rem, 4vw, 2rem) 0.75rem;
  }
}

/* Réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  .topic-item {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .about-content {
    background-color: transparent;
  }
}
</style>