<template>
  <div class="flex min-h-screen ">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div class="p-6 flex-1">
        <!-- Profile Image -->
        <div class="mb-8">
          <img
              src="https://images.unsplash.com/photo-1494790108755-2616c96e8dc3?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              class="w-24 h-24 rounded-lg object-cover"
          >
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-2">
          <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-md"
              :class="{ 'bg-gray-100': activeTab === 'course' }"
              @click="activeTab = 'course'"
          >
            Course
          </a>
          <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              :class="{ 'bg-gray-100': activeTab === 'comments' }"
              @click="activeTab = 'comments'"
          >
            Comments
          </a>
          <a
              href="#"
              class="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              :class="{ 'bg-gray-100 text-gray-900': activeTab === 'profile' }"
              @click="activeTab = 'profile'"
          >
            Profile
          </a>
        </nav>
      </div>

      <!-- Logout Button -->
      <div class="p-6 border-t border-gray-200">
        <button
            @click="logout"
            :disabled="isLoggingOut"
            class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          {{ isLoggingOut ? 'Logging out...' : 'Log out' }}
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Rendu conditionnel des composants selon l'onglet actif -->
      <DashboardCourseSubSection v-if="activeTab === 'course'" />
      <DashboardCommentsSubSection v-if="activeTab === 'comments'" />
      <DashboardProfileSubsection v-if="activeTab === 'profile'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DashboardCourseSubSection from '~/components/dashboard/DashboardCourseSubSection.vue'
import DashboardCommentsSubSection from '~/components/dashboard/DashboardCommentsSubSection.vue'
import DashboardProfileSubsection from '~/components/dashboard/DashboardProfileSubsection.vue'

definePageMeta({
  middleware: ['auth']
})

const supabase = useSupabaseClient()

const activeTab = ref('course') // Onglet par défaut
const isLoggingOut = ref(false)

const logout = async () => {
  isLoggingOut.value = true

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Erreur lors de la déconnexion:', error)
      alert('Erreur lors de la déconnexion : ' + error.message)
    } else {
      // Redirection vers la page de connexion ou d'accueil
      await navigateTo('/auth/signin') // ou '/' selon votre structure
    }
  } catch (e) {
    console.error('Erreur:', e)
    alert('Erreur réseau : ' + e.message)
  } finally {
    isLoggingOut.value = false
  }
}
</script>

<style scoped>
/* Styles du dashboard principal */
</style>