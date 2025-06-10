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


    <div class="p-6">
      <p class="text-gray-400 text-xs  mb-4 ">
        {{ formatDate(article.created_at) }}
      </p>

      <h3 class="text-xl font-bold mb-3 line-clamp-2">
        {{ article.title }}
      </h3>


      <p class="text-gray-600 mb-4 line-clamp-3">
        {{ article.content?.substring(0,250) + '...' }}
      </p>


      <div v-if="article.category" class="mb-4">
        <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {{ article.category }}
        </span>
      </div>


      <div v-if="article.author" class="flex items-center mb-4 text-sm text-gray-600">
        <span class="mr-2">✍️</span>
        <span>By {{ article.author }}</span>
      </div>

      
      <BaseButton
          :url="`/about/articles/${createSlug(article.title)}`"
          :variant="1"
      >
        Read more
      </BaseButton>






    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types/Article'
import { createSlug, formatDate } from '~/scripts/article/articleCardLogic'
import BaseButton from "~/components/common/BaseButton.vue";

interface Props {
  article: Article
}

const props = defineProps<Props>()
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