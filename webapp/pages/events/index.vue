<template>
  <HeroCard title="Event not to be missed" :description="description" />
  <Grid
      v-if="!pending && events.length > 0"
      :articles="events"
      :paddingSide="5"
      :minWidth="600"
  />
  <div v-else-if="pending" class="flex justify-center items-center py-12 animate-fade-in">
    <div class="text-lg">Charging of events...</div>
  </div>
  <div v-else class="flex justify-center items-center py-12 animate-fade-in">
    <div class="text-lg text-gray-500">No event available</div>
  </div>
</template>

<script setup>
import Grid from "~/components/common/grid.vue"
import HeroCard from '~/layouts/hero.vue'
import {useEvents} from "~/managers/eventManager";

const title = "Event not to be missed"
const description = 'Discover our events to come and rejoice for unique moments of happiness and connection.'


const { getAllEvents } = useEvents()


const { data: eventsData, pending, error } = await useLazyAsyncData('events', () => getAllEvents())


const events = computed(() => {
  if (!eventsData.value) return []

  return eventsData.value.map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.date).toLocaleDateString('fr-FR'),
    image: event.image || '/assets/yoga_courses/yoga_course_0.png',
    description: event.description,
    url: `/events/${event.id}`
  }))
})

// Gestion des erreurs
if (error.value) {
  console.error('Erreur lors du chargement des événements:', error.value)
}

// Meta tags pour SEO
useSeoMeta({
  title: 'Nos Événements - Events not to be missed',
  description: description
})
</script>

<style scoped>
</style>