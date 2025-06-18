<!-- MyForm.vue -->
<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Email / Username field -->
    <MyInput
      v-model="form.email"
      placeholder="Email or username"
    />

    <!-- Password field -->
    <MyInput
      v-model="form.password"
      placeholder="Password"
      :password="true"
    />

    <!-- Submit button (using custom component) -->
    <MyButon
      type="submit"
    >
      Submit
    </MyButon>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import Input from '~/components/common/input.vue'
import MyButton from '~/components/common/button.vue'

// Local reactive state for the form inputs
const form = reactive({
  email: '',
  password: ''
})

// Emit the collected form data to the parent on submit
const emit = defineEmits(['submit'])

function onSubmit() {
  // Emit a copy of the form data so the parent can handle it
  emit('submit', { ...form })

  // Example: reset form after submission
  // form.email = ''
  // form.password = ''
}
</script>

<style scoped>
/* Optional styling for spacing & responsiveness */
form {
  width: 100%;
  max-width: 400px;
}
</style>
