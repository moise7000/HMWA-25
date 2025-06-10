
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import { useUserFeedbacks } from '~/managers/userFeedbackManager'
import { useArticles } from "~/managers/articleManager"

export const useBenefitsPage = () => {

    useHead({
        title: 'Yoga Benefits - Improve Your Life with Yoga | YourSiteName',
        meta: [
            {
                name: 'description',
                content: 'Discover the physical and mental benefits of yoga, from stress relief and flexibility to better sleep and enhanced focus. Start your transformation today.'
            },
            { property: 'og:title', content: 'Yoga Benefits - Improve Your Life with Yoga' },
            { property: 'og:description', content: 'Discover the physical and mental benefits of yoga. Learn how a consistent practice can transform your life.' },
            { property: 'og:image', content: '/assets/yoga_courses/yoga_course_23.png' },
            { property: 'og:type', content: 'website' },
            { name: 'twitter:card', content: 'summary_large_image' }
        ],
        link: [
            { rel: 'canonical', href: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/about/benefits' }
        ]
    })


    const loading = ref(true)
    const error = ref(null)


    const title = "Benefits"
    const description = "Yoga offers more than flexibility — it enhances mental clarity, reduces stress, strengthens the body, and supports overall well-being. Discover how a regular practice can transform your life."

    const breadCrumps = [{
        name: "About",
        link: "/about"
    }, {
        name: "Benefits",
        link: "/about/benefits"
    }]

    const benefits = [
        {
            id: 1,
            title: "Stress Relief",
            description: "Yoga encourages mindfulness and deep breathing, helping to calm the nervous system and reduce everyday stress.",
            icon: "🎯"
        },
        {
            id: 2,
            title: "Flexibility & Strength",
            description: "Through regular practice, yoga gently stretches and strengthens muscles, increasing mobility and balance.",
            icon: "💪"
        },
        {
            id: 3,
            title: "Better Sleep Quality",
            description: "Relaxation-focused poses and breathing techniques prepare the body and mind for restful, deeper sleep.",
            icon: "💤"
        },
        {
            id: 4,
            title: "Enhanced Mental Focus",
            description: "Yoga promotes concentration and clarity, supporting mental sharpness and emotional balance throughout the day.",
            icon: "🧘"
        }
    ]


    const articles = ref([])
    const displayedArticles = ref([])
    const articlesLoading = ref(false)
    const articleLimit = 4

    const { getAllArticles } = useArticles()

    const loadArticles = async () => {
        articlesLoading.value = true
        try {
            const allArticles = await getAllArticles()
            articles.value = allArticles
            displayedArticles.value = allArticles.slice(0, articleLimit)
        } catch (err) {
            console.error('Error loading articles:', err)
            articles.value = []
            displayedArticles.value = []
        } finally {
            articlesLoading.value = false
        }
    }


    const feedbacks = ref([])
    const feedbacksLoading = ref(false)
    const feedbackLimit = ref(4)

    const { getAllFeedbacks } = useUserFeedbacks()

    const loadAllFeedbacks = async () => {
        feedbacksLoading.value = true
        try {
            const allFeedbacks = await getAllFeedbacks(feedbackLimit.value)
            feedbacks.value = allFeedbacks
        } catch (err) {
            console.error('Error loading feedbacks:', err)
            feedbacks.value = []
        } finally {
            feedbacksLoading.value = false
        }
    }


    const handleBenefitClick = (benefit) => {


    }


    const initialize = async () => {
        try {
            await Promise.all([
                loadArticles(),
                loadAllFeedbacks()
            ])
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    // Cycle de vie
    onMounted(initialize)


    return {

        loading,
        error,


        title,
        description,
        breadCrumps,
        benefits,


        articles,
        displayedArticles,
        articlesLoading,


        feedbacks,
        feedbacksLoading,


        handleBenefitClick,
        loadArticles,
        loadAllFeedbacks
    }
}