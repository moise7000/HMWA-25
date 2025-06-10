<template>
  <BreadCrumps :breadCrumps= "breadCrumps" />
  <Hero :title = "title" :description = "description"/>

  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <div class="text-lg">Loading...</div>
  </div>

  <div v-else >

    <div class="center benefits-grid place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16   animate-fade-in">
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
    <!-- Section Feedbacks -->
    <div v-if="feedbacks.length > 0" class="">
      <!-- Loading state for feedbacks -->
      <div v-if="feedbacksLoading" class="flex justify-center py-8">
        <div class="text-gray-500">Loading feedbacks...</div>
      </div>

      <!-- Feedbacks Grid -->
      <div v-else class="grid  gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
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

import { useHead } from '#imports'

useHead({
  title: 'Yoga Benefits - Improve Your Life with Yoga | YourSiteName',
  meta: [
    {
      name: 'description',
      content: 'Discover the physical and mental benefits of yoga, from stress relief and flexibility to better sleep and enhanced focus. Start your transformation today.'
    },
    { property: 'og:title', content: 'Yoga Benefits - Improve Your Life with Yoga' },
    { property: 'og:description', content: 'Discover the physical and mental benefits of yoga. Learn how a consistent practice can transform your life.' },
    { property: 'og:image', content: '/assets/yoga_courses/yoga_course_23.png' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'canonical', href: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/about/benefits' }
  ]
})



import {ref, onMounted} from 'vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
import FeedbackCard from "~/components/FeedbackCard.vue"
import {useUserFeedbacks} from '~/managers/userFeedbackManager'
import {useArticles} from "~/managers/articleManager";
import ArticleCard from "~/components/article/ArticleCard.vue";
import JoinYourFirstCourse from "~/components/benefit/JoinYourFirstCourse.vue";

const loading = ref(true)
const error = ref(null)

const title = "Benefits"
const description = "Yoga offers more than flexibility — it enhances mental clarity, reduces stress, strengthens the body, and supports overall well-being. Discover how a regular practice can transform your life."

const breadCrumps = [{
  name: "About",
  link: "/about"
}, {
  name: "Benefits",
  link: "/about/benefits"
}]

const benefits = [
  {
    id: 1,
    title: "Stress Relief",
    description: "Yoga encourages mindfulness and deep breathing, helping to calm the nervous system and reduce everyday stress.",
    icon: "🎯"
  },
  {
    id: 2,
    title: "Flexibility & Strength",
    description: "Through regular practice, yoga gently stretches and strengthens muscles, increasing mobility and balance.",
    icon: "💪"
  },
  {
    id: 3,
    title: "Better Sleep Quality",
    description: "Relaxation-focused poses and breathing techniques prepare the body and mind for restful, deeper sleep.",
    icon: "💤"
  },
  {
    id: 4,
    title: "Enhanced Mental Focus",
    description: "Yoga promotes concentration and clarity, supporting mental sharpness and emotional balance throughout the day.",
    icon: "🧘"
  }
]

// Articles
const articles = ref([])
const displayedArticles = ref([])
const articlesLoading = ref(false)
const articleLimit = 4

const {getAllArticles} = useArticles()

const loadArticles = async () => {
  articlesLoading.value = true
  try {
    const allArticles = await getAllArticles()
    articles.value = allArticles
    // Limiter à 4 articles
    displayedArticles.value = allArticles.slice(0, articleLimit)
  } catch (err) {
    console.error('Error loading articles:', err)
    articles.value = []
    displayedArticles.value = []
  } finally {
    articlesLoading.value = false
  }
}

// Feedbacks
const feedbacks = ref([])
const feedbacksLoading = ref(false)
const feedbackLimit = ref(4)

const {getAllFeedbacks} = useUserFeedbacks()

const loadAllFeedbacks = async () => {
  feedbacksLoading.value = true
  try {
    const allFeedbacks = await getAllFeedbacks(feedbackLimit.value)
    feedbacks.value = allFeedbacks
  } catch (err) {
    console.error('Error loading feedbacks:', err)
    feedbacks.value = []
  } finally {
    feedbacksLoading.value = false
  }
}

onMounted(async () => {
  try {
    await Promise.all([
      loadArticles(),
      loadAllFeedbacks()
    ])
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
})
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