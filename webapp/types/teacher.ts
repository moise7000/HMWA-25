import type {Course} from "~/types/Course";

export interface Teacher {
    id: string; // uuid
    name: string;
    photo?: string; // bytea stocké comme URL
    biography: string;
    certificates?: string[]; // jsonb
    social_media?: any; // jsonb (objet avec les réseaux sociaux)
    created_at: string;
    // Relations (optionnelles, chargées avec join)
    courses?: Course[];
}

export const useCourses = () => {
    const client = useSupabaseClient()

    // Récupérer tous les cours
    const getAllCourses = async () => {
        const { data, error } = await client
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    // Récupérer tous les cours AVEC leurs teachers (relation)
    const getCoursesWithTeachers = async () => {
        const { data, error } = await client
            .from('courses')
            .select(`
        *,
        teacher:teachers(*)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    // Récupérer les cours d'un teacher spécifique
    const getCoursesByTeacher = async (teacherId: string) => {
        const { data, error } = await client
            .from('courses')
            .select('*')
            .eq('teacher_id', teacherId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    return {
        getAllCourses,
        getCoursesWithTeachers,
        getCoursesByTeacher
    }
}