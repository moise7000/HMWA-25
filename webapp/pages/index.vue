<template>
  <Hero :title="title" :description="description" />



  <Hero subtitle="Some testimonies" />

  <div v-if="feedbacks.length > 0" class="">
    <div v-if="feedbacksLoading" class="flex justify-center py-8">
      <div class="text-gray-500">Loading feedbacks...</div>
    </div>

    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
      <FeedbackCard
          v-for="feedback in feedbacks"
          :key="feedback.id"
          :feedback="feedback"
      />
    </div>
  </div>

  <div v-else-if="!feedbacksLoading" class="bg-gray-50 rounded-lg border p-6 text-center">
    <p class="text-gray-500">No feedbacks available at the moment.</p>
  </div>


  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <Hero title="Related Articles"/>
    <NuxtLink
        to="/about/articles"
        class="text-[1.7rem] underline text-[#1a1a1a] cursor-pointer"
    >
      See all
    </NuxtLink>

    <div v-if="articlesLoading" class="flex justify-center py-8">
      <div class="text-gray-500">Loading articles...</div>
    </div>

    <div v-else-if="displayedArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      <ArticleCard
          v-for="article in displayedArticles"
          :key="article.id"
          :article="article"
      />
    </div>

    <div v-else class="bg-gray-50 rounded-lg border p-6 text-center mb-8">
      <p class="text-gray-500">No articles available at the moment.</p>
    </div>
  </div>


</template>

<script setup>

import Hero from "~/layouts/hero.vue";
import FeedbackCard from "~/components/FeedbackCard.vue";
const title="Yoga for everyone"
const description="Welcome to our yoga center"


import { useBenefitsPage } from '~/composables/useBenefitsPage'
import ArticleCard from "~/components/article/ArticleCard.vue";


const {
  loading,
  error,
  breadCrumps,
  benefits,
  articles,
  displayedArticles,
  articlesLoading,
  feedbacks,
  feedbacksLoading,
  handleBenefitClick,
  loadArticles,
  loadAllFeedbacks
} = useBenefitsPage()
</script>