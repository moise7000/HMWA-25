<template>
	<div>
	<BreadCrumps :breadCrumps= "breadCrumps" />
	<Hero :title="title" :description="description" />
	
		<div class="container mx-auto p-6">
			<!-- Loading state initial -->
			<div v-if="loading && allCourses.length === 0" class="flex justify-center items-center min-h-[400px]">
				<div class="text-lg">Loading courses...</div>
			</div>

			<!-- Error state -->
			<div v-else-if="error" class="text-center text-red-500 min-h-[400px] flex items-center justify-center">
				<div>
					<h2 class="text-2xl font-bold mb-4">Error</h2>
					<p>{{ error.message }}</p>
					<button
							@click="loadCourses"
							class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
					>
						Try again
					</button>
				</div>
			</div>

			<!-- Courses content -->
			<div v-else>
				<!-- Filter/Search section (optionnel pour plus tard) -->
				<div class="mb-8">
					<div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
						<div class="text-gray-600">
							Showing {{ displayedCourses.length }} of {{ allCourses.length }} courses
						</div>

						<!-- Filtre par difficulté (optionnel) -->
						<div class="flex gap-2">
							<button
									@click="filterLevel = 'all'"
									:class="filterLevel === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
									class="px-3 py-1 rounded-full text-sm transition-colors"
							>
								All levels
							</button>
							<button
									@click="filterLevel = 'beginner'"
									:class="filterLevel === 'beginner' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'"
									class="px-3 py-1 rounded-full text-sm transition-colors"
							>
								Beginner
							</button>
							<button
									@click="filterLevel = 'intermediate'"
									:class="filterLevel === 'intermediate' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'"
									class="px-3 py-1 rounded-full text-sm transition-colors"
							>
								Intermediate
							</button>
							<button
									@click="filterLevel = 'advanced'"
									:class="filterLevel === 'advanced' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'"
									class="px-3 py-1 rounded-full text-sm transition-colors"
							>
								Advanced
							</button>
						</div>
					</div>
				</div>

				<!-- No courses message -->
				<div v-if="filteredCourses.length === 0" class="text-center py-12">
					<div class="text-6xl mb-4">🧘‍♀️</div>
					<h3 class="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
					<p class="text-gray-500">
						<span v-if="filterLevel !== 'all'">
							No courses available for {{ filterLevel }} level. Try changing the filter.
						</span>
						<span v-else>
							No courses are currently available. Check back soon!
						</span>
					</p>
				</div>

				<!-- Courses grid -->
				<div v-else>
					<div class="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						<CourseCard
								v-for="course in displayedCourses"
								:key="course.id"
								:course="course"
								class="animate-fade-in"
						/>
					</div>

					<!-- Load more button -->
					<div v-if="hasMoreCourses" class="text-center">
						<button
								@click="loadMoreCourses"
								:disabled="loadingMore"
                class="px-4 py-3 text-center text-sm font-semibold rounded-md transition-transform transition-colors duration-200 ease-in-out
         hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/30
         text-black bg-white border-2 border-black hover:bg-neutral-200"
						>
							<span v-if="loadingMore">Loading...</span>
							<span v-else>More</span>
							<span v-if="!loadingMore" class="text-sm opacity-75">
								({{ remainingCoursesCount }} remaining)
							</span>
						</button>
					</div>

					<!-- End message -->
					<div v-else-if="displayedCourses.length > 6" class="text-center text-gray-500 py-8">
						<div class="text-2xl mb-2">✨</div>
						<p>You've seen all available courses!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useCourses } from '~/managers/courseManager'
import CourseCard from '~/components/course/CourseCard.vue'
import Hero from '~/layouts/hero.vue'
import type { Course } from '~/types/Course'
import BreadCrumps from '~/components/common/bread-crumps.vue'

const breadCrumps = [{
		name : "Courses and Subscriptions",
		link : "/courses-and-subscriptions"
	}, {
		name : "Courses",
		link : "/courses-and-subscriptions/courses"
}]

// Configuration
const COURSES_PER_PAGE = 6

// Data
const title = "All Yoga Courses"
const description = "Discover our complete collection of yoga courses. From beginner-friendly sessions to advanced practices, find the perfect class to enhance your yoga journey with our experienced instructors."

const { getAllCoursesWithTeachers } = useCourses()

// Reactive state
const allCourses = ref<Course[]>([])
const displayedCoursesCount = ref(COURSES_PER_PAGE)
const filterLevel = ref<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
const loading = ref(true)
const loadingMore = ref(false)
const error = ref<Error | null>(null)

// Computed properties
const filteredCourses = computed(() => {
	if (filterLevel.value === 'all') {
		return allCourses.value
	}
	return allCourses.value.filter(course => course.difficulty_level === filterLevel.value)
})

const displayedCourses = computed(() => {
	return filteredCourses.value.slice(0, displayedCoursesCount.value)
})

const hasMoreCourses = computed(() => {
	return displayedCoursesCount.value < filteredCourses.value.length
})

const remainingCoursesCount = computed(() => {
	return filteredCourses.value.length - displayedCoursesCount.value
})

// Methods
const loadCourses = async () => {
	try {
		loading.value = true
		error.value = null
		allCourses.value = await getAllCoursesWithTeachers()
	} catch (err: any) {
		error.value = err
		console.error('Error loading courses:', err)
	} finally {
		loading.value = false
	}
}

const loadMoreCourses = async () => {
	loadingMore.value = true

	// Simuler un petit délai pour l'UX (optionnel)
	await new Promise(resolve => setTimeout(resolve, 300))

	displayedCoursesCount.value += COURSES_PER_PAGE
	loadingMore.value = false
}

// Watch filter changes to reset pagination
watch(filterLevel, () => {
	displayedCoursesCount.value = COURSES_PER_PAGE
})

// Lifecycle
onMounted(async () => {
	await loadCourses()
})

// SEO Meta
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
		}
	]
})
</script>

<style scoped>
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

/* Animation pour les nouveaux éléments chargés */
.course-enter-active {
	transition: all 0.3s ease-out;
}

.course-enter-from {
	opacity: 0;
	transform: translateY(20px);
}

.course-enter-to {
	opacity: 1;
	transform: translateY(0);
}
</style>