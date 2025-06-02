<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description" />
  <div class="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Form Section -->
        <div class="">
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Contact us</h1>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- First Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                First name
              </label>
              <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="John"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>

            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                Last name
              </label>
              <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Doe"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>

            <!-- Email Address -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="john.doe@example.com"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Your message
              </label>
              <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter your question or message"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-black text-white py-4 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit</span>
            </button>
          </form>

          <!-- Success Message -->
          <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p class="text-green-800">Your message has been sent successfully!</p>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>

          <div class="space-y-6">
            <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 pb-6 last:border-b-0">
              <button
                  @click="toggleFaq(index)"
                  class="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 -m-2"
              >
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-900">{{ faq.question }}</h3>
                  <svg
                      :class="['w-5 h-5 text-gray-500 transition-transform', { 'rotate-180': faq.isOpen }]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <transition
                  enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.isOpen" class="mt-4 overflow-hidden">
                  <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import {ref, reactive} from 'vue'

const title = "Need a hand? Contact us"
const description = ""

const breadCrumps = [{
  name: "Institute",
  link: "/institute"
}, {
  name: "Contact",
  link: "/institute/contact"
}]

// Reactive state for contact form
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const errors = ref({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

// FAQ data
const faqs = ref([
  {
    question: 'What types of yoga classes do you offer?',
    answer: 'We offer a variety of classes including Hatha, Vinyasa, Yin, Restorative, and Prenatal Yoga. Each class is designed to suit different levels and needs—from beginners to advanced practitioners.',
    isOpen: false
  },
  {
    question: 'Do I need to bring my own mat and equipment?',
    answer: 'You are welcome to bring your own mat, but we also provide mats, blocks, straps, and blankets free of charge for all our students.',
    isOpen: false
  },
  {
    question: ' I\'m new to yoga. Which class should I start with?',
    answer: 'We recommend starting with our Beginner or Gentle Hatha Yoga class. These sessions are slower-paced and focus on foundational poses and breathing techniques.',
    isOpen: false
  },
  {
    question: 'What should I wear to a yoga class?',
    answer: 'Wear comfortable, breathable clothing that allows for a full range of movement. Bare feet are best for grip and stability on the mat.',
    isOpen: false
  }
])

// Form validation
const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.value.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.value.message = 'Message must be at least 10 characters long'
    isValid = false
  }

  return isValid
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  showSuccess.value = false

  try {
    // Simulate API call - replace with actual API endpoint
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Here you would typically send the form data to your API
    console.log('Form submitted:', form)

    // Reset form and show success message
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    })

    showSuccess.value = true

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Error submitting form:', error)
    // You could add error handling here
  } finally {
    isSubmitting.value = false
  }
}

// Toggle FAQ accordion
const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

</script>

<style scoped>
/* Additional custom styles if needed */
.rotate-180 {
  transform: rotate(180deg);
}
</style>