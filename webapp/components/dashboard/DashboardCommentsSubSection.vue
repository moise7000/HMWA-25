<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-1">My comments</h1>
      <p class="text-gray-600">Manage your course comments here</p>
    </div>

    <!-- Formulaire ajout commentaire -->
    <div class="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Add a comment</h2>

      <form @submit.prevent="handleAddComment" class="space-y-4">
        <div>
          <label for="course" class="block text-gray-700 font-medium mb-1">Select course</label>
          <select
              id="course"
              v-model="newComment.course_id"
              required
              class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">-- Choose a course --</option>
            <option
                v-for="course in enrolledCourses"
                :key="course.id"
                :value="course.id"
            >
              {{ course.title }}
            </option>
          </select>
        </div>

        <div>
          <label for="comment" class="block text-gray-700 font-medium mb-1">Your comment</label>
          <textarea
              id="comment"
              v-model="newComment.comment"
              rows="4"
              required
              class="w-full border border-gray-300 rounded-md p-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment here..."
          ></textarea>
        </div>

        <button
            type="submit"
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            :disabled="adding"
        >
          {{ adding ? 'Adding...' : 'Add Comment' }}
        </button>
      </form>
    </div>

    <!-- Affichage des commentaires -->
    <div v-if="loading" class="text-center py-8 text-gray-600">
      Loading your comments...
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
            class="bg-white rounded-lg shadow border border-gray-200 p-6"
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ fb.course.title }}</h2>
          <p class="whitespace-pre-wrap text-gray-800">{{ fb.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserFeedbacks } from '~/managers/userFeedbackManager'
import { useCourses } from '~/scripts/dashbord/dashbordCourse.js' // supposé te donner les cours inscrits

const user = useSupabaseUser()
const { getFeedbacksForUser, upsertFeedback } = useUserFeedbacks()
const { enrolledCourses } = useCourses()

const feedbacks = ref([])
const loading = ref(true)
const error = ref(null)

const newComment = ref({
  course_id: '',
  comment: '',
})

const adding = ref(false)

const fetchFeedbacks = async () => {
  if (!user.value?.id) {
    error.value = 'User not logged in'
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
    error.value = 'Failed to load comments'
  } finally {
    loading.value = false
  }
}

const handleAddComment = async () => {
  if (!user.value?.id) return
  if (!newComment.value.course_id || !newComment.value.comment) return

  adding.value = true
  try {
    // on appelle l'API pour ajouter un commentaire
    await upsertFeedback(user.value.id, newComment.value.course_id, newComment.value.comment)

    // reset form
    newComment.value.course_id = ''
    newComment.value.comment = ''

    // recharge la liste des commentaires
    await fetchFeedbacks()
  } catch (e) {
    alert('Error adding comment')
    console.error(e)
  } finally {
    adding.value = false
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
