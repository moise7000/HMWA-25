<template>
  <div>
    <BreadCrumps :breadCrumps="breadCrumps" />

    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="text-lg">Loading...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="text-red-500 text-lg">Error: {{ error.message }}</div>
    </div>

    <div v-else-if="article" class="max-w-6xl mx-auto px-6 py-8">
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

const route = useRoute()
const { getAllArticles } = useArticles()

const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)

// Fonction pour créer un slug à partir du titre (même logique que dans ArticleCard)
const createSlug = (title: string): string => {
  return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
      .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
      .replace(/[^\w-]/g, '') // Supprimer les caractères spéciaux
}

// Fonction pour formater la date
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
</style>