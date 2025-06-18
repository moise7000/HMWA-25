<template>
	<input :type = "password ? 'password' : 'text'" :placeholder = "placeholder" :value = "modelValue" @input = "$emit('update:modelValue', $event.target.value)" class = "email-phone-input"/>
</template>

<script setup>

const props = defineProps({
	modelValue : {type : String, default : ''},
	placeholder : {type : String, default : ''},
	password : {type : Boolean, default  : false}
})

defineEmits(['update:modelValue'])

</script>

<style scoped>

input {
	width : 100% ;
	padding : 10px 12px ;
	font-size : 16px ;
	border : 1px solid #ccc ;
	border-radius : 4px ;
	outline : none ;
	transition : border-color 0.2s ;
}

.email-phone-input:focus {
	border-color : #007bff ;
}

</style>