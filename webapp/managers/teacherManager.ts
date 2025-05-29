import type { Teacher } from '~/types/Teacher'

export const useTeachers = () => {
    const client = useSupabaseClient()


    const getAllTeachers = async (): Promise<Teacher[]> => {
        const { data, error } = await client
            .from('teachers')
            .select('*')
            .order('name', { ascending: true })

        if (error) throw error

        const transformed = data
            .map((teacher: any) => ({
            ...teacher,
            photo: teacher.photo
                ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${teacher.photo}`
                : null,
        }))

        return transformed || []

    }


    const getTeacherById = async (id: string): Promise<Teacher | null> => {
        const { data, error } = await client
            .from('teachers')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null // Pas trouvé
            throw error
        }
        return data
    }

    return {
        getAllTeachers,
        getTeacherById,
    }
}