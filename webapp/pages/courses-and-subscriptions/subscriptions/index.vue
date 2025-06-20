<template>
  <div>
    <BreadCrumps :breadCrumps="breadCrumps" />
    <Hero :title="title" :description="description" />

    <div class="subscription-image-wrapper animate-fade-in">
      <img
        src="/assets/subscriptions/hero_subscription.jpeg"
        alt="Subscriptions Banner"
        class="w-full h-64 object-cover rounded-lg"
      />
    </div>

    <div class="container mx-auto px-4 lg:px-8 max-w-4xl">
      <SubscriptionCard
        v-for="(sub, idx) in subscriptions"
        :key="sub.id"
        :subscription="sub"
        :is-last="idx === subscriptions.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Hero from '~/layouts/hero.vue'
import BreadCrumps from '~/components/common/bread-crumps.vue'
import SubscriptionCard from '~/components/subscription/SubscriptionCard.vue'
import { useSubscriptions } from '~/managers/subscriptionManager'
import type { Subscription } from '~/types/subscription'

const title = 'Subscriptions'
const description = 'Discover our subscriptions'

const breadCrumps = [
  { name: 'Courses and Subscriptions', link: '/courses-and-subscriptions' },
  { name: 'Subscriptions', link: '/courses-and-subscriptions/subscriptions' },
]

const subscriptions = ref<Subscription[]>([])
const { getActiveSubscriptions } = useSubscriptions()

onMounted(async () => {
  subscriptions.value = await getActiveSubscriptions()
})
useSeoMeta({
  title: title,
  description: description
})
</script>

<style scoped>
.subscription-image-wrapper {
  margin: 2rem 0;
}
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
