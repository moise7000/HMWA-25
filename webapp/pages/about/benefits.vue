<template>
  <BreadCrumps :breadCrumps= "breadCrumps" />
  <Hero :title = "title" :description = "description"/>

  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <div class="text-lg">Loading...</div>
  </div>

  <div v-else >

    <div class="center benefits-grid place-items-center grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
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
        alt="Cours de yoga"
        class="w-full h-[300px] object-cover object-bottom rounded-xl"
        loading="lazy"
    />













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



  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      <!-- Image Container -->
      <div class="relative group">
        <img
            src="/assets/yoga_courses/yoga_course_13.png"
            alt="Cours de yoga "
            class="w-full h-auto rounded-xl  object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
        />
        <!-- Overlay subtle pour l'effet -->

      </div>

      <!-- Content Container -->
      <div class="lg:pl-8 text-center ">
        <h1 class="text-4xl sm:text-xl lg:text-6xl  text-gray-900 leading-tight tracking-tight mb-6">
          Join your first course
        </h1>

        <p class="text-center sm:text-xl text-gray-600  mb-8 ">
          Discover our complete collection of yoga courses.
        </p>

        <NuxtLink
            to="/courses-and-subscriptions/courses"
            class="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          See all courses
        </NuxtLink>
      </div>

    </div>
  </div>







</template>

<script setup>
import {ref, onMounted} from 'vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
import FeedbackCard from "~/components/FeedbackCard.vue"
import {useUserFeedbacks} from '~/managers/userFeedbackManager'

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
    title: "Improved Flexibility & Strength",
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

// Variables pour les feedbacks
const feedbacks = ref([])
const feedbacksLoading = ref(false)
const loadingMoreFeedbacks = ref(false)
const feedbackLimit = ref(4)

// Destructurer les fonctions depuis le manager
const {getAllFeedbacks, getFeedbacksForCourse} = useUserFeedbacks()

// Fonction pour charger tous les feedbacks (si vous voulez afficher tous les feedbacks, pas seulement ceux d'un cours)
const loadAllFeedbacks = async () => {
  feedbacksLoading.value = true
  try {
    // Supposons qu'il existe une fonction getAllFeedbacks dans votre manager
    // Sinon, vous pouvez adapter selon votre logique métier
    const allFeedbacks = await getAllFeedbacks(feedbackLimit.value)
    feedbacks.value = allFeedbacks
  } catch (err) {
    console.error('Error loading feedbacks:', err)
    feedbacks.value = []
  } finally {
    feedbacksLoading.value = false
  }
}

// Fonction pour charger plus de feedbacks
const loadMoreFeedbacks = async () => {
  loadingMoreFeedbacks.value = true
  try {
    const newLimit = feedbackLimit.value + 6
    const moreFeedbacks = await getAllFeedbacks(newLimit)
    feedbacks.value = moreFeedbacks
    feedbackLimit.value = newLimit
  } catch (err) {
    console.error('Error loading more feedbacks:', err)
  } finally {
    loadingMoreFeedbacks.value = false
  }
}

// Fonction pour gérer le clic sur un benefit (si nécessaire)
const handleBenefitClick = (benefit) => {
  console.log('Benefit clicked:', benefit)
  // Ajoutez votre logique ici si nécessaire
}

onMounted(async () => {
  try {
    await loadAllFeedbacks()
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
</style>