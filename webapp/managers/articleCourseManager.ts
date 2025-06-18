import type { Article } from '~/types/Article'

export const useArticleCourseManager = () => {
    const client = useSupabaseClient()

    /**
     * Retrieves all articles related to a specific course
     * @param courseId
     * @returns Promise<Article[]>
     */
    const getArticlesForCourse = async (courseId: string): Promise<Article[]> => {
        const { data, error } = await client
            .from('article_course')
            .select('articles(*)')
            .eq('course_id', courseId)

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

    /**
     * Retrieves all courses related to a specific article
     * @param articleId
     * @returns Promise<Course[]>
     */
    const getCoursesForArticle = async (articleId: string): Promise<any[]> => {
        const { data, error } = await client
            .from('article_course')
            .select('courses(*)')
            .eq('article_id', articleId)

        if (error) throw error

        return data.map((row: any) => row.courses)
    }

    return {
        getArticlesForCourse,
        getCoursesForArticle,

    }
}