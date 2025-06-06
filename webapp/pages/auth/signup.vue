<template>
  <div class="  flex flex-col justify-center ">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        Sign up
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSignUp" class="space-y-6">
          <!-- Email or Phone -->
          <div>
            <input
                v-model="formData.email"
                type="email"
                placeholder="Email or Phone"
                required
                class="appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <!-- Password -->
          <div class="relative">
            <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                required
                class="appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12"
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              {{ showPassword ? 'hide' : 'show' }}
            </button>
          </div>

          <!-- Confirm Password -->
          <div class="relative">
            <input
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm password"
                required
                class="appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12"
            />
            <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              {{ showConfirmPassword ? 'hide' : 'show' }}
            </button>
          </div>

          <!-- Payment Credentials (Optional field) -->
          <div class="relative">
            <input
                v-model="formData.paymentCredentials"
                :type="showPaymentCredentials ? 'text' : 'password'"
                placeholder="Payment credentials"
                class="appearance-none block w-full px-3 py-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-12"
            />
            <button
                type="button"
                @click="showPaymentCredentials = !showPaymentCredentials"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-600 hover:text-gray-800"
            >
              {{ showPaymentCredentials ? 'hide' : 'show' }}
            </button>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- Sign Up Button -->
          <div>
            <button
                type="submit"
                :disabled="loading"
                class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Creating account...' : 'Sign up' }}
            </button>
          </div>

          <!-- Login Link -->
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-600">Already have an account?</span>
            <router-link
                to="/auth/signin"
                class="font-medium text-black hover:text-gray-800"
            >
              Join now
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
const supabase = useSupabaseClient()

const router = useRouter()

// Form state
const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  paymentCredentials: ''
})

// UI state
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showPaymentCredentials = ref(false)
const loading = ref(false)
const error = ref('')

const handleSignUp = async () => {
  error.value = ''
  loading.value = true

  if (formData.password !== formData.confirmPassword) {
    error.value = 'Passwords do not match.'
    loading.value = false
    return
  }

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        payment_credentials: formData.paymentCredentials || null,
      }
    }
  })

  loading.value = false

  if (signUpError) {
    error.value = signUpError.message
    return
  }


  router.push('/auth/dashboard')
}



</script>