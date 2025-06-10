import { ref, onMounted } from 'vue'
import { useHead } from '#app'
import MultiTopic from '~/components/common/indexes.vue'

export const useAboutPage = () => {

    useHead({
                title: 'About Yoga',
                meta: [
                    {
                        name: 'description',
                        content: 'Discover the essence of yoga — a journey toward balance, strength, and inner peace. Explore its benefits, learn how to practice at home, and dive into tips, resources, and guides to support your path.'
                    },
                    {
                        property: 'og:title',
                        content: 'About Yoga'
                    },
                    {
                        property: 'og:description',
                        content: 'Discover the essence of yoga — a journey toward balance, strength, and inner peace.'
                    },
                    {
                        property: 'og:type',
                        content: 'website'
                    },
                    {
                        property: 'og:url',
                        content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/about/'
                    },
                    {
                        name: 'twitter:card',
                        content: 'summary'
                    },
                    {
                        name: 'twitter:title',
                        content: 'About Yoga'
                    },
                    {
                        name: 'twitter:description',
                        content: 'Discover the essence of yoga — a journey toward balance, strength, and inner peace.'
                    }
                ]
            })



    const title = 'About Yoga'

    const description = 'Discover the essence of yoga — a journey toward balance, strength, and inner peace. Explore its benefits, learn how to practice at home, and dive into tips, resources, and guides to support your path.'

    const topics = [
        {
            imagePath : 'assets/yoga_courses/yoga_course_17.png',
            topicDescription : 'Yoga offers more than flexibility — it enhances mental clarity, reduces stress, strengthens the body, and supports overall well-being.',
            linkPath : '/about/benefits',
            topicTitle : 'Benefits',
            linkText: "Let's feel better",
            side : true
        }, {imagePath : 'assets/yoga_courses/yoga_course_18.png',
    topicDescription: 'Discover our selection of recommended yoga equipment gear and accessories.',
    linkPath : '/about/equipments',
    topicTitle : 'Equipments',
    side : false,
    linkText: "See our partners",

}, {imagePath : 'assets/exercices/warrior_pose.jpg',
    topicDescription:'Enjoy the freedom and comfort of practicing yoga in your own space.',
    linkPath : '/about/practice-at-home',
    topicTitle : 'Practice at home',
    linkText: "Start yoga now",
    side : true
}, {imagePath : 'assets/yoga_courses/yoga_course_20.png',
    topicDescription:'Discover our latest articles about yoga, wellness, and mindfulness.',
    linkPath : '/about/articles',
    topicTitle : 'Articles',
    linkText: "Learn more",
    side : false
}
]

    return {
        useHead,
        title,
        description,
        topics
    }
}