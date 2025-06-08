<template>
  <div
      class="benefit-card border rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-200"

  >
    <!-- Icône du benefit -->
    <div class="mb-4">
      <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <slot name="icon">

          <span v-if="icon" class="text-2xl">{{ icon }}</span>
          <!-- Sinon, icône SVG par défaut -->
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
          </svg>
        </slot>
      </div>
    </div>

    <!-- Informations du benefit -->
    <div class="space-y-3">
      <!-- Titre -->
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-600 line-clamp-3">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BenefitCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>
.benefit-card {
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 350px;
}

.benefit-card:hover {
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>