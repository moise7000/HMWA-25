<template>
  <div
      class="course-card border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200"
      @click="navigateToCourse"
  >
    <!-- Image du cours -->
    <div class="mb-4 relative overflow-hidden rounded-lg">
      <img
          v-if="course.image"
          :src="course.image"
          :alt="course.title"
          class="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
      />
      <div v-else class="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
        <span class="text-4xl">🧘‍♀️</span>
      </div>

      <!-- Badge de difficulté -->
      <div class="absolute top-2 right-2">
        <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full shadow-sm"
              :class="{
                'text-green-700 bg-green-50/90': course.difficulty_level === 'beginner',
                'text-orange-700 bg-orange-50/90': course.difficulty_level === 'intermediate',
                'text-red-700 bg-red-50/90': course.difficulty_level === 'advanced'
              }">
          {{ formatDifficulty(course.difficulty_level) }}
        </span>
      </div>
    </div>

    <!-- Informations du cours -->
    <div class="space-y-3">
      <!-- Titre -->
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
        {{ course.title }}
      </h3>

      <!-- Professeur -->
      <div v-if="course.teacher" class="flex items-center text-sm text-gray-600">
        <span class="mr-1">👨‍🏫</span>
        <span>{{ course.teacher.name }}</span>
      </div>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-3">
        {{ course.description }}
      </p>

      <!-- Objectifs (si disponibles) -->
      <div v-if="course.goals && course.goals.length > 0" class="flex flex-wrap gap-1">
        <span
            v-for="goal in course.goals.slice(0, 2)"
            :key="goal"
            class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
        >
          {{ goal }}
        </span>
        <span v-if="course.goals.length > 2" class="text-xs text-gray-500 px-2 py-1">
          +{{ course.goals.length - 2 }} more
        </span>
      </div>

      <!-- Détails du cours -->
      <div class="flex justify-between items-center pt-2 border-t border-gray-100">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <!-- Durée -->
          <div class="flex items-center">
            <span class="mr-1">⏱️</span>
            <span>{{ course.duration_minutes }}min</span>
          </div>

          <!-- Capacité -->
          <div class="flex items-center">
            <span class="mr-1">👥</span>
            <span>{{ course.max_capacity }}</span>
          </div>
        </div>

        <!-- Prix -->
        <div class="text-lg font-bold text-green-600">
          {{ course.price }}€
        </div>
      </div>

      <!-- Indicateur cliquable -->
      <div class="text-center pt-2">
        <span class="text-xs text-gray-500">Click to see details →</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Course } from '~/types/Course'
import { useCourseCardLogic } from '~/scripts/course/CourseCardLogic'

const props = defineProps<{
  course: Course
}>()

const { navigateToCourse, formatDifficulty } = useCourseCardLogic(props.course)
</script>



<style scoped>
.course-card {
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 350px;
}

.course-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>