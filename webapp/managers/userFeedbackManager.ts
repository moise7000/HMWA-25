

export function useUserFeedbacks() {
    const client = useSupabaseClient()

    const getFeedbacksForUser = async (userId: string) => {
        const { data, error } = await client
            .from('user_feedbacks')
            .select('*, course: courses(*)')
            .eq('user_id', userId)

        if (error) throw error
        return data || []
    }


    const getFeedbacksForCourse = async (courseId: string, limit: number = 10) => {
        const { data, error } = await client
            .from('user_feedbacks')
            .select(`*`)
            .eq('course_id', courseId)
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) throw error
        return data || []
    }


    const upsertFeedback = async (userId: string, courseId: string, comment: string) => {
        const { error } = await client
            .from('user_feedbacks')
            .upsert(
                {
                    user_id: userId,
                    course_id: courseId,
                    comment,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: ['user_id', 'course_id'] }
            )
        if (error) throw error
    }

    const deleteFeedback = async (userId: string, courseId: string) => {
        const { error } = await client
            .from('user_feedbacks')
            .delete()
            .match({ user_id: userId, course_id: courseId })
        if (error) throw error
    }

    return {
        getFeedbacksForUser,
        upsertFeedback,
        deleteFeedback,
        getFeedbacksForCourse
    }
}
