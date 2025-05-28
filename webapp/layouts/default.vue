<template>
  <div>
    <Navbar />
    <main class="p-4">
      <NuxtPage />
    </main>
	<Footer />
  </div>
</template>

<script setup>

import Navbar from '~/components/common/navbar.vue'
import Footer from '~/components/common/nav-footer.vue'

</script>
