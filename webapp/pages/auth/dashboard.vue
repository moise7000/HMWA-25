<template>
  <div class="flex min-h-screen animate-fade-in ">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div class="p-6 flex-1">
        <!-- Profile Image -->
        <div v-if="!profile.avatarUrl" class="w-28 h-28 rounded-full object-cover shadow-md">
          <svg class="w-28 h-28 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <img
            v-else
            :src="profile.avatarUrl"
            alt="Profile picture"
            class="w-28 h-28 rounded-full object-cover shadow-md"
            :key="avatarKey"
        >

        <!-- Navigation Menu -->
        <nav class="space-y-2 mt-6">
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
      <DashboardCourseSubSection v-if="activeTab === 'course'" />
      <DashboardCommentsSubSection v-if="activeTab === 'comments'" />
      <DashboardProfileSubsection v-if="activeTab === 'profile'" />
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#app'

useHead({
  title: 'Yoga Student Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Discover our selection of recommended yoga equipment gear and accessories, with links to our partner sites where you can explore and purchase the items we love and use.'
    },
    {
      property: 'og:title',
      content: 'Yoga Student Dashboard'
    },
    {
      property: 'og:description',
      content: 'See all your courses registered in one place. Add comments on the courses you take'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/auth/dashboard'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:title',
      content: 'Yoga Student Dashboard'
    },
    {
      name: 'twitter:description',
      content: 'See all your courses registered in one place. Add comments on the courses you take'
    }
  ]
})

import { ref, reactive, watch, onUnmounted } from 'vue'
import DashboardCourseSubSection from '~/components/dashboard/DashboardCourseSubSection.vue'
import DashboardCommentsSubSection from '~/components/dashboard/DashboardCommentsSubSection.vue'
import DashboardProfileSubsection from '~/components/dashboard/DashboardProfileSubsection.vue'

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const activeTab = ref('course')
const isLoggingOut = ref(false)
const avatarKey = ref(0)

// Données du profil
const profile = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  avatarUrl: ''
})

// Charger les données du profil
const loadProfile = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.value.id)
        .single()

    if (error) {
      console.log('Aucun profil trouvé, on garde valeurs par défaut')
      return
    }

    profile.firstName = data.first_name || ''
    profile.lastName = data.last_name || ''
    profile.email = data.email || user.value.email || ''
    profile.phone = data.phone || ''
    profile.address = data.address || ''
    profile.avatarUrl = data.avatar_url || ''
    avatarKey.value++
  } catch (error) {
    console.error('Erreur lors du chargement du profil:', error)
  }
}

// Watcher pour charger le profil quand l'utilisateur est disponible
watch(user, loadProfile, { immediate: true })

// Écouter les changements en temps réel sur la table profiles
const setupRealtimeSubscription = () => {
  if (!user.value) return

  const subscription = supabase
      .channel('profile-changes')
      .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `user_id=eq.${user.value.id}`
          },
          (payload) => {
            // Mettre à jour les données du profil
            const data = payload.new
            profile.firstName = data.first_name || ''
            profile.lastName = data.last_name || ''
            profile.email = data.email || user.value.email || ''
            profile.phone = data.phone || ''
            profile.address = data.address || ''
            profile.avatarUrl = data.avatar_url || ''
            avatarKey.value++ // Forcer le rechargement de l'image
          }
      )
      .subscribe()

  // Nettoyer la subscription quand le composant est détruit
  onUnmounted(() => {
    subscription.unsubscribe()
  })
}

// Configurer la subscription quand l'utilisateur est disponible
watch(user, (newUser) => {
  if (newUser) {
    setupRealtimeSubscription()
  }
}, { immediate: true })

const logout = async () => {
  isLoggingOut.value = true

  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Erreur lors de la déconnexion:', error)
      alert('Erreur lors de la déconnexion : ' + error.message)
    } else {
      await navigateTo('/auth/signin')
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
</style>