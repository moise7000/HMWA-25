<template>
  <div>
    <BreadCrumbs :breadcrumbs="breadcrumps" />
    <Hero :title="title" :description="description" />
    <Hero :subtitle="subtitleOne" />
    <Grid
        :articles="exercises"
        padding-side="35"
        min-width="200"
        :display-all="true"
    />
    <Hero :subtitle="subtitleTwo" />

    <div class="video-wrapper standard-padding">
      <div class="video-links">
        <p class="description standard-text">Here's some videos:</p>
        <div v-for="link in links" :key="link.name">
          <p>- <a :href="link.link" class="link standard-text">{{ link.name }}</a></p>
        </div>
      </div>
      <div class="image-wrapper">
        <img
            src="/assets/yoga_courses/yoga_course_0.png"
            alt="Yoga course illustration"
        />
      </div>
    </div>

    <Hero :subtitle="subtitleThree" />
    <Hero class="little-text" :description="safetyGuidelines" />

    <div class="container mx-auto p-6 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Safety & Guidelines</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Please read and follow these important safety guidelines to ensure a safe and enjoyable yoga experience.
        </p>
      </div>

      <!-- Safety Rules Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Safety Rules and Tips</h2>
        <SafetyGrid :items="safetyRules" />
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hero from "~/layouts/hero.vue"
import Grid from "~/components/common/grid.vue"
import BreadCrumbs from "~/components/common/bread-crumps.vue"
import SafetyGrid from '~/components/safety/SafetyGrid.vue'

// Page content
const title = "My title"
const description = "My description"

const breadcrumps = [
  {
    name: "About",
    link: "/about"
  },
  {
    name: "Practice at home",
    link: "/about/practice-at-home"
  }
]

const subtitleOne = "Exercises"
const subtitleTwo = "Videos"
const subtitleThree = "Safety guidelines"

const safetyGuidelines = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."

const exercises = [
  {
    description: "Downward Facing Dog - A foundational pose that strengthens and stretches",
    buttonDisplay: false,
    image: "/assets/exercices/downward_facing_dog.jpg"
  },
  {
    description: "Mountain Pose - Building strength and stability from the ground up",
    buttonDisplay: false,
    image: "/assets/yoga_courses/yoga_course_0.png"
  },
  {
    description: "Warrior Pose - Developing focus, strength and confidence",
    buttonDisplay: false,
    image: "/assets/yoga_courses/yoga_course_0.png"
  },
  {
    description: "Child's Pose - A restorative pose for rest and reflection",
    buttonDisplay: false,
    image: "/assets/yoga_courses/yoga_course_0.png"
  }
]

const links = [
  {
    name: "Morning Yoga Flow",
    link: "https://www.youtube.com/watch?v=example1"
  },
  {
    name: "Beginner's Guide to Yoga",
    link: "https://www.youtube.com/watch?v=example2"
  },
  {
    name: "Relaxation Meditation",
    link: "https://www.youtube.com/watch?v=example3"
  },
  {
    name: "Advanced Poses Tutorial",
    link: "https://www.youtube.com/watch?v=example4"
  }
]

const safetyRules = ref([
  {
    id: '1',
    icon: '⚠️',
    title: 'Listen to Your Body',
    description: 'Never force a pose or push through pain. Stop immediately if something doesn\'t feel right.'
  },
  {
    id: '2',
    icon: '🩹',
    title: 'Inform About Injuries',
    description: 'Always tell your instructor about any injuries or physical limitations before class begins.'
  },
  {
    id: '3',
    icon: '🤰',
    title: 'Pregnancy Precautions',
    description: 'If you\'re pregnant, inform the instructor and avoid poses that put pressure on your abdomen.'
  },
  {
    id: '4',
    icon: '💊',
    title: 'Medical Conditions',
    description: 'Consult your doctor before starting yoga if you have any medical conditions or concerns.'
  },
  {
    id: '9',
    icon: '💧',
    title: 'Stay Hydrated',
    description: 'Drink water before and after class, but avoid drinking too much during practice.'
  },
  {
    id: '10',
    icon: '🍽️',
    title: 'Avoid Heavy Meals',
    description: 'Wait at least 2-3 hours after eating a large meal before practicing yoga.'
  },
  {
    id: '11',
    icon: '🧘',
    title: 'Focus on Breathing',
    description: 'Maintain steady, deep breathing throughout your practice for better results.'
  },
  {
    id: '12',
    icon: '🏠',
    title: 'Practice Regularly',
    description: 'Consistency is key. Even short, regular sessions are better than long, infrequent ones.'
  }
])





// SEO Meta
useHead({
  title: 'Safety & Guidelines - Yoga Studio',
  meta: [
    {
      name: 'description',
      content: 'Important safety rules and guidelines for yoga practice. Learn how to practice safely and get the most out of your yoga sessions.'
    }
  ]
})
</script>

<style scoped>
.video-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
  align-items: center;
}

.video-links {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 10%;
  width: 50%;
}

.link {
  text-decoration: underline;
  transition: color 0.2s ease;
}

.link:hover {
  color: #555;
}

.image-wrapper {
  width: 50%;
}

.image-wrapper img {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

/* Responsive design */
@media (max-width: 768px) {
  .video-wrapper {
    flex-direction: column;
    gap: 1rem;
  }

  .video-links,
  .image-wrapper {
    width: 100%;
  }

  .video-links {
    margin-left: 0;
  }
}
</style>