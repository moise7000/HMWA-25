import { ref, reactive } from 'vue'

export function useContactForm() {
    // Reactive state for contact form
    const form = reactive({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    })

    const errors = ref<Record<string, string>>({})
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
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        form,
        errors,
        isSubmitting,
        showSuccess,
        handleSubmit
    }
}
