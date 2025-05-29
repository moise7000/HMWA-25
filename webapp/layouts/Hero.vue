<template>
	<div class="wrapper">
		<h1 class="title main-title" v-html="title" />
		<p class="description standard-text" v-html="description" />
	</div>
</template>

<script setup>

defineProps({
	title: String,
	description: String
})

</script>

<style scoped>

.wrapper {
  text-align: center;
  margin: 2rem 0;
  width : 100%
}

.title {
  color: #000;
  margin-bottom: 0.5rem;
  padding-bottom : 30px ;
}

.description {
  color: #000;
  padding-bottom : 30px ;
}

</style>