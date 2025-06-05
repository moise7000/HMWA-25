<template>
  <div class="video-container">
    <div class="video-grid">
      <div class="grid">
        <YouTubeEmbed
            v-for="(video, index) in videosWithTitles"
            :key="index"
            :video-id="video.id"
            :title="video.title"
            border-radius="15px"
            responsive
            class="grid-item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import YouTubeEmbed from '~/components/video/YoutubeEmbed.vue'

export default {
  components: {
    YouTubeEmbed
  },
  data() {
    return {

      videoIds: [
        'WvK3WwatW8k',
        'j97SSGsnCAQ',
        'RjHH2er8DkM',
        'kH12QrSGedM'
      ],

      // Liste avec plus d'informations
      videosWithTitles: [
        {id: 'WvK3WwatW8k', title: 'Vidéo 1'},
        {id: 'j97SSGsnCAQ', title: 'Vidéo 2'},
        {id: 'RjHH2er8DkM', title: 'Vidéo 3'},
        {id: 'kH12QrSGedM', title: 'Vidéo 4'},
      ]
    }
  },
  methods: {
    addVideo(videoId, title = 'Nouvelle vidéo') {
      this.videosWithTitles.push({id: videoId, title})
    },

    removeVideo(index) {
      this.videosWithTitles.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.video-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dynamic-videos {
  margin: 40px 0;
}

.video-item {
  margin-bottom: 100px;
}

.video-grid {
  margin: 40px 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.grid-item {
  width: 100%;
}

h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .video-container {
    padding: 10px;
  }
}
</style>