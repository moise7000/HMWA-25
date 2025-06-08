// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', 'nuxt-simple-sitemap'],

  sitemap: {
    siteUrl: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app',
    trailingSlash: false,
    routes: [
      '/',
      '/about',
      '/contact'
    ]
  },

  supabase: {
    redirect: false,
    cookieOptions: {
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: 'lax',
      secure: false // true if HTTPS
    },
    clientOptions: {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    }
  }






})