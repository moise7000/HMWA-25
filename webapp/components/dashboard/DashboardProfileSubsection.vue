<template>
  <div class="max-w-2xl">
    <!-- Notifications Toast -->
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="[
          'px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out',
          'flex items-center space-x-3 max-w-sm',
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white',
          notification.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        ]"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <svg v-if="notification.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <svg v-else-if="notification.type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
        </div>

        <!-- Message -->
        <div class="flex-1">
          <p class="text-sm font-medium">{{ notification.message }}</p>
        </div>

        <!-- Close button -->
        <button
            @click="removeNotification(notification.id)"
            class="flex-shrink-0 ml-2 text-white hover:text-gray-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

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

        <!-- Boutons d'action sur l'image -->
        <!-- Bouton supprimer en bas à gauche -->
        <div class="absolute bottom-2 left-2">
          <button
              v-if="profile.avatarUrl"
              @click="deleteImage"
              class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              :disabled="isDeleting"
              title="Supprimer l'image"
          >
            <svg v-if="!isDeleting" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1
               1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042
               1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>

        <!-- Bouton ajouter/modifier en bas à droite -->
        <div class="absolute bottom-2 right-2">
          <button
              @click="triggerFileInput"
              class="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
              :disabled="isUploading || isDeleting"
              :title="profile.avatarUrl ? 'Modifier l\'image' : 'Ajouter une image'"
          >
            <svg v-if="!isUploading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0
               011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0
               01-2-2V9z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0
               014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>



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
                placeholder="john.doe@gmail.com"
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

        <!-- Save Button -->
        <button
            :disabled="isSaving || isUploading || isDeleting"
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
const isDeleting = ref(false)
const fileInput = ref(null)
const avatarKey = ref(0)

// Système de notifications
const notifications = ref([])
let notificationId = 0

const showNotification = (message, type = 'info', duration = 5000) => {
  const id = ++notificationId
  const notification = {
    id,
    message,
    type,
    show: false
  }

  notifications.value.push(notification)

  setTimeout(() => {
    notification.show = true
  }, 100)

  setTimeout(() => {
    removeNotification(id)
  }, duration)
}

const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value[index].show = false
    setTimeout(() => {
      notifications.value.splice(index, 1)
    }, 500)
  }
}

watch(user, async (newUser) => {
  if (!newUser) return

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
  avatarKey.value++
}, { immediate: true })

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Nouvelle fonction pour supprimer l'image
const deleteImage = async () => {
  if (!user.value || !profile.avatarUrl) {
    showNotification('No image to delete', 'error')
    return
  }



  isDeleting.value = true

  try {
    // Extraire le chemin de l'image depuis l'URL
    const urlParts = profile.avatarUrl.split('/')
    const fileName = urlParts[urlParts.length - 1].split('?')[0] // Enlever les paramètres de query
    const filePath = `${user.value.id}/${fileName}`

    // Supprimer l'image du storage
    const { error: deleteError } = await supabase.storage
        .from('profiles')
        .remove([filePath])

    if (deleteError) {
      console.error('Erreur suppression image:', deleteError)
      showNotification('Error while deleting image: ' + deleteError.message, 'error')
      return
    }

    // Mettre à jour le profil pour supprimer l'URL de l'avatar
    profile.avatarUrl = ''
    avatarKey.value++

    // Sauvegarder les modifications
    await saveProfile()

    showNotification('Profile picture successfully deleted!', 'success')

  } catch (error) {
    console.error('Erreur:', error)
    showNotification('Error while deleting: ' + error.message, 'error')
  } finally {
    isDeleting.value = false
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file || !user.value) {
    showNotification('User not logged in or invalid file', 'error')
    return
  }

  console.log('User authenticated:', user.value.id)

  if (!file.type.startsWith('image/')) {
    showNotification('Please select an image file', 'error')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    showNotification('The file is too large (max 5MB)', 'error')
    return
  }

  isUploading.value = true

  try {
    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const fileName = `${user.value.id}_${timestamp}.${fileExt}`
    const filePath = `${user.value.id}/${fileName}`

    if (profile.avatarUrl) {
      try {
        // Extraire le chemin de l'ancienne image depuis l'URL
        const oldUrlParts = profile.avatarUrl.split('/')
        const oldFileName = oldUrlParts[oldUrlParts.length - 1].split('?')[0]
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

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

    if (uploadError) {
      console.error('Erreur upload:', uploadError)
      showNotification('Error while uploading: ' + uploadError.message, 'error')
      return
    } else {
      showNotification('Profile picture successfully updated!', 'success')
    }

    const { data: urlData } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath)

    const newAvatarUrl = `${urlData.publicUrl}?t=${timestamp}`

    profile.avatarUrl = newAvatarUrl
    avatarKey.value++

    await saveProfile()

  } catch (error) {
    console.error('Erreur:', error)
    showNotification('Error while uploading: ' + error.message, 'error')
  } finally {
    isUploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const saveProfile = async () => {
  if (!user.value) {
    showNotification('User not logged in', 'error')
    return
  }
  isSaving.value = true

  try {
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

    const {data, error} = await supabase
        .from('profiles')
        .upsert(profileData, {onConflict: 'user_id'})

    if (error) {
      console.error('Erreur sauvegarde profil:', error)
      showNotification('Error while uploading: ' + error.message, 'error')
    } else {
      console.log('Profil sauvegardé avec succès')
      if (!isUploading.value && !isDeleting.value) {
        showNotification('Profile successfully updated!', 'success')
      }
    }
  } catch (e) {
    console.error('Erreur:', e)
    showNotification('Network or server error: ' + e.message, 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
</style>