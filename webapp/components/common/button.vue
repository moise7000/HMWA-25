<template>
  <NuxtLink :to="url" :class="[classType, 'default']">
    <slot />
  </NuxtLink>
</template>

<script setup>

import { computed } from "vue"

const props = defineProps({
	url : {type : String, required : false, default : '/'},
	classTypeInt : {type : Number, required : false, default : 1}
})

const classType = computed(() => `variant-${props.classTypeInt}`)

</script>

<style scoped>

.variant-1 {
  color: #ffffff;
  background: #000000;
}

.variant-1:hover {
  background: #111111;
  transform: translateY(-1px);
}

.variant-2 {
  color: #000000;
  background: #ffffff;
  border : 2px solid;
}

.variant-2:hover {
  background: #eeeeee;
  transform: translateY(-1px);
}

.default:hover {
  transform: translateY(-1px);
}

.default:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3);
}

.default {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background 0.2s ease, transform 0.15s ease;
}

</style>