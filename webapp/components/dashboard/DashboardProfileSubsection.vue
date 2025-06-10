<template>
  <div class="max-w-2xl">
    <!-- Profile Section -->
    <div class="flex items-start space-x-8 mb-8">
      <!-- Large Profile Image -->
      <div class="flex-shrink-0">
        <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face"
            alt="Profile picture of the user"
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
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

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
</script>

<style scoped>
/* Styles spécifiques au profil */
</style>