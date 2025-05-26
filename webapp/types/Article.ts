// types/Article.ts - Mise à jour de l'interface
export interface Article {
    id: string; // uuid dans Supabase
    title: string;
    content: string;
    image?: string; // bytea stocké comme URL
    authors?: string[]; // jsonb
    published_at?: string; // timestamp
    snippet: string;
    slug: string;
    tags?: string[]; // jsonb
    is_published: boolean;
    views_count: number;
    created_at: string; // timestamp
    updated_at: string; // timestamp
}

// composables/useArticles.ts - Manager simple
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