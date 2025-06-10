<template>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title= "title" :description = "description" />
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
import { useHead } from '#app'

const title = "Meet the teachers"

const description = "Meet our passionate and experienced yoga teachers, each dedicated to guiding you on your journey with care, knowledge, and inspiration. Discover the heart of our studio through the people who bring it to life."

useHead({
  title: title,
  meta: [
    {
      name: 'description',
      content: description
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/institute/teachers',
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: description
    }
  ]
})




const breadCrumps = [{
		name : "Insitute",
		link : "/institute"
	}, {
		name : "Teachers",
		link : "/institute/teachers"
}]

import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'
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