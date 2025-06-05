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

<script>
export default {
  name: 'YouTubeEmbed',
  props: {
    videoId: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: '560'
    },
    height: {
      type: [String, Number],
      default: '315'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    mute: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    },
    start: {
      type: Number,
      default: null
    },
    end: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: 'YouTube video player'
    },
    responsive: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: [String, Number],
      default: '0'
    }
  },
  computed: {
    embedUrl() {
      let url = `https://www.youtube.com/embed/${this.videoId}?`
      const params = []

      if (this.autoplay) params.push('autoplay=1')
      if (this.mute) params.push('mute=1')
      if (this.loop) params.push('loop=1&playlist=' + this.videoId)
      if (this.start) params.push(`start=${this.start}`)
      if (this.end) params.push(`end=${this.end}`)

      return url + params.join('&')
    },
    containerStyle() {
      const baseStyle = {
        borderRadius: typeof this.borderRadius === 'number' ?
            `${this.borderRadius}px` : this.borderRadius,
        overflow: 'hidden' // Important pour que le border-radius fonctionne
      }

      if (this.responsive) {
        return {
          ...baseStyle,
          position: 'relative',
          paddingBottom: '56.25%', // Ratio 16:9
          height: 0
        }
      }
      return baseStyle
    }
  }
}
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