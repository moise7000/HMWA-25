<template>
  <div>
    <BreadCrumps :breadCrumps= "breadCrumps" />
    <Hero :title="title" :description="description" />
    <Hero :subtitle="subtitleOne" />
    <Grid
        :articles="exercises"
        padding-side="35"
        min-width="200"
        :display-all="true"
    />
    <Hero :subtitle="subtitleTwo" />


    <YoutubeEmbedGrid/>

    <Hero :subtitle="subtitleThree" />
    <Hero class="little-text" :description="safetyGuidelines" />

    <div class="container mx-auto p-6 max-w-6xl animate-fade-in">
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Safety Rules and Tips</h2>
        <SafetyGrid :items="safetyRules" />
      </section>

    </div>
  </div>
</template>

<script setup>

import { useHead } from '#app'

useHead({
  title: 'Practice Yoga at Home',
  meta: [
    {
      name: 'description',
      content: 'Enjoy the freedom and comfort of practicing yoga in your own space. Whether you\'re a beginner or experienced, our guided sessions and tips help you stay consistent, safe, and connected — anytime, anywhere.'
    },
    {
      property: 'og:title',
      content: 'Practice Yoga at Home'
    },
    {
      property: 'og:description',
      content: 'Enjoy the freedom and comfort of practicing yoga in your own space.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/about/practice-at-home'
    },
    {
      name: 'twitter:card',
      content: 'Enjoy the freedom and comfort of practicing yoga in your own space.'
    },
    {
      name: 'twitter:title',
      content: 'Practice Yoga at Home'
    },
    {
      name: 'twitter:description',
      content: 'Enjoy the freedom and comfort of practicing yoga in your own space.'
    }
  ]
})



import { ref } from 'vue'
import Hero from "~/layouts/hero.vue"
import Grid from "~/components/common/grid.vue"
import SafetyGrid from '~/components/safety/SafetyGrid.vue'
import YoutubeEmbedGrid from "~/components/video/YoutubeEmbedGrid.vue";
import BreadCrumps from "~/components/common/bread-crumps.vue";


import { usePracticeAtHomePage } from '~/composables/usePracticeAtHomePage.js'

const {
  safetyGuidelines,
  safetyRules,
  exercises,
  subtitleOne,
  subtitleTwo,
  subtitleThree,
  breadCrumps,
  title,
  description
} = usePracticeAtHomePage()

useSeoMeta({
  title: title,
  description: description
})
</script>

<style scoped>
.video-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
  align-items: center;
}

.video-links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10%;
  width: 50%;
}

.link {
  text-decoration: underline;
  transition: color 0.2s ease;
}

.link:hover {
  color: #555;
}

.image-wrapper {
  width: 50%;
}

.image-wrapper img {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

/* Responsive design */
@media (max-width: 768px) {
  .video-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .video-links,
  .image-wrapper {
    width: 100%;
  }

  .video-links {
    margin-left: 0;
  }
}

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