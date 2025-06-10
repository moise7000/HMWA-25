import { ref, onMounted } from 'vue'
import { useHead } from '#app'

export const usePracticeAtHomePage = () => {
    useHead({
        title: 'Safety & Guidelines - Yoga Studio',
        meta: [
            {
                name: 'description',
                content: 'Important safety rules and guidelines for yoga practice. Learn how to practice safely and get the most out of your yoga sessions.'
            }
        ]
    })

    const breadCrumps = [{
        name : "About",
        link : "/about"
    }, {
        name : "Practice at home",
        link : "/about/practice-at-home"
    }]

    const title = "Practice yoga at home"
    const description = "Enjoy the freedom and comfort of practicing yoga in your own space. Whether you're a beginner or experienced, our guided sessions and tips help you stay consistent, safe, and connected — anytime, anywhere."



    const subtitleOne = "Exercises"
    const subtitleTwo = "Videos"
    const subtitleThree = "Safety & guidelines"

    const safetyGuidelines = "Please read and follow these important safety guidelines to ensure a safe and enjoyable yoga experience."

    const exercises = [
        {
            description: "Downward Facing Dog - A foundational pose that strengthens and stretches",
            buttonDisplay: false,
            image: "/assets/exercices/downward_facing_dog.jpg"
        },
        {
            description: "Mountain Pose - Building strength and stability from the ground up",
            buttonDisplay: false,
            image: "/assets/exercices/mountain_pose.jpg"
        },
        {
            description: "Warrior Pose - Developing focus, strength and confidence",
            buttonDisplay: false,
            image: "/assets/exercices/warrior_pose.jpg"
        },
        {
            description: "Child's Pose - A restorative pose for rest and reflection",
            buttonDisplay: false,
            image: "/assets/exercices/child_pose.jpg"
        }
    ]




    const safetyRules = ref([
        {
            id: '1',
            icon: '⚠️',
            title: 'Listen to Your Body',
            description: 'Never force a pose or push through pain. Stop immediately if something doesn\'t feel right.'
        },
        {
            id: '2',
            icon: '🩹',
            title: 'Inform About Injuries',
            description: 'Always tell your instructor about any injuries or physical limitations before class begins.'
        },
        {
            id: '3',
            icon: '🤰',
            title: 'Pregnancy Precautions',
            description: 'If you\'re pregnant, inform the instructor and avoid poses that put pressure on your abdomen.'
        },
        {
            id: '4',
            icon: '💊',
            title: 'Medical Conditions',
            description: 'Consult your doctor before starting yoga if you have any medical conditions or concerns.'
        },
        {
            id: '9',
            icon: '💧',
            title: 'Stay Hydrated',
            description: 'Drink water before and after class, but avoid drinking too much during practice.'
        },
        {
            id: '10',
            icon: '🍽️',
            title: 'Avoid Heavy Meals',
            description: 'Wait at least 2-3 hours after eating a large meal before practicing yoga.'
        },
        {
            id: '11',
            icon: '🧘',
            title: 'Focus on Breathing',
            description: 'Maintain steady, deep breathing throughout your practice for better results.'
        },
        {
            id: '12',
            icon: '🏠',
            title: 'Practice Regularly',
            description: 'Consistency is key. Even short, regular sessions are better than long, infrequent ones.'
        }
    ])


    return {
        safetyGuidelines,
        safetyRules,
        exercises,
        subtitleOne,
        subtitleTwo,
        subtitleThree,
        breadCrumps,
        title,
        description
    }
}