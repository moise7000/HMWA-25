<template>
  <div class="courses-subscriptions-page">
    <MultiTopic
        :title="title"
        :description="description"
        :topics="topics"
        class="responsive-multi-topic"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MultiTopic from '~/components/common/indexes.vue'

const title = "Courses & Subscriptions"

const description = computed(() => {
  return 'Whether you\'re just beginning or looking to deepen your practice, our Courses are designed for you. <br>' +
      'Explore our Subscriptions for unlimited classes, exclusive content, and personalized support to help you stay consistent and inspired.'
})

const topics = computed(() => [
  {
    imagePath: 'assets/yoga_courses/yoga_course_11.png',
    topicDescription: 'Our yoga courses are designed for all levels, from beginners to advanced practitioners. Each class focuses on improving flexibility, strength, and mindfulness through guided postures, breathing techniques, and meditation. Join us to nurture your body and mind in a supportive and peaceful environment.',
    linkPath: '/courses-and-subscriptions/courses',
    topicTitle: 'Courses',
    side: true,
    linkText: "See all courses",
    // Ajout de propriétés pour la responsiveness
    priority: 1,
    mobileOrder: 1
  },
  {
    imagePath: 'assets/yoga_courses/yoga_course_12.png',
    topicDescription: "Our yoga subscriptions offer unlimited access to a variety of classes, workshops, and exclusive content. Enjoy the flexibility to practice anytime, anywhere, and stay motivated with personalized plans and community support. Perfect for deepening your practice at your own pace.",
    linkPath: '/courses-and-subscriptions/subscriptions',
    topicTitle: 'Subscriptions',
    side: false,
    linkText: "See all subscriptions",
    priority: 2,
    mobileOrder: 2
  }
])


const breakpoints = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)'
}

// Meta pour SEO responsive
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Discover our yoga courses and subscriptions designed for all levels. Flexible learning options with unlimited access to classes and exclusive content.' }
  ]
})

useSeoMeta({
  title: title,
  description: description
})
</script>

<style scoped>
.courses-subscriptions-page {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.responsive-multi-topic {
  /* Assurer une largeur responsive */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Breakpoints responsive */
@media (max-width: 768px) {
  .responsive-multi-topic {
    padding: 0 0.75rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .responsive-multi-topic {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1025px) {
  .responsive-multi-topic {
    padding: 0 2rem;
  }
}

/* Styles pour améliorer la performance */
.courses-subscriptions-page img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  loading: lazy;
}


</style>