<template>
  <div class="container mx-auto p-6">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-lg">Loading...</div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center text-red-500 min-h-screen flex items-center justify-center">
      <div>
        <h2 class="text-2xl font-bold mb-4">Error</h2>
        <p>{{ error.message }}</p>
        <NuxtLink to="/courses-and-subscriptions/courses" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to courses
        </NuxtLink>
      </div>
    </div>

    <!-- Course not found -->
    <div v-else-if="!course" class="text-center min-h-screen flex items-center justify-center">
      <div>
        <h2 class="text-2xl font-bold mb-4">Course not found</h2>
        <NuxtLink to="/courses-and-subscriptions/courses" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to courses
        </NuxtLink>
      </div>
    </div>

    <!-- Course details -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <NuxtLink to="/courses-and-subscriptions/courses" class="text-blue-500 hover:text-blue-600">← Back to courses</NuxtLink>
      </nav>

      <!-- Course Header -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Image et vidéo -->
          <div class="space-y-4">
            <!-- Image principale -->
            <div class="relative rounded-lg overflow-hidden">
              <img
                  v-if="course.image"
                  :src="course.image"
                  :alt="course.title"
                  class="w-full h-64 lg:h-80 object-cover"
              />
              <div v-else class="w-full h-64 lg:h-80 flex items-center justify-center bg-gray-200 text-gray-500 text-6xl rounded-lg">
                🧘‍♀️
              </div>

              <!-- Badge de difficulté -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm font-medium rounded-full shadow-sm"
                      :class="{
                        'text-green-700 bg-green-50/90': course.difficulty_level === 'beginner',
                        'text-orange-700 bg-orange-50/90': course.difficulty_level === 'intermediate',
                        'text-red-700 bg-red-50/90': course.difficulty_level === 'advanced'
                      }">
                  {{ formatDifficulty(course.difficulty_level) }}
                </span>
              </div>
            </div>

            <!-- Vidéo d'introduction -->
            <div v-if="course.intro_video_url" class="rounded-lg overflow-hidden">
              <iframe
                  :src="course.intro_video_url"
                  class="w-full h-48 lg:h-64"
                  frameborder="0"
                  allowfullscreen
                  title="Course introduction video"
              ></iframe>
            </div>
          </div>

          <!-- Informations du cours -->
          <div class="space-y-6">
            <div>
              <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ course.title }}</h1>

              <!-- Professeur -->
              <div v-if="teacher && !teacherLoading" class="flex items-center mb-6">
                <img
                    v-if="teacher.photo"
                    :src="teacher.photo"
                    :alt="`Photo de ${teacher.name}`"
                    class="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div v-else class="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full mr-3">
                  👤
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ teacher.name }}</p>
                  <p class="text-sm text-gray-600">Instructor</p>
                </div>
              </div>

              <!-- Loading teacher -->
              <div v-else-if="teacherLoading" class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gray-200 rounded-full mr-3 animate-pulse"></div>
                <div>
                  <div class="h-4 bg-gray-200 rounded w-24 mb-1 animate-pulse"></div>
                  <div class="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>

              <!-- Prix et bouton -->
              <div class="bg-gray-50 rounded-lg p-6 mb-6">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-3xl font-bold text-green-600">{{ course.price }}€</span>
                  <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Book now
                  </button>
                </div>

                <!-- Détails rapides -->
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center">
                    <span class="mr-2">⏱️</span>
                    <span>{{ course.duration_minutes }} minutes</span>
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">👥</span>
                    <span>Max {{ course.max_capacity }} people</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-4">About this course</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ course.description }}</p>
          </div>

          <!-- Objectifs -->
          <div v-if="course.goals && course.goals.length > 0" class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-4">What you'll achieve</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                  v-for="goal in course.goals"
                  :key="goal"
                  class="flex items-center p-3 bg-blue-50 rounded-lg"
              >
                <span class="text-blue-600 mr-3">✓</span>
                <span class="text-gray-700">{{ goal }}</span>
              </div>
            </div>
          </div>

          <!-- Horaires -->
          <div v-if="course.timetable" class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-4">Schedule</h2>
            <div class="bg-gray-50 p-4 rounded-lg">
              <pre class="text-sm text-gray-700">{{ formatTimetable(course.timetable) }}</pre>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Course details card -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Course Details</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Duration:</span>
                <span class="font-medium">{{ course.duration_minutes }} min</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Level:</span>
                <span class="font-medium">{{ formatDifficulty(course.difficulty_level) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Capacity:</span>
                <span class="font-medium">{{ course.max_capacity }} people</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Price:</span>
                <span class="font-medium text-green-600">{{ course.price }}€</span>
              </div>
            </div>
          </div>

          <!-- Teacher card -->
          <div v-if="teacher && !teacherLoading" class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Your Instructor</h3>
            <div class="text-center">
              <img
                  v-if="teacher.photo"
                  :src="teacher.photo"
                  :alt="`Photo de ${teacher.name}`"
                  class="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <div v-else class="w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full mx-auto mb-3 text-2xl">
                👤
              </div>
              <h4 class="font-medium text-gray-900 mb-2">{{ teacher.name }}</h4>
              <p class="text-sm text-gray-600 mb-3 line-clamp-3">{{ teacher.biography }}</p>
            </div>
          </div>

          <!-- Loading teacher card -->
          <div v-else-if="teacherLoading" class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Your Instructor</h3>
            <div class="text-center">
              <div class="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
              <div class="h-4 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
              <div class="h-3 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCourses } from '~/managers/courseManager'
import { useTeachers } from '~/managers/teacherManager'
import type { Course } from '~/types/Course'
import type { Teacher } from '~/types/Teacher'

const route = useRoute()
const { getAllCoursesWithTeachers } = useCourses()
const { getTeacherById } = useTeachers()

const course = ref<Course | null>(null)
const teacher = ref<Teacher | null>(null)
const loading = ref(true)
const teacherLoading = ref(false)
const error = ref<Error | null>(null)

// Fonction pour créer un slug
const createSlug = (name: string): string => {
  return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/[^\w-]/g, '') // Supprimer les caractères spéciaux
}

const formatDifficulty = (level: string) => {
  const levels: { [key: string]: string } = {
    'beginner': 'Beginner',
    'intermediate': 'Intermediate',
    'advanced': 'Advanced'
  }
  return levels[level] || level
}

const formatTimetable = (timetable: any): string => {
  if (typeof timetable === 'string') return timetable
  if (typeof timetable === 'object') return JSON.stringify(timetable, null, 2)
  return 'Schedule information available upon booking'
}

const loadTeacher = async (teacherId: string) => {
  teacherLoading.value = true
  try {
    teacher.value = await getTeacherById(teacherId)
  } catch (err) {
    console.error('Error loading teacher:', err)
    teacher.value = null
  } finally {
    teacherLoading.value = false
  }
}

onMounted(async () => {
  const routeSlug = route.params.course as string // Correction de la syntaxe

  try {
    const allCourses = await getAllCoursesWithTeachers()

    // Trouver le cours correspondant au slug
    const foundCourse = allCourses.find(c => {
      const courseSlug = createSlug(c.title) // Slug généré à partir du titre
      return courseSlug === routeSlug // Comparer avec le slug de l'URL
    })

    if (foundCourse) {
      course.value = foundCourse

      // Charger les détails du professeur si teacher_id existe
      if (foundCourse.teacher_id) {
        await loadTeacher(foundCourse.teacher_id.toString())
      }
    } else {
      course.value = null
    }
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})

// SEO Meta
useHead({
  title: computed(() => course.value ? `${course.value.title} - Yoga Course` : 'Course'),
  meta: [
    {
      name: 'description',
      content: computed(() => course.value ? `${course.value.description.substring(0, 150)}...` : '')
    }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>