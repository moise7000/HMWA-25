<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>

    <div class="space-y-6">
      <FaqItem
          v-for="(faq, index) in faqs"
          :key="index"
          :question="faq.question"
          :answer="faq.answer"
          :is-open="faq.isOpen"
          @toggle="toggleFaq(index)"
      />
    </div>
  </div>
</template>

<script setup>
import FaqItem from '~/components/faq/FaqItem.vue'
import { useFaq } from '~/scripts/contact/faqSectionLogic'

const { faqs, toggleFaq } = useFaq()
</script>
