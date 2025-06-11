import type { Subscription } from '~/types/Subscription'

export const useSubscriptions = () => {
    const client = useSupabaseClient()

    const getAllSubscriptions = async (): Promise<Subscription[]> => {
        const { data, error } = await client
            .from('subscriptions')
            .select('*')
            .order('created_at', { ascending: false })
        if (error) throw error
        return data || []
    }

    const getActiveSubscriptions = async (): Promise<Subscription[]> => {
        const { data, error } = await client
            .from('subscriptions')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
        if (error) throw error
        return data || []
    }

    const getSubscriptionById = async (id: string): Promise<Subscription | null> => {
        const { data, error } = await client
            .from('subscriptions')
            .select('*')
            .eq('id', id)
            .single()
        if (error) throw error
        return data
    }

    const getCoursesForSubscription = async (subscriptionId: string) => {
        const { data, error } = await client
            .from('course_subscription')
            .select('*, courses(*)') // Join with the courses table
            .eq('subscription_id', subscriptionId)

        if (error) throw error

        return data.map((cs: any) => cs.courses) // Extract course details
    }

    return {
        getAllSubscriptions,
        getActiveSubscriptions,
        getSubscriptionById,
        getCoursesForSubscription,
    }
}
