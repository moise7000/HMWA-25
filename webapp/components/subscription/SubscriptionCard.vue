<template>
  <div>
    <div
      class="flex items-center justify-between py-6 cursor-pointer hover:opacity-90 transition-opacity"
      @click="goToDetails"
    >
      <div class="w-1/3 font-medium text-gray-900">
        <span v-if="subscription.max_classes_per_period">
          {{ subscription.max_classes_per_period }} courses
        </span>
        <span v-else>Unlimited courses</span>
      </div>

      <div class="w-1/3 text-center italic text-gray-600 line-clamp-1">
        {{ subscription.description }}
      </div>

      <div class="w-1/3 text-right font-semibold text-gray-900">
        ${{ subscription.price }}
      </div>
    </div>

    <hr v-if="!isLast" class="border-gray-300" />
  </div>
</template>

<script setup lang="ts">
import type { Subscription } from '~/types/subscription'

const props = defineProps<{
  subscription: Subscription
  isLast?: boolean
}>()

const router = useRouter()

const goToDetails = () => {
  const slug = props.subscription.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
  router.push(`/courses-and-subscriptions/subscriptions/${slug}`)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
