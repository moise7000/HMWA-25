<template>
  <div class="container mx-auto px-4 lg:px-12 max-w-6xl py-16 animate-fade-in">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-24">Loading…</div>

    <div v-else-if="error" class="text-center text-red-600 py-24">
      {{ error.message }}
    </div>

    <div v-else-if="!subscription" class="text-center py-24">
      Subscription not found
    </div>

    <div v-else class="space-y-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 class="text-4xl font-extrabold mb-8">{{ subscription.name }}</h1>

          <ul class="space-y-2 mb-10">
            <li
              v-for="(course, idx) in courses"
              :key="idx"
              class="text-sm font-medium"
            >

              <BaseButton
                  :url="`/courses-and-subscriptions/courses/${createSlug(course.title)}`"
                  :variant="5"
              >
                {{ course.title }}
              </BaseButton>

            </li>
          </ul>

          <button
            class="w-48 border border-gray-900 rounded-md py-3 font-medium hover:bg-gray-50 transition"
          >
            Contact
          </button>
        </div>

        <div class="space-y-8">
          <div
            class="border rounded-lg p-6 flex flex-col gap-3 lg:w-[360px]"
          >
            <p class="text-xs uppercase tracking-widest text-gray-500">
              {{ formatType(subscription.type) }}
            </p>
            <p class="text-3xl font-bold">
              $ {{ subscription.price.toFixed(2) }}
            </p>
            <p class="text-xs text-gray-600">Cancel anytime, no fee</p>
          </div>

          <button
            class="w-[160px] bg-gray-900 text-white rounded-md py-3 font-medium hover:opacity-90 transition"
          >
            Continue
          </button>
        </div>
      </div>

      <hr class="border-gray-300" />

      <div class="text-center space-y-10">
        <h2 class="text-5xl font-extrabold">How it's work</h2>

        <div class="space-y-6 max-w-3xl mx-auto text-sm leading-relaxed text-gray-800">
          <p v-for="n in 1" :key="n">
            All plans are structured as tiered, recurring memberships that grant you ongoing access to our yoga classes. Each subscription lets you tap into our course library for a set duration (one month, three months or one year) and offers either a capped-frequency option (up to three live classes per week) or fully unlimited class access, with pricing scaled accordingly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSubscriptions } from '~/managers/subscriptionManager'
import type { Subscription } from '~/types/subscription'
import BaseButton from "~/components/common/BaseButton.vue";

const route = useRoute()
const { getActiveSubscriptions, getCoursesForSubscription } = useSubscriptions()

const subscription = ref<Subscription | null>(null)
const loading = ref(true)
const error = ref<Error | null>(null)
const courses = ref<any[]>([])

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

const formatType = (t: string) =>
  t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()

onMounted(async () => {
  try {
    const list = await getActiveSubscriptions()
    const slug = route.params.subscription as string

    subscription.value = list.find(
      (s) => createSlug(s.name) === slug,
    ) || null

    if (subscription.value) {
      const courseList = await getCoursesForSubscription(subscription.value.id)
      courses.value = courseList
    }

  } catch (err: any) {
    error.value = err
  } finally {
    loading.value = false
  }
})

useHead(() => ({
  title: subscription.value ? `${subscription.value.name} – Subscription` : 'Subscription',
}))
</script>

<style scoped>
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
