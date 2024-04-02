<template>
  <div v-if="userTeams.length > 0" v-for="team in userTeams" :key="team.id">
    <TeamsProjects :projects="team.projects" />
  </div>
  <div v-else>
    No teams yet
  </div>
</template>

<script setup>
const teamsStore = useTeamsStore()

const userTeams = computed(() => teamsStore.all);
</script>