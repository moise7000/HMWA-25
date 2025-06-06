<template>
  <div class="youtube-embed" :style="containerStyle">
    <iframe
        :src="embedUrl"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        :width="width"
        :height="height"
        loading="lazy"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { buildEmbedUrl, getContainerStyle } from '~/scripts/video/youtubeEmbedLogic'

const props = defineProps({
  videoId: { type: String, required: true },
  width: { type: [String, Number], default: '560' },
  height: { type: [String, Number], default: '315' },
  autoplay: { type: Boolean, default: false },
  mute: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  start: { type: Number, default: null },
  end: { type: Number, default: null },
  title: { type: String, default: 'YouTube video player' },
  responsive: { type: Boolean, default: false },
  borderRadius: { type: [String, Number], default: '0' }
})

const embedUrl = computed(() =>
    buildEmbedUrl({
      videoId: props.videoId,
      autoplay: props.autoplay,
      mute: props.mute,
      loop: props.loop,
      start: props.start,
      end: props.end
    })
)

const containerStyle = computed(() =>
    getContainerStyle(props.borderRadius, props.responsive)
)
</script>



<style scoped>

.youtube-embed {
  display: inline-block;
}

.youtube-embed iframe {
  max-width: 100%;
  display: block;
}

/* Style responsive */
.youtube-embed[style*="position: relative"] iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
/* Shadow + border radius */
.youtube-embed {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  overflow: hidden;
}

/* Hover effect */
.youtube-embed {
  transition: transform 0.2s ease;
}

.youtube-embed:hover {
  transform: scale(1.02);
}
</style>