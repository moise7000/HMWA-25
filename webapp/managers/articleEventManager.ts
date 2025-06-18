import type { Article } from '~/types/Article'

export const useArticleEvents = () => {
    const client = useSupabaseClient()

    const getArticlesForEvent = async (eventId: string): Promise<Article[]> => {
        const { data, error } = await client
            .from('article_event')
            .select('articles(*)')
            .eq('event_id', eventId)

        if (error) throw error

        return data.map((row: any) => {
            const article = row.articles
            return {
                ...article,
                image: article.image
                    ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${article.image}`
                    : null,
            }
        })
    }

    const getEventsForArticle = async (articleId: string): Promise<any[]> => {
        const { data, error } = await client
            .from('article_event')
            .select('events(*)')
            .eq('article_id', articleId)

        if (error) throw error

        return data.map((row: any) => {
            const event = row.events
            return {
                ...event,
                image: event.image
                    ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${event.image}`
                    : null,
            }
        })
    }



    return {
        getArticlesForEvent,
        getEventsForArticle,

    }
}