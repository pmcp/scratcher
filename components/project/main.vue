<script setup>
  const PlayerStore = usePlayerStore()
  const NodesStore = useNodesStore()
  const EdgesStore = useEdgesStore()
  const UiStore = useUiStore()
  const ProjectsStore = useProjectsStore()

</script>

<template>
  <ProjectDropzone/>
  <FlowMain class="w-full min-h-screen" :options="PlayerStore.defaultOptions" :edges="EdgesStore.all" :nodes="NodesStore.all"/>
  <div class="absolute bottom-8 flex w-full justify-center" v-if="!UiStore.draggingFiles">
    <div class="w-full max-w-2xl px-4">
      <div class="relative">
        <ProjectMenu class="absolute top-0 left-0">
          <ItemsList :items="NodesStore.all" :options="PlayerStore.defaultOptions"></ItemsList>
        </ProjectMenu>
      </div>

      <UiPane>

          <span v-if="ProjectsStore.activeProject">{{ ProjectsStore.activeProject.bpm}} Bpm</span>
          <span v-else>{{ ProjectsStore.defaultBpm}}</span>

      </UiPane>
    </div>
  </div>

</template>

<style>
/* TODO: Move to css */
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>