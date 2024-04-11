<template>
  <ProjectMain />
</template>


<script setup>
const route = useRoute()
const flowStore = useFlowStore()
await flowStore.getProject(route.path)
</script>

<style>
@import '/assets/styles/main.css';
</style>