export const useEquipment = () => {
    const client = useSupabaseClient()

    // Récupérer tous les articles
    const getAllEquipment = async () => {
        const { data, error } = await client
            .from('equipment')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }


    return {
        getAllEquipment
    }
}