<template>
	<div class="text-2xl">Hello world</div>
	<Form />
</template>

<script setup>

import Form from "~/components/common/form.vue"

const inputs = [{placeholder : 'Email', password : false}, {placeholder : 'Pwd', password : true}]

</script>