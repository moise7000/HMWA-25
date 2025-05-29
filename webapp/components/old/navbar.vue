<template>
  <nav class="navbar">
	<div class="navbar-brand">
	  <NuxtLink to="/" class="nav-link">Yoga center</NuxtLink>
	</div>
	<div class="nav-links">
	  <NuxtLink to="/courses-and-subscriptions" class="nav-link">Courses & Subscriptions</NuxtLink>
	  <NuxtLink to="/events" class="nav-link">Events</NuxtLink>
	  <NuxtLink to="/institute" class="nav-link">Institute</NuxtLink>
	  <NuxtLink to="/about" class="nav-link">About Yoga</NuxtLink>
	  <NuxtLink to="/institute/contact" class="nav-link">Contact</NuxtLink>
	  <NuxtLink to="/" class="nav-link">[Empty]</NuxtLink>
	</div>
  </nav>
</template>

<script setup>
// Aucun script nécessaire pour le moment
</script>

<style scoped>

.navbar {
  background-color: white;
/*  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);*/
  padding: 40px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.navbar-brand {
  font-size: 2rem;
  color: #2d3748; /* gris foncé */
}

.nav-links {
  font-size: 1.25rem;
  display: flex;
  gap: 60px;
}

.nav-link {
  text-decoration: none;
  color: #4a5568; /* gris moyen */
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #3182ce;
}
</style>
