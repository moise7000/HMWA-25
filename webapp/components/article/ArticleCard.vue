<template>
  <div class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
    <!-- Image de l'article -->
    <div class="relative">
      <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="w-full h-48 object-cover"
      />
      <div v-else class="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
        <span class="text-white text-4xl">📖</span>
      </div>


    </div>

    <!-- Contenu de la card -->
    <div class="p-6">
      <p class="text-gray-400 text-xs  mb-4 ">
        {{ formatDate(article.created_at) }}
      </p>

      <h3 class="text-xl font-bold mb-3 line-clamp-2">
        {{ article.title }}
      </h3>





      <!-- Extrait/Description -->
      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ article.content?.substring(0,30) + '...' }}
      </p>

      <!-- Catégorie/Tags si disponibles -->
      <div v-if="article.category" class="mb-4">
        <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {{ article.category }}
        </span>
      </div>

      <!-- Auteur si disponible -->
      <div v-if="article.author" class="flex items-center mb-4 text-sm text-gray-600">
        <span class="mr-2">✍️</span>
        <span>By {{ article.author }}</span>
      </div>

      <!-- Bouton Read more -->
      <NuxtLink
          :to="`/about/articles/${createSlug(article.title)}`"
          class="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center block font-medium"
      >
        Read more
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types/Article'

interface Props {
  article: Article
}

const props = defineProps<Props>()

// Fonction pour créer un slug à partir du titre
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
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
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