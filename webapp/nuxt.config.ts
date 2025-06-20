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
  },

  app: {
    head: {
      link: [
        // Standard
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },

        // Apple (Safari, iOS)
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },

        // Android/Chrome PWA icons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },

        // Web App Manifest
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  }


})