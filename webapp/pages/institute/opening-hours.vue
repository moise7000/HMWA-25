<template>
  <div>
    <BreadCrumps :breadCrumps="breadCrumps" />
    <Hero :title="title" :description="description" />

    <div class="container mx-auto p-4 lg:p-6">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="text-lg">Loading courses...</div>
      </div>

      <div v-else>
        <!-- Mobile Day Selector -->
        <div class="block md:hidden mb-4">
          <div class="bg-white rounded-lg shadow-sm border p-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Select Day
            </label>
            <select
                v-model="selectedMobileDay"
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="day in days" :key="day.key" :value="day.key">
                {{ day.fullName }}
              </option>
            </select>
          </div>
        </div>

        <!-- Desktop/Tablet Schedule Grid -->
        <div class="hidden md:block">
          <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
            <!-- Headers -->
            <div class="grid grid-cols-8 bg-gray-50 border-b">
              <div class="p-2 md:p-4 font-semibold text-gray-700 text-center border-r text-sm md:text-base">
                Time
              </div>
              <div
                  v-for="day in days"
                  :key="day.key"
                  class="p-2 md:p-4 font-semibold text-gray-700 text-center border-r last:border-r-0 text-sm md:text-base"
              >
                <span class="md:hidden">{{ day.name }}</span>
                <span class="hidden md:inline">{{ day.name }}</span>
              </div>
            </div>

            <!-- Time Grid -->
            <div class="grid grid-cols-8 overflow-x-auto">
              <!-- Time Column -->
              <div class="bg-gray-50 border-r">
                <div
                    v-for="hour in timeSlots"
                    :key="hour"
                    class="h-16 md:h-20 flex items-center justify-center text-xs md:text-sm text-gray-600 border-b font-medium"
                >
                  {{ hour }}
                </div>
              </div>

              <!-- Day Columns -->
              <div
                  v-for="day in days"
                  :key="day.key"
                  class="border-r last:border-r-0 min-w-[80px] md:min-w-0"
              >
                <div
                    v-for="hour in timeSlots"
                    :key="`${day.key}-${hour}`"
                    class="h-16 md:h-20 border-b relative group hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="handleSlotClick(day.key, hour)"
                >
                  <!-- Course Cards -->
                  <div
                      v-for="course in getCoursesForSlot(day.key, hour)"
                      :key="course.id"
                      class="absolute inset-1 bg-black hover:bg-neutral-800 rounded p-1 md:p-2 text-white shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      @click.stop="navigateToCourse(course)"
                  >
                    <div class="font-semibold truncate text-xs">{{ course.title }}</div>
                    <div class="opacity-90 truncate text-xs hidden md:block">{{ course.teacher?.name }}</div>
                    <div class="opacity-75 text-xs hidden lg:block">{{ course.duration || '60min' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Schedule List -->
        <div class="block md:hidden">
          <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
            <!-- Selected Day Header -->
            <div class="bg-gray-50 border-b p-4">
              <h3 class="font-semibold text-gray-700 text-center">
                {{ days.find(d => d.key === selectedMobileDay)?.fullName }}
              </h3>
            </div>

            <!-- Time Slots List -->
            <div class="divide-y divide-gray-200">
              <div
                  v-for="hour in timeSlots"
                  :key="`mobile-${selectedMobileDay}-${hour}`"
                  class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  @click="handleSlotClick(selectedMobileDay, hour)"
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0 w-20">
                    <span class="text-sm font-medium text-gray-600">{{ hour }}</span>
                  </div>
                  <div class="flex-1 ml-4">
                    <div v-if="getCoursesForSlot(selectedMobileDay, hour).length === 0" class="text-gray-400 text-sm">
                      Free slot
                    </div>
                    <div v-else class="space-y-2">
                      <div
                          v-for="course in getCoursesForSlot(selectedMobileDay, hour)"
                          :key="course.id"
                          class="bg-black text-white rounded p-3 cursor-pointer hover:bg-neutral-800 transition-colors"
                          @click.stop="navigateToCourse(course)"
                      >
                        <div class="font-semibold text-sm">{{ course.title }}</div>
                        <div class="text-sm opacity-90">{{ course.teacher?.name }}</div>
                        <div class="text-xs opacity-75">{{ course.duration || '60min' }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="flex-shrink-0 ml-2">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="mt-6 lg:mt-8 bg-gray-50 rounded-lg p-4 lg:p-6">
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div class="text-gray-600 text-sm lg:text-base">
              <span class="hidden sm:inline">Click on a time slot to view course details</span>
              <span class="sm:hidden">Tap on a time slot to view course details</span>
            </div>
            <div class="flex flex-wrap gap-3 lg:gap-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 lg:w-4 lg:h-4 bg-black rounded"></div>
                <span class="text-xs lg:text-sm text-gray-600">Available course</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 lg:w-4 lg:h-4 bg-gray-200 rounded"></div>
                <span class="text-xs lg:text-sm text-gray-600">Free slot</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Details Modal -->
      <div
          v-if="selectedCourse"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click="closeModal"
      >
        <div
            class="bg-white rounded-lg shadow-xl max-w-md w-full p-4 lg:p-6 max-h-[90vh] overflow-y-auto"
            @click.stop
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg lg:text-xl font-semibold text-gray-800 pr-4">{{ selectedCourse.title }}</h3>
            <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-600 text-2xl flex-shrink-0"
            >
              ×
            </button>
          </div>

          <div class="space-y-3">
            <div v-if="selectedCourse.teacher" class="flex items-start gap-2">
              <span class="text-blue-600 font-medium text-sm lg:text-base">Teacher:</span>
              <span class="text-sm lg:text-base">{{ selectedCourse.teacher.first_name }} {{ selectedCourse.teacher.last_name }}</span>
            </div>

            <div v-if="selectedCourse.description" class="text-gray-600 text-sm lg:text-base">
              {{ selectedCourse.description }}
            </div>

            <div v-if="selectedCourse.timetable" class="text-sm text-gray-500">
              <span class="font-medium">Schedule:</span>
              <div class="mt-2">
                <span v-for="(time, index) in selectedCourse.timetable" :key="index" class="inline-block bg-gray-100 rounded px-2 py-1 mr-2 mb-2 text-xs lg:text-sm">
                  {{ time }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <button
                @click="navigateToCourse(selectedCourse)"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors font-medium text-sm lg:text-base"
            >
              View Course
            </button>
            <button
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm lg:text-base"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/Course'
import { useCourses } from "~/managers/courseManager"
import BreadCrumps from '~/components/common/bread-crumps.vue'
import Hero from '~/layouts/hero.vue'

// Configuration
const title = "Schedule & Courses"
const description = "View all our yoga classes and their schedules. Click on any time slot to discover available courses and book your perfect session."

const breadCrumps = [{
  name: "Institute",
  link: "/institute"
}, {
  name: "Opening hours",
  link: "/institute/opening-hours"
}]

// Days definition
const days = [
  { key: 'monday', name: 'Mon', fullName: 'Monday' },
  { key: 'tuesday', name: 'Tue', fullName: 'Tuesday' },
  { key: 'wednesday', name: 'Wed', fullName: 'Wednesday' },
  { key: 'thursday', name: 'Thu', fullName: 'Thursday' },
  { key: 'friday', name: 'Fri', fullName: 'Friday' },
  { key: 'saturday', name: 'Sat', fullName: 'Saturday' },
  { key: 'sunday', name: 'Sun', fullName: 'Sunday' }
]

// Time slots
const timeSlots = [
  '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
]

// Reactive state
const loading = ref(true)
const courses = ref<Course[]>([])
const selectedCourse = ref<Course | null>(null)
const selectedMobileDay = ref('monday')

// Course manager
const { getAllCoursesWithTeachers } = useCourses()

// Load data
onMounted(async () => {
  try {
    courses.value = await getAllCoursesWithTeachers()
  } catch (error) {
    console.error('Error loading courses:', error)
  } finally {
    loading.value = false
  }
})

// Create slug from title
const createSlug = (title: string): string => {
  return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
}

// Parse time slot from timetable
const parseTimeSlot = (timeSlot: string) => {
  const regex = /(\w+)\s+(\d{1,2})(?::(\d{2}))?\s*([ap]m)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*([ap]m)/i
  const match = timeSlot.match(regex)

  if (!match) return null

  const [, dayName, startHour, startMin = '00', startPeriod, endHour, endMin = '00', endPeriod] = match

  let start24 = parseInt(startHour)
  let end24 = parseInt(endHour)

  if (startPeriod.toLowerCase() === 'pm' && start24 !== 12) start24 += 12
  if (startPeriod.toLowerCase() === 'am' && start24 === 12) start24 = 0
  if (endPeriod.toLowerCase() === 'pm' && end24 !== 12) end24 += 12
  if (endPeriod.toLowerCase() === 'am' && end24 === 12) end24 = 0

  const startTime = `${start24.toString().padStart(2, '0')}:${startMin}`
  const endTime = `${end24.toString().padStart(2, '0')}:${endMin}`

  return {
    day: dayName.toLowerCase(),
    startTime,
    endTime,
    startHour: start24
  }
}

// Get courses for specific slot
const getCoursesForSlot = (day: string, hour: string) => {
  const hourNumber = parseInt(hour.split(':')[0])

  return courses.value.filter(course => {
    if (!course.timetable || !Array.isArray(course.timetable)) return false

    return course.timetable.some(timeSlot => {
      const parsed = parseTimeSlot(timeSlot)
      return parsed &&
          parsed.day === day &&
          parsed.startHour === hourNumber
    })
  })
}

// Handle slot click
const handleSlotClick = (day: string, hour: string) => {
  const coursesInSlot = getCoursesForSlot(day, hour)
  if (coursesInSlot.length >= 1) {
    selectedCourse.value = coursesInSlot[0]
  }
}

// Navigate to course
const navigateToCourse = (course: Course) => {
  const slug = createSlug(course.title)
  navigateTo(`/courses-and-subscriptions/courses/${slug}`)
}

// Close modal
const closeModal = () => {
  selectedCourse.value = null
}

// SEO Meta tags
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
useSeoMeta({
  title: title,
  description: description
})
</script>

<style scoped>
.grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

/* Responsive grid adjustments */
@media (max-width: 1023px) {
  .grid-cols-8 {
    grid-template-columns: 80px repeat(7, minmax(80px, 1fr));
  }
}

@media (max-width: 767px) {
  .grid-cols-8 {
    grid-template-columns: 60px repeat(7, minmax(60px, 1fr));
  }
}
</style>