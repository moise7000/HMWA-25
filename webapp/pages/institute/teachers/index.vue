<template>
  <HeroCard
      title="Meet the teachers"
      description="<br>Meet our passionate and experienced yoga teachers, each dedicated to guiding you on your journey with care, knowledge, and inspiration. <br> Discover the heart of our studio through the people who bring it to life."
  />
  <div class="p-6">

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-red-500">Error : {{ error.message }}</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <TeacherCard
          v-for="teacher in teachersList"
          :key="teacher.id"
          :teacher="teacher"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroCard from '~/layouts/Hero.vue'
import { ref, onMounted } from 'vue'
import { useTeachers } from '~/managers/teacherManager'
import TeacherCard from '~/components/teacher/TeacherCard.vue'
import type { Teacher } from '@/types/Teacher'

const { getAllTeachers } = useTeachers()
const teachersList = ref<Teacher[]>([])
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    teachersList.value = await getAllTeachers()
  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>