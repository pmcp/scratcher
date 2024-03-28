<script setup>
import {useVueFlow} from "@vue-flow/core";

const PlayerStore = usePlayerStore()
const NodesStore = useNodesStore()
const EdgesStore = useEdgesStore()
const UiStore = useUiStore()

</script>

<template>
  <scratchPad class="w-full min-h-screen" :options="PlayerStore.defaultOptions" :edges="EdgesStore.all" :nodes="NodesStore.all"/>
</template>


<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>