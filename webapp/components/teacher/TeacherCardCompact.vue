<template>
  <div
      class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
      @click="navigateToTeacher"
  >
    <!-- Photo de profil -->
    <div class="flex-shrink-0">
      <img
          v-if="teacher.photo"
          :src="teacher.photo"
          :alt="`Photo de ${teacher.name}`"
          class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
      />
      <div
          v-else
          class="w-12 h-12 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center shadow-sm"
      >
        👤
      </div>
    </div>

    <!-- Informations du teacher -->
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-semibold text-gray-900 truncate">
        {{ teacher.name }}
      </h3>

      <p v-if="teacher.email" class="text-xs text-gray-600 truncate mt-0.5">
        {{ teacher.email }}
      </p>

      <div v-if="teacher.certificates && teacher.certificates.length > 0" class="text-xs text-gray-500 mt-0.5">
        {{ teacher.certificates.length }} certification{{ teacher.certificates.length > 1 ? 's' : '' }}
      </div>
    </div>

    <!-- Indicateur cliquable -->
    <div class="flex-shrink-0">
      <div class="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-blue-600 rounded-full hover:bg-white transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '@/types/Teacher'
import { createSlug } from '~/scripts/teacher/teacherCardLogic'

interface Props {
  teacher: Teacher
}

const props = defineProps<Props>()
const router = useRouter()

const navigateToTeacher = () => {
  const slug = createSlug(props.teacher.name)
  router.push(`/institute/teachers/${slug}`)
}
</script>