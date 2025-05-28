export const useArticles = () => {
    const client = useSupabaseClient()

    // Récupérer tous les articles
    const getAllArticles = async () => {
        const { data, error } = await client
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }


    return {
        getAllArticles,

    }
}