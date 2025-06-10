<script setup lang="ts">

import BaseButton from "~/components/common/BaseButton.vue";
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

        <BaseButton
            url="/courses-and-subscriptions/courses"
            :variant="3"
        >
          See all courses
        </BaseButton>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>