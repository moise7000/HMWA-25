<template>
  <div class="flex min-h-screen bg-gray-50">
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
        <div class="p-6 border-t border-gray-200">
          <button
              @click="logout"
              :disabled="isLoggingOut"
              class="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            {{ isLoggingOut ? 'Loging out...' : 'Log out' }}
          </button>
        </div>
      </div>

      <!-- Logout Button -->

    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <div class="max-w-2xl">
        <!-- Profile Section -->
        <div class="flex items-start space-x-8 mb-8">
          <!-- Large Profile Image -->
          <div class="flex-shrink-0">
            <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
                alt="Profile"
                class="w-48 h-64 rounded-lg object-cover shadow-md"
            >
          </div>

          <!-- Profile Form -->
          <div class="flex-1 space-y-6">
            <!-- Name Fields -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  First name
                </label>
                <input
                    v-model="profile.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="First name"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Last name
                </label>
                <input
                    v-model="profile.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Last name"
                >
              </div>
            </div>

            <!-- Email and Phone -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <input
                    v-model="profile.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="email@gmail.com"
                >
              </div>
              <div>
                <input
                    v-model="profile.phone"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="06 05 04 03 02 01"
                >
              </div>
            </div>

            <!-- Address -->
            <div>
              <input
                  v-model="profile.address"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="address"
              >
            </div>

            <!-- Debug info -->
            <div class="text-xs text-gray-500 bg-gray-100 p-2 rounded">
              Debug: User ID = {{ user?.id || 'Non défini' }}
            </div>

            <!-- Save Button -->
            <button
                :disabled="isSaving"
                @click="saveProfile"
                class="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Sauvegarde...' : 'Save' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const activeTab = ref('profile')
const isLoggingOut = ref(false)

const profile = reactive({
  displayName:'',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
})

const isSaving = ref(false)

// Watcher pour initialiser et mettre à jour le profil
watch(user, async (newUser) => {
  if (!newUser) return

  // Récupérer le profil en base
  const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', newUser.id)
      .single()

  if (error) {
    console.log('Aucun profil trouvé, on garde valeurs par défaut')
    return
  }

  profile.firstName = data.first_name || ''
  profile.lastName = data.last_name || ''
  profile.email = data.email || newUser.email || ''
  profile.phone = data.phone || ''
  profile.address = data.address || ''
}, { immediate: true })

const saveProfile = async () => {
  if (!user.value) {
    alert('Utilisateur non connecté')
    return
  }
  isSaving.value = true

  try {
    // Prépare les données à insérer / mettre à jour
    const profileData = {
      user_id: user.value.id,
      first_name: profile.firstName,
      last_name: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      updated_at: new Date().toISOString()
    }

    // Tenter d'insérer ou mettre à jour (UPSERT)
    const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' }) // si user_id existe, update, sinon insert

    if (error) {
      console.error('Erreur sauvegarde profil:', error)
      alert('Erreur lors de la sauvegarde : ' + error.message)
    } else {
      alert('Profil sauvegardé avec succès !')
    }
  } catch (e) {
    console.error('Erreur:', e)
    alert('Erreur réseau ou serveur : ' + e.message)
  } finally {
    isSaving.value = false
  }
}

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
/* Styles spécifiques au composant si nécessaire */
</style>