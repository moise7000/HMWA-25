<template>
  <div>
    <BreadCrumps :breadCrumps="breadCrumps" />

    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-lg">Loading...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="text-red-500 text-lg">Error: {{ error.message }}</div>
    </div>

    <div v-else-if="article" class="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne de gauche - Informations de l'article -->
        <div class="lg:col-span-1">
          <div class="border-b border-gray-300 pb-6 mb-6">
            <h1 class="text-2xl font-bold mb-4">{{ article.title }}</h1>

            <div class="space-y-2 text-sm text-gray-600">
              <div>
                <span class="font-medium">Publish date</span><br>
                <span>{{ formatDate(article.created_at) }}</span>
              </div>

              <div v-if="article.author">
                <span class="font-medium">Author</span><br>
                <span>{{ article.author }}</span>
              </div>
            </div>
          </div>

          <!-- Liens vers les cours/événements -->
          <div v-if="relatedLinks.length > 0">
            <ul class="space-y-2">
              <li v-for="link in relatedLinks" :key="link.name" class="text-sm">
                <NuxtLink
                    :to="link.url"
                    class="text-blue-600 hover:text-blue-800 underline"
                >
                  • {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Colonne de droite - Image et contenu -->
        <div class="lg:col-span-2">
          <!-- Image principale -->
          <div class="mb-8">
            <img
                v-if="article.image"
                :src="article.image"
                :alt="article.title"
                class="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
            <div
                v-else
                class="w-full h-64 md:h-80 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center rounded-lg shadow-lg"
            >
              <span class="text-white text-6xl">📖</span>
            </div>
          </div>

          <!-- Contenu de l'article -->
          <div class="prose prose-lg max-w-none">
            <div class="text-gray-700 leading-relaxed whitespace-pre-line">
              {{ article.content }}
            </div>
          </div>

          <!-- Catégorie -->
          <div v-if="article.category" class="mt-8">
            <span class="inline-block px-4 py-2 bg-blue-100 text-blue-800 text-sm rounded-full">
              {{ article.category }}
            </span>
          </div>
        </div>
      </div>
      <!-- Ajoutez cette section après la catégorie et avant la fermeture de la div principale -->

      <!-- Related Courses Section -->
      <div v-if="relatedCourses.length > 0" class="mt-12 border-t border-gray-200 pt-8">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Related Courses</h2>

        <!-- Loading state for courses -->
        <div v-if="coursesLoading" class="flex justify-center py-8">
          <div class="text-gray-500">Loading courses...</div>
        </div>

        <!-- Courses Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
              v-for="course in relatedCourses"
              :key="course.id"
              :course="course"
          />
        </div>

        <!-- Show more button if there are more courses (optionnel) -->
        <div v-if="relatedCourses.length >= coursesLimit" class="text-center mt-8">
          <button
              @click="loadMoreCourses"
              :disabled="loadingMoreCourses"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
                <span v-if="loadingMoreCourses" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading more...
                </span>
            <span v-else>Show More Courses</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center min-h-screen">
      <div class="text-lg text-gray-600">Article not found</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticles } from '~/managers/articleManager'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import type { Article } from '@/types/Article'
import { useArticleCourseManager } from '~/managers/articleCourseManager'
import CourseCard from '~/components/course/CourseCard.vue'
import type { Course } from '~/types/Course'

const route = useRoute()
const { getAllArticles } = useArticles()

const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)
const relatedCourses = ref<Course[]>([])
const coursesLoading = ref(false)
const coursesLimit = ref(6)
const loadingMoreCourses = ref(false)

const { getCoursesForArticle } = useArticleCourseManager()
// Fonction pour créer un slug à partir du titre (même logique que dans ArticleCard)
const createSlug = (title: string): string => {
  return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/[^\w-]/g, '') // Supprimer les caractères spéciaux
}


// Fonction pour charger les cours liés à l'article
const loadRelatedCourses = async () => {
  if (!article.value) return

  coursesLoading.value = true
  try {
    const articleCourses = await getCoursesForArticle(article.value.id.toString())
    // Limiter le nombre de cours affichés initialement
    relatedCourses.value = articleCourses.slice(0, coursesLimit.value)
  } catch (err) {
    console.error('Error loading related courses:', err)
    relatedCourses.value = []
  } finally {
    coursesLoading.value = false
  }
}

// Fonction pour charger plus de cours (optionnelle)
const loadMoreCourses = async () => {
  if (!article.value) return

  loadingMoreCourses.value = true
  try {
    const allCourses = await getCoursesForArticle(article.value.id.toString())
    const newLimit = coursesLimit.value + 6
    relatedCourses.value = allCourses.slice(0, newLimit)
    coursesLimit.value = newLimit
  } catch (err) {
    console.error('Error loading more courses:', err)
  } finally {
    loadingMoreCourses.value = false
  }
}



const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}


const relatedLinks = ref([
  // { name: 'Link courses/events', url: '/courses' },
  // { name: 'Link courses/events', url: '/events' },
  // { name: 'Link courses/events', url: '/workshops' }
])


const breadCrumps = ref([
  { name: "About", link: "/about" },
  { name: "Articles", link: "/about/articles" },
  { name: "Article", link: "#" }
])

onMounted(async () => {
  try {
    const articleSlug = route.params.article as string
    const allArticles = await getAllArticles()

    // Trouver l'article correspondant au slug
    const foundArticle = allArticles.find(a => createSlug(a.title) === articleSlug)

    if (foundArticle) {
      article.value = foundArticle
      // Mettre à jour le breadcrumb avec le titre de l'article
      breadCrumps.value[2].name = foundArticle.title
      await loadRelatedCourses()
    } else {
      throw new Error('Article not found')
    }
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})

// Meta tags pour SEO
useHead(() => ({
  title: article.value ? article.value.title : 'Article',
  meta: [
    {
      name: 'description',
      content: article.value ? article.value.content?.substring(0, 160) + '...' : 'Article details'
    }
  ]
}))
</script>

<style scoped>
.prose {
  font-size: 1.1rem;
  line-height: 1.8;
}

.prose p {
  margin-bottom: 1.5rem;
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