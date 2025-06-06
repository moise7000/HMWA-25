import { ref, computed, onMounted, watch } from 'vue'

import { useCourseEnrollments } from '~/managers/courseEnrollementManager.js'

export function useCourses() {
    const { getCoursesForProfile } = useCourseEnrollments()
    const user = useSupabaseUser()

    const enrolledCourses = ref([])
    const loading = ref(true)
    const error = ref(null)

    // Computed properties for stats
    const totalDuration = computed(() => {
        return enrolledCourses.value.reduce((total, course) => total + (course.duration_minutes || 0), 0)
    })

    const totalPrice = computed(() => {
        return enrolledCourses.value.reduce((total, course) => total + (course.price || 0), 0)
    })

    const fetchEnrolledCourses = async () => {
        if (!user.value?.id) {
            error.value = "Utilisateur non connecté"
            loading.value = false
            return
        }

        try {
            loading.value = true
            error.value = null

            const courses = await getCoursesForProfile(user.value.id)
            enrolledCourses.value = courses || []

        } catch (err) {
            console.error('Erreur lors du chargement des cours:', err)
            error.value = "Impossible de charger vos cours. Veuillez réessayer."
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchEnrolledCourses()
    })

    watch(() => user.value?.id, (newUserId) => {
        if (newUserId) {
            fetchEnrolledCourses()
        } else {
            enrolledCourses.value = []
        }
    })

    return {
        enrolledCourses,
        loading,
        error,
        totalDuration,
        totalPrice
    }
}
