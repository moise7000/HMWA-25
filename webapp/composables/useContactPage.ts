import {useHead} from "#app";

export const useContactPage = () => {
    const title = "Need a hand? "
    const description = "Contact us"

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
                content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/contact',
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
        name: "Institute",
        link: "/institute"
    }, {
        name: "Contact",
        link: "/institute/contact"
    }]

    return {
        title,
        description,
        breadCrumps
    }
}