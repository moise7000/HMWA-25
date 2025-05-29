<template>
  <div class="teacher-card border rounded p-4 shadow-sm">
    <div class="mb-3">
      <img
          v-if="teacher.photo"
          :src="teacher.photo"
          :alt="`Photo de ${teacher.name}`"
          class="w-24 h-24 rounded-full object-cover mx-auto"
      />
      <div v-else class="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full mx-auto">
        👤
      </div>
    </div>

    <h3 class="text-lg font-semibold mb-2 text-center">{{ teacher.name }}</h3>

    <p class="text-sm text-gray-600 mb-3 text-center">{{ teacher.email }}</p>

    <div class="mb-3">
      <p class="text-sm text-gray-700 line-clamp-3">{{ teacher.biography }}</p>
    </div>

    <div v-if="teacher.certificates && teacher.certificates.length > 0" class="mb-3">
      <h4 class="text-sm font-medium text-gray-800 mb-1">Certifications:</h4>
      <div class="flex flex-wrap gap-1">
        <span
            v-for="certificate in teacher.certificates"
            :key="certificate"
            class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
        >
          {{ certificate }}
        </span>
      </div>
    </div>

    <div v-if="teacher.socialMedia" class="flex justify-center gap-3 mt-3">
      <a
          v-if="teacher.socialMedia.instagram"
          :href="teacher.socialMedia.instagram"
          target="_blank"
          class="text-pink-500 hover:text-pink-600 transition-colors"
          title="Instagram"
      >
        📷
      </a>
      <a
          v-if="teacher.socialMedia.linkedin"
          :href="teacher.socialMedia.linkedin"
          target="_blank"
          class="text-blue-600 hover:text-blue-700 transition-colors"
          title="LinkedIn"
      >
        💼
      </a>
      <a
          v-if="teacher.socialMedia.website"
          :href="teacher.socialMedia.website"
          target="_blank"
          class="text-gray-600 hover:text-gray-700 transition-colors"
          title="Website"
      >
        🌐
      </a>
    </div>


  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '~/types/Teacher'

defineProps<{
  teacher: Teacher
}>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  })
}
</script>

<style scoped>
.teacher-card {
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 300px;
}

.teacher-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>