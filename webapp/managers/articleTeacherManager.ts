import type { Teacher } from '~/types/Teacher'

export const useArticleTeachers = () => {
    const client = useSupabaseClient()

    const getTeachersForArticle = async (articleId: string): Promise<Teacher[]> => {
        const { data, error } = await client
            .from('articles_teachers')
            .select('teachers(*)')
            .eq('article_id', articleId)

        if (error) throw error

        return data.map((row: any) => {
            const teacher = row.teachers
            return {
                ...teacher,
                photo: teacher.photo
                    ? `https://lmwpuleyzjxgzecypqdk.supabase.co/storage/v1/object/public/${teacher.photo}`
                    : null,
            }
        })
    }

    const getArticlesForTeacher = async (teacherId: string): Promise<any[]> => {
        const { data, error } = await client
            .from('articles_teachers')
            .select('articles(*)')
            .eq('teacher_id', teacherId)

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



    return {
        getTeachersForArticle,
        getArticlesForTeacher,
    }
}