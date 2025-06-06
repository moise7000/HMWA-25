import type { Course } from '~/types/Course'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export function useCourseCardLogic(course: Course) {
    const router = useRouter()

    const navigateToCourse = () => {
        const slug = course.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
            .replace(/\s+/g, '-')            // Remplace espaces par tirets
            .replace(/[^\w-]/g, '')          // Supprime caractères spéciaux

        router.push(`/courses-and-subscriptions/courses/${slug}`)
    }

    const formatDifficulty = (level: string) => {
        const levels: { [key: string]: string } = {
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced'
        }
        return levels[level] || level
    }

    return {
        navigateToCourse,
        formatDifficulty
    }
}
