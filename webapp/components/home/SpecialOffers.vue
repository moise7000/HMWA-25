<script setup lang="ts">

import SpecialOfferCard from "~/components/home/SpecialOfferCard.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <SpecialOfferCard

        imageUrl="/public/assets/yoga_courses/yoga_course_22.png"

        title="Special offer"
        description="- 10% for your first course in the center "
        linkTo="/courses-and-subscriptions/courses"
    />

    <SpecialOfferCard

        imageUrl="/public/assets/yoga_courses/yoga_course_24.png"

        title="Special offer"
        description="- 30% on your first month of subscription "
        linkTo="/courses-and-subscriptions/subscriptions"
    />

    <SpecialOfferCard

        imageUrl="/public/assets/yoga_courses/yoga_course_25.png"

        title="Special offer"
        description="- 20% for your first yoga equipment with the code HYPERMEDIA25"
        linkTo="/about/equipments"
    />
  </div>

</template>

