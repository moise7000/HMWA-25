<template>
  <div>
    <div class="max-w-4xl mx-auto p-4">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-1">My comments</h1>
        <p class="text-gray-600">Manage your course comments here</p>
      </div>
    </div>
  </div>
  <div class="max-w-4xl mx-auto p-4">

    <div class="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200">

      <div class="mb-4">
        <label for="course" class="block mb-1 font-medium text-gray-700">Courses</label>
        <select
            id="course"
            v-model="newComment.course_id"
            class="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="" disabled>Choose a course</option>
          <option v-for="course in enrolledCourses" :key="course.id" :value="course.id">
            {{ course.title }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="comment" class="block mb-1 font-medium text-gray-700">Comments</label>
        <textarea
            id="comment"
            v-model="newComment.comment"
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Write your comment here..."
        ></textarea>
      </div>
      <button
          @click="handleAddComment"
          :disabled="adding || !newComment.course_id || !newComment.comment"
          class="px-4 py-3 text-center text-sm font-semibold rounded-md transition-transform transition-colors duration-200 ease-in-out
         hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/30
         bg-black text-white hover:bg-neutral-900"
      >
        {{ adding ? 'Adding...' : 'Add' }}
      </button>
    </div>

    <!-- Affichage des commentaires -->
    <div v-if="loading" class="text-center py-8 text-gray-600">
      Loading comments...
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-md mx-auto text-red-700">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="feedbacks.length === 0" class="text-center py-12 text-gray-600">
        <div class="text-7xl mb-4">💬</div>
        <h3 class="text-xl font-semibold mb-2">No comments found.</h3>
        <p>You have not added any comments yet.</p>
      </div>

      <div class="grid gap-6">
        <div
            v-for="fb in feedbacks"
            :key="fb.id"
            class="bg-white rounded-lg shadow border border-gray-200 p-6 relative"
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ fb.course.title }}</h2>
          <p class="whitespace-pre-wrap text-gray-800 mb-4">{{ fb.comment }}</p>


          <button
              @click="handleDeleteComment(fb.course.id)"
              class="absolute top-4 right-4 text-red-600 hover:text-red-800"
              :disabled="deletingId === fb.id"
              title="Supprimer le commentaire"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

import { useUserFeedbacks } from '~/managers/userFeedbackManager' // Manager pour gérer les feedbacks
import { useCourses } from '~/scripts/dashbord/dashbordCourse.js' // Manager pour les cours

const user = useSupabaseUser()
const { getFeedbacksForUser, upsertFeedback, deleteFeedback } = useUserFeedbacks()
const { enrolledCourses } = useCourses()

const feedbacks = ref([])
const loading = ref(true)
const error = ref<string | null>(null)

const newComment = ref({
  course_id: '',
  comment: '',
})

const adding = ref(false)
const deletingId = ref<string | null>(null)

const fetchFeedbacks = async () => {
  if (!user.value?.id) {
    error.value = 'Utilisateur non connecté'
    loading.value = false
    feedbacks.value = []
    return
  }

  try {
    loading.value = true
    error.value = null
    const data = await getFeedbacksForUser(user.value.id)
    feedbacks.value = data
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors du chargement des commentaires'
  } finally {
    loading.value = false
  }
}

const handleAddComment = async () => {
  if (!user.value?.id) return
  if (!newComment.value.course_id || !newComment.value.comment) return

  adding.value = true
  try {
    await upsertFeedback(user.value.id, newComment.value.course_id, newComment.value.comment)
    newComment.value.course_id = ''
    newComment.value.comment = ''
    await fetchFeedbacks()
  } catch (e) {
    alert('Erreur lors de l\'ajout du commentaire')
    console.error(e)
  } finally {
    adding.value = false
  }
}

const handleDeleteComment = async (course_id: string) => {
  if (!user.value?.id) return

  if (!confirm('Do you really want to delete this comment?')) return

  deletingId.value = course_id
  try {
    await deleteFeedback(user.value?.id, course_id)
    await fetchFeedbacks()
  } catch (e) {
    alert('Error deleting comment')
    console.error(e)
  } finally {
    deletingId.value = null
  }
}

onMounted(() => {
  fetchFeedbacks()
})

watch(
    () => user.value?.id,
    (newId) => {
      if (newId) {
        fetchFeedbacks()
      } else {
        feedbacks.value = []
      }
    }
)
</script>
