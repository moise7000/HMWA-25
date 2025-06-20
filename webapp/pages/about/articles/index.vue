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

        <BaseButton
            as-button
            :variant="2"
            :disabled="loadingMore"
            @click="loadMoreArticles"
        >
    {{ loadingMore ? 'Loading...' : 'More' }}
        </BaseButton>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
import ArticleCard from '~/components/article/ArticleCard.vue'
import { useArticlesPage } from '~/composables/useArticlesPage'
import BaseButton from "~/components/common/BaseButton.vue";

const {
  title,
  description,
  breadCrumps,
  displayedArticles,
  loading,
  loadingMore,
  error,
  hasMoreArticles,
  loadMoreArticles
} = useArticlesPage()

useSeoMeta({
  title: title,
  description: description
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