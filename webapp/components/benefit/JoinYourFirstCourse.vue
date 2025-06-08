<script setup lang="ts">

</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

      <!-- Image Container -->
      <div class="relative group">
        <img
            src="public/assets/yoga_courses/yoga_course_13.png"
            alt="Cours de yoga "
            class="w-full h-auto rounded-xl  object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
        />


      </div>

      <div class="lg:pl-8 text-center ">
        <h1 class="text-4xl sm:text-xl lg:text-6xl  text-gray-900 leading-tight tracking-tight mb-6">
          Join your first course
        </h1>

        <p class="text-center sm:text-xl text-gray-600  mb-8 ">
          Discover our complete collection of yoga courses.
        </p>

        <NuxtLink
            to="/courses-and-subscriptions/courses"
            class="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-800 active:bg-gray-900 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          See all courses
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>