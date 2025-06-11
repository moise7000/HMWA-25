export interface Subscription {
    id: string
    name: string
    type: 'monthly' | 'quarterly' | 'annual'
    price: number
    description: string
    duration_days: number
    max_classes_per_period: number | null
    benefits: string[] | null
    is_active: boolean
    created_at: string
    updated_at: string
}