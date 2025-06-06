import type { CourseEnrollment } from '~/types/CourseEnrollment'
import type { Course } from '~/types/Course'
import type { Profile } from '~/types/Profile'

export const useCourseEnrollments = () => {
    const client = useSupabaseClient()


    const enrollProfileToCourse = async (profileId: string, courseId: string): Promise<void> => {
        const { error } = await client.from('course_enrollments').insert({
            user_id: profileId, // ✅ ici
            course_id: courseId,
        })

        if (error) throw error
    }

    const removeProfileFromCourse = async (profileId: string, courseId: string): Promise<void> => {
        const { error } = await client
            .from('course_enrollments')
            .delete()
            .match({ user_id: profileId, course_id: courseId })

        if (error) throw error
    }

    const getCoursesForProfile = async (profileId: string): Promise<Course[]> => {
        const { data, error } = await client
            .from('course_enrollments')
            .select('courses(*)')
            .eq('user_id', profileId)

        if (error) throw error

        return data.map((row: any) => {
            const course = row.courses
            return {
                ...course,
                image: course.image
                    ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${course.image}`
                    : null,
            }
        })
    }


    const getProfilesForCourse = async (courseId: string): Promise<Profile[]> => {
        const { data, error } = await client
            .from('course_enrollments')
            .select('profiles(*)')
            .eq('course_id', courseId)

        if (error) throw error

        return data.map((row: any) => row.profiles)
    }

    return {
        enrollProfileToCourse,
        removeProfileFromCourse,
        getCoursesForProfile,
        getProfilesForCourse

    }
}
