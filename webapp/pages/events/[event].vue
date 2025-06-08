<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <div v-if="pending" class="flex justify-center items-center min-h-screen animate-fade-in">
    <div class="text-xl">Charging the event...</div>
  </div>

  <div v-else-if="!event" class="flex flex-col justify-center items-center min-h-screen animate-fade-in">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Event not found</h1>
    <p class="text-gray-600 mb-6">In case you want to check it, it doesn't exist or is more available.</p>
    <NuxtLink to="/events" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
      Back to events
    </NuxtLink>
  </div>

  <div v-else class="container mx-auto px-4 py-8 animate-fade-in">

    <div class="mb-8">


      <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ event.title }}</h1>

      <!-- Informations rapides -->
      <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          {{ formatDate(event.date) }}
        </div>

        <div v-if="event.endDate" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          {{ formatTime(event.date) }} - {{ formatTime(event.endDate) }}
        </div>

        <div v-if="event.location" class="flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {{ event.location }}
        </div>

        <div v-if="event.isFree" class="flex items-center text-green-600 font-medium">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Gratuit
        </div>

        <div v-else-if="event.price" class="flex items-center">

          {{ event.price }}€
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Image et description -->
      <div class="lg:col-span-2">
        <div v-if="event.image" class="mb-8">
          <img
              :src="event.image"
              :alt="event.title"
              class="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          >
        </div>

        <div class="prose max-w-none">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ event.description }}</p>
        </div>
      </div>

      <!-- Sidebar avec informations complémentaires -->
      <div class="lg:col-span-1">
        <div class="bg-gray-50 rounded-lg p-6 sticky top-4">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Practical information</h3>

          <div class="space-y-4">
            <div v-if="event.date">
              <h4 class="font-medium text-gray-700">Date</h4>
              <p class="text-gray-600">
                {{ formatDate(event.date) }}
                <span v-if="event.endDate">
									<br>{{ formatTime(event.date) }} - {{ formatTime(event.endDate) }}
								</span>
              </p>
            </div>

            <div v-if="event.location">
              <h4 class="font-medium text-gray-700">Location</h4>
              <p class="text-gray-600">{{ event.location }}</p>
            </div>

            <div v-if="event.maxParticipants">
              <h4 class="font-medium text-gray-700">Available places</h4>
              <p class="text-gray-600">{{ event.maxParticipants }} maximum participants</p>
            </div>

            <div>
              <h4 class="font-medium text-gray-700">Price</h4>
              <p class="text-gray-600 font-medium">
                <span v-if="event.isFree" class="text-green-600">Free</span>
                <span v-else-if="event.price">{{ event.price }}€</span>
                <span v-else>Not specified</span>
              </p>
            </div>
          </div>

          <!-- Bouton de réservation -->
          <div class="mt-6">
            <button
                class="px-4 py-3 text-center text-sm font-semibold rounded-md transition-transform transition-colors duration-200 ease-in-out
         hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/30
         bg-black text-white hover:bg-neutral-900"
                @click="handleReservation"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Événements similaires -->
    <div v-if="relatedEvents.length > 0" class="mt-16">
      <h2 class="text-2xl font-semibold text-gray-900 mb-8">Other events to come</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink
            v-for="relatedEvent in relatedEvents.slice(0, 3)"
            :key="relatedEvent.id"
            :to="`/events/${relatedEvent.id}`"
            class="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div class="aspect-w-16 aspect-h-9">
            <img
                :src="relatedEvent.image || '/assets/yoga_courses/yoga_course_0.png'"
                :alt="relatedEvent.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            >
          </div>
          <div class="p-4">
            <h3 class="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {{ relatedEvent.title }}
            </h3>
            <p class="text-sm text-gray-500 mt-1">{{ formatDate(relatedEvent.date) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const route = useRoute()
const eventId = route.params.event as string
import {useEvents} from "~/managers/eventManager";
import BreadCrumps from '~/components/common/bread-crumps.vue'
const { getEventById, getUpcomingEvents } = useEvents()

const breadCrumps = computed(() => [
  { name: "Events", link: "/events" },
  { name: event.value?.title || "Loading...", link: "#" }
])



const { data: event, pending, error } = await useLazyAsyncData(
    `event-${eventId}`,
    () => getEventById(eventId)
)


const { data: allEvents } = await useLazyAsyncData('related-events', () => getUpcomingEvents())


const relatedEvents = computed(() => {
  if (!allEvents.value || !event.value) return []
  return allEvents.value.filter(e => e.id !== event.value.id)
})


const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}


const handleReservation = () => {
  
  alert('Feature to be implemented')
}

// Gestion des erreurs et redirection 404
if (error.value) {
  console.error('Erreur lors du chargement de l\'événement:', error.value)
}

// Meta tags dynamiques pour SEO
watchEffect(() => {
  if (event.value) {
    useSeoMeta({
      title: `${event.value.title} - Nos Événements`,
      description: event.value.description?.substring(0, 160) || 'Découvrez cet événement unique',
      ogTitle: event.value.title,
      ogDescription: event.value.description?.substring(0, 160),
      ogImage: event.value.image
    })
  }
})
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
}
</style>