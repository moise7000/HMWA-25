<template>
  <Navbar />

  <div class="text-center my-8">
    <h1 class="text-5xl font-semibold text-black mb-2">{{ title }}</h1>
    <p class="text-base text-black">{{ description }}</p>
  </div>

  <p>Hello from Heroo layout</p>
  <NuxtPage />
</template>

<script setup>

import { useRoute } from 'vue-router'
import Navbar from '~/components/common/Navbar.vue'

const route = useRoute()
const layoutProps = route.meta.layoutProps || {}

const title = layoutProps.title || ''
const description = layoutProps.description || ''

</script>
