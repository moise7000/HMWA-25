// composables/useArticlesPage.ts
import { ref, onMounted, computed } from 'vue'
import { useArticles } from '~/managers/articleManager'
import type { Article } from '@/types/Article'

export const useArticlesPage = () => {
    // Données de la page
    const title = "Latest Articles"
    const description = "Discover our latest articles about yoga, wellness, and mindfulness. Explore insights, tips, and inspiration from our experienced teachers and practitioners."

    const breadCrumps = [
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Articles",
            link: "/institute/articles"
        }
    ]

    // État réactif
    const articlesList = ref<Article[]>([])
    const displayedArticles = ref<Article[]>([])
    const loading = ref(true)
    const loadingMore = ref(false)
    const error = ref<Error | null>(null)

    // Configuration pagination
    const articlesPerPage = 4
    const currentPage = ref(1)

    // Computed
    const hasMoreArticles = computed(() => {
        return displayedArticles.value.length < articlesList.value.length
    })

    // Logique métier
    const { getAllArticles } = useArticles()

    const loadInitialArticles = async () => {
        try {
            loading.value = true
            error.value = null
            articlesList.value = await getAllArticles()
            // Afficher les premiers articles
            displayedArticles.value = articlesList.value.slice(0, articlesPerPage)
        } catch (err: any) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    const loadMoreArticles = () => {
        if (loadingMore.value || !hasMoreArticles.value) return

        loadingMore.value = true

        // Simuler un petit délai pour l'UX
        setTimeout(() => {
            currentPage.value++
            const startIndex = (currentPage.value - 1) * articlesPerPage
            const endIndex = startIndex + articlesPerPage
            const newArticles = articlesList.value.slice(startIndex, endIndex)

            displayedArticles.value = [...displayedArticles.value, ...newArticles]
            loadingMore.value = false
        }, 500)
    }

    const resetPagination = () => {
        currentPage.value = 1
        displayedArticles.value = articlesList.value.slice(0, articlesPerPage)
    }

    // Initialisation
    onMounted(async () => {
        await loadInitialArticles()
    })

    // Retour des données et méthodes utilisables
    return {
        // Données de la page
        title,
        description,
        breadCrumps,

        // État réactif
        articlesList: readonly(articlesList),
        displayedArticles: readonly(displayedArticles),
        loading: readonly(loading),
        loadingMore: readonly(loadingMore),
        error: readonly(error),

        // Computed
        hasMoreArticles,

        // Configuration
        articlesPerPage,
        currentPage: readonly(currentPage),

        // Méthodes
        loadMoreArticles,
        loadInitialArticles,
        resetPagination
    }
}