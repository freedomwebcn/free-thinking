<template>
    <div>author ------ {{ route.params.id }}</div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id);  
</script>