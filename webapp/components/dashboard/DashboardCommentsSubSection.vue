<template>
  <div>
    <h1>My comments</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="feedbacks.length === 0">No comments found.</div>

      <div v-for="fb in feedbacks" :key="fb.id" class="feedback-item">
        <h2>{{ fb.course.title }}</h2>
        <textarea v-model="fb.comment" rows="3"></textarea>
        <button @click="handleSave(fb)">Save</button>
        <button @click="handleDelete(fb)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserFeedbacks } from '~/managers/userFeedbackManager'

const user = useSupabaseUser()
const { getFeedbacksForUser, upsertFeedback, deleteFeedback } = useUserFeedbacks()

const feedbacks = ref<Array<{ id: string; course: { title: string }; comment: string; course_id: string }>>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchFeedbacks = async () => {
  if (!user.value?.id) {
    error.value = 'Utilisateur non connecté'
    feedbacks.value = []
    loading.value = false
    return
  }

  try {
    loading.value = true
    error.value = null
    const data = await getFeedbacksForUser(user.value.id)
    feedbacks.value = data
  } catch (err) {
    console.error('Erreur chargement feedbacks:', err)
    error.value = 'Impossible de charger les commentaires'
  } finally {
    loading.value = false
  }
}

const handleSave = async (fb: { course_id: string; comment: string }) => {
  if (!user.value?.id) return
  try {
    await upsertFeedback(user.value.id, fb.course_id, fb.comment)
    alert('Commentaire enregistré')
    await fetchFeedbacks()
  } catch (e) {
    alert('Erreur lors de l’enregistrement')
    console.error(e)
  }
}

const handleDelete = async (fb: { course_id: string }) => {
  if (!user.value?.id) return
  if (!confirm('Confirmer la suppression ?')) return

  try {
    await deleteFeedback(user.value.id, fb.course_id)
    alert('Commentaire supprimé')
    await fetchFeedbacks()
  } catch (e) {
    alert('Erreur lors de la suppression')
    console.error(e)
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


<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  text-align: center;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.feedback-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.feedback-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.feedback-item h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: #34495e;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #bbb;
  border-radius: 6px;
  resize: vertical;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: border-color 0.3s ease;
}

textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

button {
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  margin-top: 0.75rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 6px;
  transition: background-color 0.25s ease, color 0.25s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

button:hover {
  filter: brightness(0.9);
}

button:focus {
  outline: 2px solid #2980b9;
  outline-offset: 2px;
}

button:first-of-type {
  background-color: #27ae60;
  color: white;
}

button:first-of-type:hover {
  background-color: #219150;
}

button:last-of-type {
  background-color: #e74c3c;
  color: white;
}

button:last-of-type:hover {
  background-color: #c0392b;
}

/* Message d'erreur et chargement */
div[v-cloak] {
  display: none;
}

.loading,
.error {
  text-align: center;
  font-size: 1.1rem;
  margin: 1rem 0;
  color: #555;
}

.error {
  color: #e74c3c;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 600px) {
  .feedback-item {
    padding: 1rem;
  }

  button {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
