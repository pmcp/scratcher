<script setup>
// You might choose this based on an API call or logged-in status
const layout = "aside";
</script>

<template>
  <NuxtLayout :name="layout">
    <PocFlow />
  </NuxtLayout>
</template>