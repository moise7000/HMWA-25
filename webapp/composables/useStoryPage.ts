import {useHead} from "#app";

export const useStoryPage = () => {
    const title = "Our story"

    const description = "Know about us."

    useHead({
        title: title,
        meta: [
            {
                name: 'description',
                content: description
            },
            {
                property: 'og:title',
                content: title
            },
            {
                property: 'og:description',
                content: description
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'og:url',
                content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/institute/story',
            },
            {
                name: 'twitter:card',
                content: 'summary'
            },
            {
                name: 'twitter:title',
                content: title
            },
            {
                name: 'twitter:description',
                content: description
            }
        ]
    })

    const breadCrumps = [{
        name : "Insitute",
        link : "/institute"
    }, {
        name : "Story",
        link : "/institute/story"
    }]

    const topics = [{
        imagePath : "/assets/yoga_courses/yoga_course_0.png",
        topicTitle : "Our founder",
        topicDescription : "Meet Emma Blasco, our founder.",
        side : true
    },{
        imagePath : "/assets/yoga_courses/yoga_course_0.png",
        topicTitle : "Achievments",
        topicDescription : "Discover our success.",
        side : false
    },{
        imagePath : "/assets/yoga_courses/yoga_course_0.png",
        topicTitle : "Milestones",
        topicDescription : "Since our origins.",
        side : true
    }]

    return {
        title,
        description,
        breadCrumps,
        topics
    }
}