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
import { ref } from 'vue'
import FaqItem from '~/components/faq/FaqItem.vue'

// FAQ data
const faqs = ref([
  {
    question: 'What types of yoga classes do you offer?',
    answer: 'We offer a variety of classes including Hatha, Vinyasa, Yin, Restorative, and Prenatal Yoga. Each class is designed to suit different levels and needs—from beginners to advanced practitioners.',
    isOpen: false
  },
  {
    question: 'Do I need to bring my own mat and equipment?',
    answer: 'You are welcome to bring your own mat, but we also provide mats, blocks, straps, and blankets free of charge for all our students.',
    isOpen: false
  },
  {
    question: ' I\'m new to yoga. Which class should I start with?',
    answer: 'We recommend starting with our Beginner or Gentle Hatha Yoga class. These sessions are slower-paced and focus on foundational poses and breathing techniques.',
    isOpen: false
  },
  {
    question: 'What should I wear to a yoga class?',
    answer: 'Wear comfortable, breathable clothing that allows for a full range of movement. Bare feet are best for grip and stability on the mat.',
    isOpen: false
  }
])

// Toggle FAQ accordion
const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>