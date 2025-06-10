import {useHead} from "#app";


export const useLocationPage = () => {
    const title = "Where to find us?";
    const description = "Discover this vibrant location and its hidden gems.";
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
                content: 'https://hmwa-25-git-main-moise7000s-projects.vercel.app/institute/location',
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

    return {
        title,
        description
    }
}