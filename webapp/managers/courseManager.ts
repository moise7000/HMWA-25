import type { Course } from '~/types/Course'
import type { Teacher } from '~/types/Teacher'

export const useCourses = () => {
    const client = useSupabaseClient()


    const getAllCoursesWithTeachers = async (): Promise<Course[]> => {
        const { data, error } = await client
            .from('courses')
            .select(`
                *,
                teacher:teachers(*)
            `)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }


    const getAllCourses = async (): Promise<Course[]> => {
        const { data, error } = await client
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    // Récupérer un cours par ID avec son professeur
    const getCourseWithTeacher = async (id: string): Promise<Course | null> => {
        const { data, error } = await client
            .from('courses')
            .select(`
                *,
                teacher:teachers(*)
            `)
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null // Pas trouvé
            throw error
        }
        return data
    }

    // Récupérer un cours par ID sans relation
    const getCourseById = async (id: string): Promise<Course | null> => {
        const { data, error } = await client
            .from('courses')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null // Pas trouvé
            throw error
        }
        return data
    }

    // Récupérer tous les cours d'un professeur spécifique
    const getCoursesByTeacher = async (teacherId: string): Promise<Course[]> => {
        const { data, error } = await client
            .from('courses')
            .select(`
                *,
                teacher:teachers(*)
            `)
            .eq('teacher_id', teacherId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }



    // Rechercher des cours par titre ou description
    const searchCourses = async (searchTerm: string): Promise<Course[]> => {
        const { data, error } = await client
            .from('courses')
            .select(`
                *,
                teacher:teachers(*)
            `)
            .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    const getAllCoursesFromTeacher = async (teacherId: string): Promise<Course[]> => {
        const { data, error } = await client
            .from('courses')
            .select(`
            *,
            teacher:teachers(*)
        `)
            .eq('teacher_id', teacherId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }



    return {
        getAllCoursesWithTeachers,
        getAllCourses,
        getCourseWithTeacher,
        getAllCoursesFromTeacher,
        getCourseById,
        getCoursesByTeacher,
        searchCourses,

    }
}