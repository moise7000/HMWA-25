<template>
  <div class="border-b border-gray-200 pb-6 last:border-b-0">
    <button
        @click="$emit('toggle')"
        class="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 -m-2"
    >
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">{{ question }}</h3>
        <svg
            :class="['w-5 h-5 text-gray-500 transition-transform', { 'rotate-180': isOpen }]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-96"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 max-h-96"
        leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="mt-4 overflow-hidden">
        <p class="text-gray-600 leading-relaxed">{{ answer }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>