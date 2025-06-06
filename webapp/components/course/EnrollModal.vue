<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
        <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>()
defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
