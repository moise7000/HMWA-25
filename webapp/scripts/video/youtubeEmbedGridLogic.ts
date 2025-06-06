import { ref } from 'vue'

export function useVideos() {
    const videosWithTitles = ref([
        { id: 'WvK3WwatW8k', title: 'Vidéo 1' },
        { id: 'j97SSGsnCAQ', title: 'Vidéo 2' },
        { id: 'RjHH2er8DkM', title: 'Vidéo 3' },
        { id: 'kH12QrSGedM', title: 'Vidéo 4' }
    ])

    function addVideo(videoId: string, title = 'Nouvelle vidéo') {
        videosWithTitles.value.push({ id: videoId, title })
    }

    function removeVideo(index: number) {
        videosWithTitles.value.splice(index, 1)
    }

    return {
        videosWithTitles,
        addVideo,
        removeVideo
    }
}
