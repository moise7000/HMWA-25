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
        <NuxtLink to="/institute/teachers" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to teachers
        </NuxtLink>
      </div>
    </div>

    <!-- Teacher not found -->
    <div v-else-if="!teacher" class="text-center min-h-screen flex items-center justify-center">
      <div>
        <h2 class="text-2xl font-bold mb-4">Teacher not found</h2>
        <NuxtLink to="/institute/teachers" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to teachers
        </NuxtLink>
      </div>
    </div>

    <!-- Teacher details -->
    <div v-else>
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <NuxtLink to="/institute/teachers" class="text-blue-500 hover:text-blue-600">← Back to teachers</NuxtLink>
      </nav>

      <!-- Teacher Profile -->
      <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
          <!-- Photo -->
          <div class="flex-shrink-0">
            <img
                v-if="teacher.photo"
                :src="teacher.photo"
                :alt="`Photo de ${teacher.name}`"
                class="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover"
            />
            <div v-else class="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full text-4xl">
              👤
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ teacher.name }}</h1>
            <p class="text-gray-600 mb-4">{{ teacher.email }}</p>

            <!-- Biography -->
            <div class="mb-6">
              <h2 class="text-xl font-semibold mb-2">Biography</h2>
              <p class="text-gray-700 leading-relaxed">{{ teacher.biography }}</p>
            </div>

            <!-- Certificates -->
            <div v-if="teacher.certificates && teacher.certificates.length > 0" class="mb-6">
              <h2 class="text-xl font-semibold mb-3">Certifications</h2>
              <div class="flex flex-wrap gap-2">
                <span
                    v-for="certificate in teacher.certificates"
                    :key="certificate"
                    class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {{ certificate }}
                </span>
              </div>
            </div>

            <!-- Social Media -->
            <div v-if="teacher.socialMedia" class="mb-6">
              <h2 class="text-xl font-semibold mb-3">Socials</h2>
              <div class="flex gap-4 justify-center md:justify-start">
                <a
                    v-if="teacher.socialMedia.instagram"
                    :href="teacher.socialMedia.instagram"
                    target="_blank"
                    class="flex items-center gap-2 text-pink-500 hover:text-pink-600 transition-colors"
                >
                  📷 Instagram
                </a>
                <a
                    v-if="teacher.socialMedia.linkedin"
                    :href="teacher.socialMedia.linkedin"
                    target="_blank"
                    class="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  💼 LinkedIn
                </a>
                <a
                    v-if="teacher.socialMedia.website"
                    :href="teacher.socialMedia.website"
                    target="_blank"
                    class="flex items-center gap-2 text-gray-600 hover:text-gray-700 transition-colors"
                >
                  🌐 Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Teacher's Courses -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-6">Courses taught by {{ teacher.name }}</h2>

        <div v-if="coursesLoading" class="text-center py-8">
          Loading ...
        </div>

        <div v-else-if="coursesError" class="text-red-500 text-center py-8">
          Error while loading the courses: {{ coursesError.message }}
        </div>

        <div v-else-if="teacherCourses.length === 0" class="text-center py-8 text-gray-500">
          No course.
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="course in teacherCourses"
              :key="course.id"
              class="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img
                v-if="course.image"
                :src="course.image"
                :alt="course.title"
                class="w-full h-32 object-cover rounded mb-3"
            />
            <h3 class="font-semibold mb-2">{{ course.title }}</h3>
            <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ course.description }}</p>
            <div class="flex justify-between items-center text-sm">
              <span class="text-green-600 font-medium">{{ course.price }}€</span>
              <span class="text-gray-500">{{ course.duration_minutes }}min</span>
            </div>
            <div class="mt-2">
              <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {{ course.difficulty_level }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTeachers } from '~/managers/teacherManager'
import { useCourses } from '~/managers/courseManager'
import type { Teacher } from '~/types/Teacher'
import type { Course } from '~/types/Course'

const route = useRoute()
const { getAllTeachers } = useTeachers()
const { getCoursesByTeacher } = useCourses()

const teacher = ref<Teacher | null>(null)
const teacherCourses = ref<Course[]>([])
const loading = ref(true)
const coursesLoading = ref(true)
const error = ref<Error | null>(null)
const coursesError = ref<Error | null>(null)

// Fonction pour créer un slug à partir du nom
const createSlug = (name: string): string => {
  return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/[^\w-]/g, '') // Supprimer les caractères spéciaux
}

onMounted(async () => {
  const teacherSlug = route.params.teacher as string

  try {
    // Récupérer tous les professeurs pour trouver celui qui correspond au slug
    const allTeachers = await getAllTeachers()

    // Trouver le professeur correspondant au slug
    const foundTeacher = allTeachers.find(t => createSlug(t.name) === teacherSlug)

    if (foundTeacher) {
      teacher.value = foundTeacher

      // Charger les cours du professeur
      try {
        teacherCourses.value = await getCoursesByTeacher(foundTeacher.id.toString())
      } catch (err: any) {
        coursesError.value = err
      } finally {
        coursesLoading.value = false
      }
    } else {
      // Professeur non trouvé
      teacher.value = null
    }
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})

// SEO Meta
useHead({
  title: computed(() => teacher.value ? `${teacher.value.name} - Yoga teacher` : 'teacher'),
  meta: [
    {
      name: 'description',
      content: computed(() => teacher.value ? `Discover ${teacher.value.name}, yoga teacher. ${teacher.value.biography.substring(0, 150)}...` : '')
    }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>