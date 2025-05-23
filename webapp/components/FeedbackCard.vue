<template>
  <div class="rounded-2xl shadow-lg p-6 border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300 space-y-4">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">
          {{ feedback.course.title }}
        </h3>
        <p class="text-sm text-gray-500">
          Enseignant : {{ feedback.course.teacher.name }}
        </p>
      </div>
      <div class="flex items-center space-x-1">
        <span class="text-yellow-400 text-xl">⭐</span>
        <span class="font-bold text-gray-700">{{ feedback.rating }}/5</span>
      </div>
    </div>

    <blockquote class="italic text-gray-700 border-l-4 border-yellow-300 pl-4">
      {{ feedback.comment }}
    </blockquote>

    <p class="text-xs text-gray-400 text-right">
      Posté le {{ formatDate(feedback.createdAt) }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Feedback } from '~/types/Feedback'

defineProps<{
  feedback: Feedback
}>()

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
</script>
