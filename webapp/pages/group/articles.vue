<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">All articles</h1>

    <div v-if="pending" class="text-center py-8">
      Loading articles...
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {{ error }}
    </div>

    <div v-else class="grid gap-6">
      <div
          v-for="article in articles"
          :key="article.id"
          class="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-900">{{ article.title }}</h2>
          <span
              :class="article.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ article.is_published ? 'Publish' : 'Draft' }}
          </span>
        </div>

        <p class="text-gray-600 mb-4">{{ article.snippet }}</p>

        <div class="flex flex-wrap gap-2 mb-4" v-if="article.tags?.length">
          <span
              v-for="tag in article.tags"
              :key="tag"
              class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center justify-between text-sm text-gray-500">
          <div>
            <span v-if="article.authors?.length">
              By {{ article.authors.join(', ') }}
            </span>
            <span class="mx-2">•</span>
            <span>{{ formatDate(article.published_at || article.created_at) }}</span>
          </div>
          <span>{{ article.views_count }} views</span>
        </div>
      </div>
    </div>

    <div v-if="articles?.length === 0" class="text-center py-8 text-gray-500">
      No items found
    </div>
  </div>
</template>

<script setup lang="ts">
import {type Article} from '~/types/Article'
import {useArticles} from "~/managers/articleManager";



const { getAllArticles } = useArticles()

const { data: articles, pending, error } = await useAsyncData<Article[]>(
    'all-articles',
    () => getAllArticles()
)

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>