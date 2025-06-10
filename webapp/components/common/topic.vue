<template>
  <div class="topic-card standard-padding">
    <div class="image-wrapper" v-if="side">
      <img :src="imagePath" :alt="topicTitle" />
    </div>
    <div class="content">
      <h2 class="title main-title">{{topicTitle}}</h2>
      <p class="description standard-text">{{topicDescription}}</p>
      <BaseButton
          :url="linkPath"
          :variant="4"
      >
        <em>{{linkText}}</em>
      </BaseButton>



    </div>
    <div class="image-wrapper" v-if="!side">
      <img :src="imagePath" :alt="topicTitle" />
    </div>
  </div>
</template>

<script setup>
import {createSlug} from "~/scripts/article/articleCardLogic.js";
import BaseButton from "~/components/common/BaseButton.vue";

defineProps({
  imagePath: { type: String, required: true },
  topicDescription: { type: String, required: false, default: 'No description provided.' },
  linkPath: { type: String, required: false, default: '/' },
  topicTitle: { type: String, required: true, default: 'No title provided' },
  side: { type: Boolean, required: false, default: false },
  noLink: { type: Boolean, required: false, default: false },
  linkText: { type: String, required: false, default: 'Read more' }
});
</script>

<style scoped>
.topic-card {
  display: flex;
  align-items: stretch;
  width: 100%;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.title {
  margin-bottom: 1rem;
}

.description {
  line-height: 1.6;
  margin: 1.5rem;
}

.link {
  font-size: 1.7rem;
  text-decoration: underline;
  color: #1a1a1a;
  cursor: pointer;
}

.link:hover {
  color: #555;
}

.image-wrapper {
  width: 50%;
}

img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .topic-card {
    flex-direction: column;
  }

  .image-wrapper {
    width: 100%;
    order: -1; /* Met l'image en premier sur mobile */
  }

  .content {
    padding: 20px 15px;
  }

  .description {
    margin: 1rem 0;
  }

  .link {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .description {
    margin: 0.75rem 0;
  }

  .link {
    font-size: 1.2rem;
  }
}
</style>