<template>
  <NuxtLayout />
</template>

<script setup lang="ts">
const client = useSupabaseClient()
</script>

<style>

.main-title {
	font-size : 4rem ;
	font-weight : 600 ;
}

.standard-text {
	font-size : 1.3rem ;
}

</style>