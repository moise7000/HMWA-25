<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description" />
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm />
        <FaqSection />
      </div>
    </div>
  </div>
</template>

<script setup>
import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import ContactForm from '~/components/contact/ContactForm.vue'
import FaqSection from '~/components/contact/FaqSection.vue'
import {useContactPage} from "~/composables/useContactPage.js";

const {
  title,
  description,
  breadCrumps,
} = useContactPage()

useSeoMeta({
  title: title,
  description: description
})
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>