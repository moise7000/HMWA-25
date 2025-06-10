
import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import { useEquipment } from '~/managers/equipmentManager'
import type { Equipment } from '@/types/Equipment'

export const useEquipmentsPage = () => {
    // Configuration SEO
    useHead({
        title: 'Our Yoga Equipments | Yoga Studio',
        meta: [
            {
                name: 'description',
                content: 'Discover our selection of recommended yoga equipment gear and accessories, with links to our partner sites where you can explore and purchase the items we love and use.'
            },
            {
                property: 'og:title',
                content: 'Our Yoga Equipments | Yoga Studio'
            },
            {
                property: 'og:description',
                content: 'Explore our curated yoga equipment: mats, blocks, straps and more — all selected to enhance your yoga practice.'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:url',
                content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/about/equipments'
            },
            {
                name: 'twitter:card',
                content: 'summary'
            },
            {
                name: 'twitter:title',
                content: 'Our Yoga Equipments | Yoga Studio'
            },
            {
                name: 'twitter:description',
                content: 'Discover the yoga gear we recommend to elevate your practice.'
            }
        ]
    })

    // Données de la page
    const title = "Our yoga equipments"
    const description = "Discover our selection of recommended yoga equipment gear and accessories, with links to our partner sites where you can explore and purchase the items we love and use."

    const breadCrumps = [
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Equipments",
            link: "/about/equipments"
        }
    ]

    // État réactif
    const equipmentList = ref<Equipment[]>([])
    const loading = ref(true)
    const error = ref<Error | null>(null)

    // Logique métier
    const { getAllEquipment } = useEquipment()

    const loadEquipments = async () => {
        try {
            loading.value = true
            error.value = null
            equipmentList.value = await getAllEquipment()
        } catch (err: any) {
            error.value = err
        } finally {
            loading.value = false
        }
    }

    // Initialisation
    onMounted(async () => {
        await loadEquipments()
    })

    // Retour des données et méthodes utilisables
    return {
        // Données de la page
        title,
        description,
        breadCrumps,

        // État réactif
        equipmentList: readonly(equipmentList),
        loading: readonly(loading),
        error: readonly(error),

        // Méthodes
        loadEquipments
    }
}