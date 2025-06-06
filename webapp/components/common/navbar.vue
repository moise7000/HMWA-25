<template>
	<nav class="navbar">
		<div class="navbar-brand">
			<NuxtLink to="/" class="nav-link">Yoga center</NuxtLink>
		</div>

		<button class="nav-toggle" @click="isOpen = !isOpen">☰</button>

		<div :class="['nav-links', {open: isOpen}]">
			<div v-for="linkGroup in linkGroups" :key="linkGroup.category" class="nav-item" @mouseenter="hover = linkGroup.category" @mouseleave="hover = ''">
				<NuxtLink :to="linkGroup.main.path" class="nav-link" @click="closeMenu">{{linkGroup.main.name}}</NuxtLink>
				<div v-if="hover === linkGroup.category && linkGroup.sides.length" class="dropdown-menu">
					<NuxtLink v-for="link in linkGroup.sides" :key="link.name" :to="link.path" class="dropdown-link">{{link.name}}</NuxtLink>
				</div>
			</div>
      <NuxtLink to="/auth/signin" class="sign-button default variant-1" @click="closeMenu">Sign In</NuxtLink>
		</div>

	</nav>
</template>

<script setup>

import { ref } from 'vue'

const isOpen = ref(false)
const hover = ref('')

function closeMenu() {
	isOpen.value = false
}

const linkGroups = [
	{
		category : "Courses",
		main : {name : 'Couses and Subscriptions', path : '/courses-and-subscriptions'},
		sides : [
			{name : 'Courses', path : '/courses-and-subscriptions/courses'},
 			{name : 'Subscriptions', path : '/courses-and-subscriptions/subscriptions'}
		]
	}, {
		category : "Events",
		main : {name : 'Events', path : '/events'},
		sides : []
	}, {
		category : "Insitute",
		main : {name : 'Insitute', path : '/institute'},
		sides : [
			{name : 'Our story', path : '/institute/story'},
			{name : 'The Team', path : '/institute/teachers'},
			{name : 'Where to find us', path : '/institute/location'},
	 		{name : 'Opening hours', path : '/institute/opening-hours'}
		]
	}, {
		category : "About",
		main : {name : 'About', path : '/about'},
		sides : [
			{name : 'Benefits of yoga', path : '/about/benefits'},
			{name : 'Yoga equipments', path : '/about/equipments'},
			{name : 'Practice at home', path : '/about/practice-at-home'},
			{name : 'Articles', path : '/about/articles'},
		]
	}, {
		category : "Contact",
		main : {name : 'Contact', path : '/institute/contact'},
		sides : []
	}
]

</script>

<style scoped>

.navbar {
	background-color : white ;
	padding : 40px 80px ;
	display : flex ;
	align-items : center ;
	justify-content : space-between ;
	font-weight : 600 ;
	position : relative ;
	z-index : 10 ;
}

.navbar-brand {
	font-size : 2rem ;
	color : #2d3748 ;
}

.nav-links {
	font-size : 1.25rem ;
	display : flex ;
	gap : 40px ;
	align-items : center ;
}

.nav-item {
	position : relative ;
}

.nav-link {
	text-decoration : none ;
	color : #4a5568 ;
	transition : color 0.2s ease ;
}

.nav-link :hover {
	color : #3182ce ;
}

.dropdown-menu {
	position : absolute ;
	top : 100% ;
	left : 0 ;
	background-color : white ;
	display : flex ;
	flex-direction : column ;
	padding : 10px 0 ;
	box-shadow : 0 2px 8px rgba(0, 0, 0, 0.1) ;
	z-index : 9 ;
}

.dropdown-link {
	padding : 8px 20px ;
	white-space : nowrap ;
}

.dropdown-link :hover {
	background-color : #f7fafc ;
}

.nav-toggle {
	display : none ;
}

@media (max-width : 768px) {
	.navbar {
		padding : 20px ;
	}
	.nav-toggle {
		display : block ;
		background : none ;
		border : none ;
		font-size : 1.5rem ;
		cursor : pointer ;
		color : #4a5568 ;
		z-index : 11 ;
	}
	.nav-links {
		display : none ;
		flex-direction : column ;
	}
	.nav-links.open {
		display : flex ;
		position : fixed ;
		top : 0 ;
		left : 0 ;
		width : 100vw ;
		height : 100vh ;
		background-color : white ;
		justify-content : center ;
		align-items : center ;
		gap : 30px ;
	}
	.nav-links .nav-item {
		width : 100% ;
		text-align : center ;
	}
	.dropdown-menu {
		display : none !important ;
	}
}


.default {
  display: block;

  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.375rem;
  transition: background 0.2s ease, transform 0.15s ease;
}

.default:hover {
  transform: translateY(-1px);
}

.default:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3);
}

.variant-1 {
  color: #ffffff;
  background: #000000;
}

.variant-1:hover {
  background: #111111;
}



</style>