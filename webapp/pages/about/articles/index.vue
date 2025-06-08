<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description" />
  <div class="p-6 animate-fade-in">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error: {{ error.message }}</div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <ArticleCard
            v-for="article in displayedArticles"
            :key="article.id"
            :article="article"
        />
      </div>

      <!-- Bouton More -->
      <div v-if="hasMoreArticles" class="flex justify-center">
        <button
            @click="loadMoreArticles"
            :disabled="loadingMore"
            class="bg-white border-2 border-black text-gray-700 px-8 py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"

        >
          {{ loadingMore ? 'Loading...' : 'More' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = "Latest Articles"
const description = "Discover our latest articles about yoga, wellness, and mindfulness. Explore insights, tips, and inspiration from our experienced teachers and practitioners."

const breadCrumps = [{
  name: "About",
  link: "/about"
}, {
  name: "Articles",
  link: "/institute/articles"
}]

import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
import { ref, onMounted, computed } from 'vue'
import { useArticles } from '~/managers/articleManager'
import ArticleCard from '~/components/article/ArticleCard.vue'
import type { Article } from '@/types/Article'

const { getAllArticles } = useArticles()
const articlesList = ref<Article[]>([])
const displayedArticles = ref<Article[]>([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref<Error | null>(null)


const articlesPerPage = 4
const currentPage = ref(1)


const hasMoreArticles = computed(() => {
  return displayedArticles.value.length < articlesList.value.length
})

// Fonction pour charger plus d'articles
const loadMoreArticles = () => {
  if (loadingMore.value || !hasMoreArticles.value) return

  loadingMore.value = true

  // Simuler un petit délai pour l'UX
  setTimeout(() => {
    currentPage.value++
    const startIndex = (currentPage.value - 1) * articlesPerPage
    const endIndex = startIndex + articlesPerPage
    const newArticles = articlesList.value.slice(startIndex, endIndex)

    displayedArticles.value = [...displayedArticles.value, ...newArticles]
    loadingMore.value = false
  }, 500)
}

onMounted(async () => {
  try {
    articlesList.value = await getAllArticles()
    // Afficher les premiers articles
    displayedArticles.value = articlesList.value.slice(0, articlesPerPage)
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>

<style>
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