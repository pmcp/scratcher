<template>
  <div v-if="projects.length > 0" v-for="project in projects" :key="project">
    <nuxt-link :to="`projects/${project}`">
      {{ project }}
    </nuxt-link>
  </div>
  <div v-else>
    No projects yet
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Array,
    default: []
  }
})
</script>