<template>
  <div class="bg-white rounded-lg p-6 shadow-sm border">
    <!-- Quote icon -->


    <!-- Feedback text -->
    <div class="mb-6">
      <p class="text-gray-800 font-medium text-sm leading-relaxed">
        "{{ feedback.comment }}"
      </p>
    </div>

    <!-- User info -->
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <img
            v-if="feedback.user?.avatar_url"
            :src="feedback.user.avatar_url"
            :alt="feedback.user.full_name || 'User'"
            class="w-12 h-12 rounded-full object-cover"
        />
        <div
            v-else
            class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg"
        >
          {{ getInitials(feedback.user?.full_name || 'Anonymous') }}
        </div>
      </div>
      <div class="ml-4">
        <h4 class="text-gray-900 test-xs font-semibold">
          {{ feedback.user?.full_name || 'Anonymous' }}
        </h4>
        <p class="text-gray-500 text-xs">
          {{ formatDate(feedback.created_at || feedback.updated_at) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserFeedback {
  id: string
  comment: string
  created_at?: string
  updated_at?: string
  user?: {
    id: string
    full_name?: string
    avatar_url?: string
  }
}

interface Props {
  feedback: UserFeedback
}

const props = defineProps<Props>()

const getInitials = (name: string): string => {
  return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}
</script>