<template>
  <ProjectMain />
</template>


<script setup>
const route = useRoute()
const flowStore = useFlowStore()
await flowStore.getProject(route.path)
</script>