import type { Event } from '~/types/Event'

export const useEvents = () => {
    const client = useSupabaseClient()

    // Récupérer tous les événements
    const getAllEvents = async (): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    // Récupérer un événement par ID
    const getEventById = async (id: string): Promise<Event | null> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null // Pas trouvé
            throw error
        }
        return data
    }

    // Récupérer les événements avec leurs teachers
    const getEventsWithTeachers = async () => {
        const { data, error } = await client
            .from('events')
            .select(`
                *,
                teacher:teachers(*)
            `)
            .order('date', { ascending: true })

        if (error) throw error
        return data
    }

    // Récupérer les événements d'un teacher spécifique
    const getEventsByTeacher = async (teacherId: string): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .eq('teacher_id', teacherId)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    // Récupérer les événements à venir
    const getUpcomingEvents = async (): Promise<Event[]> => {
        const now = new Date().toISOString()
        const { data, error } = await client
            .from('events')
            .select('*')
            .gte('date', now)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    // Récupérer les événements passés
    const getPastEvents = async (): Promise<Event[]> => {
        const now = new Date().toISOString()
        const { data, error } = await client
            .from('events')
            .select('*')
            .lt('endDate', now)
            .order('date', { ascending: false })

        if (error) throw error
        return data || []
    }

    // Récupérer les événements gratuits
    const getFreeEvents = async (): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .eq('isFree', true)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    // Récupérer les événements par lieu
    const getEventsByLocation = async (location: string): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .ilike('location', `%${location}%`)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }






    // Rechercher des événements par titre ou description
    const searchEvents = async (query: string): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    // Récupérer les événements dans une plage de dates
    const getEventsByDateRange = async (startDate: string, endDate: string): Promise<Event[]> => {
        const { data, error } = await client
            .from('events')
            .select('*')
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: true })

        if (error) throw error
        return data || []
    }

    return {

        getAllEvents,
        getEventById,
        getEventsWithTeachers,
        getEventsByTeacher,
        getUpcomingEvents,
        getPastEvents,
        getFreeEvents,
        getEventsByLocation,
        searchEvents,
        getEventsByDateRange,




    }
}