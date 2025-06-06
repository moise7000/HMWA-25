export default defineNuxtRouteMiddleware(async () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    // Vérifier d'abord la session directement
    const { data } = await supabase.auth.getSession()

    if (!data.session && !user.value) {
        return navigateTo('/auth/signin')
    }
})