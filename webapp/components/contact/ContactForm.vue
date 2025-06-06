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
import FormInput from '~/components/form/FormInput.vue'
import FormTextarea from '~/components/form/FormTextarea.vue'
import SubmitButton from '~/components/form/SubmitButton.vue'
import SuccessMessage from '~/components/form/SuccessMessage.vue'

import { useContactForm } from '~/scripts/contact/contactFormLogic.js'

const { form, errors, isSubmitting, showSuccess, handleSubmit } = useContactForm()
</script>

