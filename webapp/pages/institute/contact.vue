<template>
  <BreadCrumps :breadCrumps="breadCrumps" />
  <Hero :title="title" :description="description" />
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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

const title = "Need a hand? "
const description = ""

const breadCrumps = [{
  name: "Institute",
  link: "/institute"
}, {
  name: "Contact",
  link: "/institute/contact"
}]
</script>