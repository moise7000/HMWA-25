<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Contact us</h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <FormInput
          id="firstName"
          v-model="form.firstName"
          label="First name"
          placeholder="John"
          :error="errors.firstName"
          required
      />

      <FormInput
          id="lastName"
          v-model="form.lastName"
          label="Last name"
          placeholder="Doe"
          :error="errors.lastName"
          required
      />

      <FormInput
          id="email"
          v-model="form.email"
          type="email"
          label="Email address"
          placeholder="john.doe@example.com"
          :error="errors.email"
          required
      />

      <FormTextarea
          id="message"
          v-model="form.message"
          label="Your message"
          placeholder="Enter your question or message"
          :rows="6"
          :error="errors.message"
          required
      />

      <SubmitButton
          :is-submitting="isSubmitting"
          submit-text="Submit"
          submitting-text="Submitting..."
      />
    </form>

    <SuccessMessage v-if="showSuccess" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FormInput from '~/components/form/FormInput.vue'
import FormTextarea from '~/components/form/FormTextarea.vue'
import SubmitButton from '~/components/form/SubmitButton.vue'
import SuccessMessage from '~/components/form/SuccessMessage.vue'

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
</script>