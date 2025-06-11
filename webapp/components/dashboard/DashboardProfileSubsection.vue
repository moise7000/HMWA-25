<template>
  <div class="max-w-2xl">
    <!-- Profile Section -->
    <div class="flex items-start space-x-8 mb-8">
      <!-- Large Profile Image -->
      <div class="flex-shrink-0 relative">
        <!-- Image ou icône par défaut -->
        <div v-if="!profile.avatarUrl" class="w-48 h-64 rounded-lg bg-gray-200 flex items-center justify-center shadow-md">
          <svg class="w-24 h-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <img
            v-else
            :src="profile.avatarUrl"
            alt="Profile picture"
            class="w-48 h-64 rounded-lg object-cover shadow-md"
            :key="avatarKey"
        >

        <!-- Bouton pour changer la photo -->
        <button
            @click="triggerFileInput"
            class="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
            :disabled="isUploading"
        >
          <svg v-if="!isUploading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </button>

        <!-- Input file caché -->
        <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
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
            :disabled="isSaving || isUploading"
            @click="saveProfile"
            class="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save' }}
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
  address: '',
  avatarUrl: ''
})

const isSaving = ref(false)
const isUploading = ref(false)
const fileInput = ref(null)
const avatarKey = ref(0) // Pour forcer le rechargement de l'image

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
  profile.avatarUrl = data.avatar_url || ''
  avatarKey.value++ // Force le rechargement de l'image
}, { immediate: true })

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) {
    alert('Utilisateur non connecté ou fichier invalide')
    return
  }

  console.log('User authenticated:', user.value.id)

  // Vérifier le type de fichier
  if (!file.type.startsWith('image/')) {
    alert('Veuillez sélectionner un fichier image')
    return
  }

  // Vérifier la taille (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Le fichier est trop volumineux (max 5MB)')
    return
  }

  isUploading.value = true

  try {
    // Créer un nom de fichier unique avec timestamp pour éviter le cache
    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = `${user.value.id}_${timestamp}.${fileExt}`
    const filePath = `${user.value.id}/${fileName}`

    // Supprimer l'ancienne image si elle existe
    if (profile.avatarUrl) {
      try {
        // Extraire le chemin de l'ancienne image depuis l'URL
        const oldUrlParts = profile.avatarUrl.split('/')
        const oldFileName = oldUrlParts[oldUrlParts.length - 1]
        const oldPath = `${user.value.id}/${oldFileName}`

        const { error: deleteError } = await supabase.storage
            .from('profiles')
            .remove([oldPath])

        if (deleteError) {
          console.log('Erreur suppression ancienne image:', deleteError)
        }
      } catch (error) {
        console.log('Erreur lors de l\'extraction du chemin de l\'ancienne image:', error)
      }
    }

    // Upload du nouveau fichier
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Permet d'écraser le fichier s'il existe
        })

    if (uploadError) {
      console.error('Erreur upload:', uploadError)
      alert('Erreur lors de l\'upload : ' + uploadError.message)
      return
    }

    // Obtenir l'URL publique avec un paramètre pour éviter le cache
    const { data: urlData } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)

    // Ajouter un paramètre de cache-busting
    const newAvatarUrl = `${urlData.publicUrl}?t=${timestamp}`

    // Mettre à jour le profil avec la nouvelle URL
    profile.avatarUrl = newAvatarUrl
    avatarKey.value++ // Force le rechargement de l'image

    // Sauvegarder automatiquement
    await saveProfile()

    alert('Photo de profil mise à jour avec succès !')

  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de l\'upload : ' + error.message)
  } finally {
    isUploading.value = false
    // Reset l'input file
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

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
      avatar_url: profile.avatarUrl,
      updated_at: new Date().toISOString()
    }

    // Tenter d'insérer ou mettre à jour (UPSERT)
    const {data, error} = await supabase
        .from('profiles')
        .upsert(profileData, {onConflict: 'user_id'})

    if (error) {
      console.error('Erreur sauvegarde profil:', error)
      alert('Erreur lors de la sauvegarde : ' + error.message)
    } else {
      console.log('Profil sauvegardé avec succès')
      // Pas d'alert ici car c'est appelé automatiquement lors de l'upload
      if (!isUploading.value) {
        alert('Profil sauvegardé avec succès !')
      }
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