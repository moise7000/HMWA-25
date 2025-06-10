<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description"/>

  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <div class="text-lg">Loading...</div>
  </div>

  <div v-else>
    <div class="center benefits-grid place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16 animate-fade-in">
      <BenefitCard
          v-for="benefit in benefits"
          :key="benefit.id"
          :title="benefit.title"
          :description="benefit.description"
          :icon="benefit.icon"
          @click="handleBenefitClick(benefit)"
      />
    </div>

    <img
        src="public/assets/yoga_courses/yoga_course_23.png"
        alt="Women who practice yoga outdoor – love you well"
        class="w-full h-[300px] object-cover object-bottom rounded-xl animate-fade-in"
        loading="lazy"
    />

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

    <Hero subtitle="Some testimonies"/>

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
  </div>

  <JoinYourFirstCourse/>
</template>

<script setup>
import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
import FeedbackCard from "~/components/FeedbackCard.vue"
import ArticleCard from "~/components/article/ArticleCard.vue"
import JoinYourFirstCourse from "~/components/benefit/JoinYourFirstCourse.vue"

// Import du composable externalisé
import { useBenefitsPage } from '~/composables/useBenefitsPage'

// Utilisation du composable
const {
  loading,
  error,
  title,
  description,
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

<style scoped>
.benefits-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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