export const useArticles = () => {
    const client = useSupabaseClient()

    // Récupérer tous les articles
    const getAllArticles = async () => {
        const { data, error } = await client
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error
        const transformed = data
            .map((article: any) => ({
                ...article,
                image: article.image
                    ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${article.image}`
                    : null,
            }))


        return transformed || []
    }


    return {
        getAllArticles,

    }
}