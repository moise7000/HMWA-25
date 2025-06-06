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

<script setup lang="ts">
import YouTubeEmbed from '~/components/video/YoutubeEmbed.vue'
import { useVideos } from '~/scripts/video/youtubeEmbedGridLogic'

const { videosWithTitles, addVideo, removeVideo } = useVideos()
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