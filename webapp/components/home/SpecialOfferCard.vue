<template>
  <div class="special-offer-card" :class="{ 'clickable': linkTo }" @click="handleClick">
    <div class="image-container">
      <img
          :src="imageUrl"
          :alt="imageAlt"
          class="offer-image"
      />
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecialOfferCard',
  props: {
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
    },
    imageAlt: {
      type: String,
      default: 'Personne faisant du yoga'
    },
    title: {
      type: String,
      default: 'Special offer'
    },
    description: {
      type: String,
      default: 'Body text for whatever you\'d like to add more to the subheading.'
    },
    linkTo: {
      type: [String, Object],
      default: null
    },
    external: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.linkTo) return;

      if (this.external) {
        // Lien externe
        window.open(this.linkTo, '_blank');
      } else {
        // Navigation Nuxt
        this.$router.push(this.linkTo);
      }
    }
  }
}
</script>

<style scoped>
.special-offer-card {
  max-width: 400px;
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.special-offer-card.clickable {
  cursor: pointer;
}

.special-offer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.offer-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: none;
  transition: transform 0.3s ease;
}

.special-offer-card:hover .offer-image {
  transform: scale(1.05);
}

.content {
  padding: 24px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.description {
  font-size: 16px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .special-offer-card {
    max-width: 100%;
    margin: 0;
  }

  .content {
    padding: 20px;
  }

  .title {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }
}
</style>