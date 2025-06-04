<template>
  <div class="container mx-auto p-6 max-w-6xl">
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
      <nav class="mb-8">
        <NuxtLink to="/courses-and-subscriptions/courses" class="text-blue-500 hover:text-blue-600">← Back to courses</NuxtLink>
      </nav>


      <!-- Course Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <!-- Left Column - Image -->
        <div class="flex justify-center">
          <div class="relative w-full max-w-md">
            <img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
                class="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <div v-else class="w-full h-80 flex items-center justify-center bg-gray-200 text-gray-500 text-6xl rounded-lg shadow-lg">
              🧘‍♀️
            </div>
          </div>
        </div>

        <!-- Right Column - Course Info -->
        <div class="space-y-6">
          <!-- Course Title -->
          <h2 class="text-2xl font-bold mb-4">{{ course.title }}</h2>

          <!-- Course Description -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-semibold mb-3">Course Description</h3>
            <p class="text-gray-700 text-sm leading-relaxed mb-4">{{ course.description }}</p>

            <!-- Teacher Info -->
            <div v-if="teacher && !teacherLoading" class="border-t pt-4">
              <div class="flex items-center">
                <img
                    v-if="teacher.photo"
                    :src="teacher.photo"
                    :alt="`Photo de ${teacher.name}`"
                    class="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div v-else class="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full mr-3 text-sm">
                  👤
                </div>
                <div>
                  <p class="font-medium text-sm">{{ teacher.name }}</p>
                  <p class="text-xs text-gray-600">{{ formatDifficulty(course.difficulty_level) }} • {{ course.duration_minutes }} min</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Price and Action -->
          <div class="bg-white rounded-lg p-6">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-2xl font-bold">$ {{ course.price }}.00</span>
                <p class="text-xs text-gray-500 mt-1">Starting at the subscription price</p>
              </div>
              <button class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded font-medium transition-colors">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="font-semibold mb-2">First</h3>
          <p class="text-sm text-gray-600">Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
        </div>

        <!-- Feature 2 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="font-semibold mb-2">Second</h3>
          <p class="text-sm text-gray-600">Body text for whatever you'd like to suggest. Add motivational points, quotes, anecdotes, or even a very short story.</p>
        </div>

        <!-- Feature 3 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🔒</span>
          </div>
          <h3 class="font-semibold mb-2">Third</h3>
          <p class="text-sm text-gray-600">Body text for whatever you'd like to claim. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
        </div>

        <!-- Feature 4 -->
        <div class="text-center">
          <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">📈</span>
          </div>
          <h3 class="font-semibold mb-2">Fourth</h3>
          <p class="text-sm text-gray-600">Body text for whatever you'd like to claim. Add main takeaway points, quotes, anecdotes, or even a very short story.</p>
        </div>
      </div>

      <!-- Additional Course Info (collapsible/expandable sections) -->
      <div class="mt-16 space-y-6">
        <!-- Goals Section -->
        <div v-if="course.goals && course.goals.length > 0" class="bg-white rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">What you'll achieve</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div
                v-for="goal in course.goals"
                :key="goal"
                class="flex items-center p-3 bg-blue-50 rounded-lg"
            >
              <span class="text-blue-600 mr-3">✓</span>
              <span class="text-gray-700 text-sm">{{ goal }}</span>
            </div>
          </div>
        </div>

        <!-- Schedule Section
        <div v-if="course.timetable" class="bg-white rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">Schedule</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <pre class="text-sm text-gray-700">{{ formatTimetable(course.timetable) }}</pre>
          </div>
        </div> -->

        <!-- Course Details -->
        <div class="bg-white rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">Course Details</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Duration:</span>
              <p class="font-medium">{{ course.duration_minutes }} min</p>
            </div>
            <div>
              <span class="text-gray-600">Level:</span>
              <p class="font-medium">{{ formatDifficulty(course.difficulty_level) }}</p>
            </div>
            <div>
              <span class="text-gray-600">Capacity:</span>
              <p class="font-medium">{{ course.max_capacity }} people</p>
            </div>
            <div>
              <span class="text-gray-600">Price:</span>
              <p class="font-medium text-600">${{ course.price }}.00</p>
            </div>
          </div>
        </div>

        <!-- Teacher Bio (if available) -->
        <div v-if="teacher && !teacherLoading && teacher.biography" class="bg-white rounded-lg border p-6">
          <h3 class="text-lg font-semibold mb-4">About Your Instructor</h3>
          <div class="flex items-start space-x-4">
            <img
                v-if="teacher.photo"
                :src="teacher.photo"
                :alt="`Photo de ${teacher.name}`"
                class="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div v-else class="w-16 h-16 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full flex-shrink-0">
              👤
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-2">{{ teacher.name }}</h4>
              <p class="text-sm text-gray-600">{{ teacher.biography }}</p>
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
  const routeSlug = route.params.course as string

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
/* Custom styles if needed */
</style>