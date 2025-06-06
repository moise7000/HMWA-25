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
            <div class="flex items-center justify-between space-x-4">
              <div>
                <span class="text-2xl font-bold">$ {{ course.price }}.00</span>
                <p class="text-xs text-gray-500 mt-1">Starting at the subscription price</p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                    @click="handleEnrollClick"
                    :disabled="isEnrolling || isAlreadyEnrolled"
                    class="px-6 py-2 rounded font-medium transition-colors"
                    :class="isAlreadyEnrolled
            ? 'bg-green-100 text-green-700 border border-green-300 cursor-not-allowed'
            : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed'"
                >
        <span v-if="isEnrolling" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enrolling...
        </span>
                  <span v-else-if="isAlreadyEnrolled">✓ Already Enrolled</span>
                  <span v-else>Enroll</span>
                </button>

                <!-- Bouton Unenroll -->
                <button
                    v-if="isAlreadyEnrolled"
                    @click="handleUnenrollClick"
                    :disabled="isUnenrolling"
                    class="px-4 py-2 rounded bg-red-100 text-red-700 border border-red-300 cursor-pointer hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
  <span v-if="isUnenrolling" class="flex items-center">
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Unenrolling...
  </span>
                  <span v-else>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
      <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  </span>
                </button>

              </div>
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

    <!-- Success Modal -->
    <Modal :show="showSuccessModal" @close="showSuccessModal = false">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2 text-gray-900">Successfully Enrolled!</h2>
        <p class="text-gray-600 mb-4">You have been enrolled in "{{ course?.title }}". You can access your courses from your dashboard.</p>
        <div class="flex justify-center gap-4">
          <NuxtLink to="/auth/dashboard" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go to Dashboard
          </NuxtLink>
          <button @click="showSuccessModal = false" class="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
            Continue Browsing
          </button>
        </div>
      </div>
    </Modal>

    <!-- Error Modal -->
    <Modal :show="showErrorModal" @close="showErrorModal = false">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold mb-2 text-gray-900">Enrollment Failed</h2>
        <p class="text-gray-600 mb-4">{{ enrollmentError }}</p>
        <div class="flex justify-center">
          <button @click="showErrorModal = false" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Close
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCourses } from '~/managers/courseManager'
import { useTeachers } from '~/managers/teacherManager'
import { useCourseEnrollments } from '~/managers/courseEnrollementManager'
import type { Course } from '~/types/Course'
import type { Teacher } from '~/types/Teacher'
import Modal from '~/components/course/EnrollModal.vue'

const route = useRoute()
const router = useRouter()
const { getAllCoursesWithTeachers } = useCourses()
const { getTeacherById } = useTeachers()
const { enrollProfileToCourse, getCoursesForProfile, removeProfileFromCourse } = useCourseEnrollments()

// Accès à l'utilisateur Supabase
const user = useSupabaseUser()

const course = ref<Course | null>(null)
const teacher = ref<Teacher | null>(null)
const loading = ref(true)
const teacherLoading = ref(false)
const error = ref<Error | null>(null)
const showModal = ref(false)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const isEnrolling = ref(false)
const isAlreadyEnrolled = ref(false)
const enrollmentError = ref('')

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

// Vérifier si l'utilisateur est déjà inscrit au cours
const checkEnrollmentStatus = async () => {
  if (!user.value || !course.value) return

  try {
    const userCourses = await getCoursesForProfile(user.value.id)
    isAlreadyEnrolled.value = userCourses.some(userCourse => userCourse.id === course.value?.id)
  } catch (err) {
    console.error('Error checking enrollment status:', err)
  }
}

// Gestion du clic sur le bouton Enroll avec inscription en base
const handleEnrollClick = async () => {
  // Vérifier si l'utilisateur est connecté
  if (!user.value) {
    // Rediriger vers la page de connexion
    await router.push('/auth/signin')
    return
  }

  // Vérifier si déjà inscrit
  if (isAlreadyEnrolled.value) {
    return
  }

  // Vérifier que le cours existe
  if (!course.value) {
    enrollmentError.value = 'Course information not available.'
    showErrorModal.value = true
    return
  }

  isEnrolling.value = true

  try {
    // Inscrire l'utilisateur au cours
    await enrollProfileToCourse(user.value.id, course.value.id.toString())

    // Mettre à jour le statut d'inscription
    isAlreadyEnrolled.value = true

    // Afficher la modal de succès
    showSuccessModal.value = true
  } catch (err: any) {
    console.error('Error enrolling in course:', err)
    enrollmentError.value = err.message || 'An error occurred while enrolling in the course.'
    showErrorModal.value = true
  } finally {
    isEnrolling.value = false
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

      // Vérifier le statut d'inscription si l'utilisateur est connecté
      if (user.value) {
        await checkEnrollmentStatus()
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

const isUnenrolling = ref(false)

const handleUnenrollClick = async () => {
  if (!user.value || !course.value) return
  isUnenrolling.value = true
  enrollmentError.value = ''

  try {
    // Appel à la fonction du manager pour se désinscrire
    await removeProfileFromCourse(user.value.id, course.value.id)
    isAlreadyEnrolled.value = false

  } catch (err: any) {
    enrollmentError.value = err.message || 'Failed to unenroll. Please try again.'
    showErrorModal.value = true
  } finally {
    isUnenrolling.value = false
  }
}


// Surveiller les changements de l'utilisateur pour vérifier le statut d'inscription
watch(user, async (newUser) => {
  if (newUser && course.value) {
    await checkEnrollmentStatus()
  } else {
    isAlreadyEnrolled.value = false
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