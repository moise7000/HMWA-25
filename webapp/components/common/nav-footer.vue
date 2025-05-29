<template>
	<footer class="footer">
		<div class="nav-links">
			<div class="grid">
				<div class="column" v-for="(column, index) in links" :key="index">
					<NuxtLink v-for="(link, index) in column" :key="link.path" :to="link.path" class="nav-link">{{ link.name }}</NuxtLink>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>

const links = [[
		{name : 'Couses', path : '/courses-and-subscriptions'}, 
		{name : 'Courses types', path : '/courses-and-subscriptions/courses'}, 
		{name : 'Subscriptions', path : '/courses-and-subscriptions/subscriptions'}
	], [
		{name : 'Events', path : '/events'}
	], [
		{name : 'Insitute', path : '/institute'}, 
		{name : 'Our story', path : '/institute/story'}, 
		{name : 'The Team', path : '/institute/teachers'}, 
		{name : 'Where to find us', path : '/institute/location'}, 
		{name : 'Opening hours', path : '/institute/opening-hours'}, 
	], [
		{name : 'About', path : '/about'}, 
		{name : 'Benefits of yoga', path : '/about/benefits-of-yoga'}, 
		{name : 'Yoga equipments', path : '/about/equipments'}, 
		{name : 'Practice at home', path : '/about/practice-at-home'},
	], [
		{name : 'Sign up', path : '/sing-up'}, 
		{name : 'Sign in', path : '/sing-in'}, 
		{name : 'Language', path : '/language'}, 
		{name : 'Search', path : '/search'}, 
		{name : 'Contact', path : '/contact'}, 
]]

</script>

<style scoped>

.footer {padding-top: 30px;}

.nav-links {width: 100% ;}

.grid {display: flex; flex-direction : row; width : 100% ; justify-content : flex-end ;}

.column {display: flex; flex-direction : column ; padding: 10px; width: 12%;}

.nav-link {
	font-size: 1.25rem;
	padding-bottom: 20px; 
	text-decoration: none;
	color: #4a5568; /* gris moyen */
	transition: color 0.2s ease;
	font-weight: 500;
}

.nav-link:hover {color: #3182ce;}

</style>