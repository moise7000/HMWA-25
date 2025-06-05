<template>
  <Hero :title="title" :description="description" />
</template>

<script setup>

import Hero from "~/layouts/hero.vue";
const title="Home"
const description="Welcome"
</script>