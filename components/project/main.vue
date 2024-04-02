<script setup>
import {useVueFlow} from "@vue-flow/core";

const PlayerStore = usePlayerStore()
const NodesStore = useNodesStore()
const EdgesStore = useEdgesStore()



onMounted(() => {
// On Drag Over: show Dropzone
  useEventListener(document, 'dragenter', (e) => {
    if(dragging.value === true) return;
    draggingFiles.value = Object.values(e.dataTransfer.items).length
    dragging.value = true;
  })

  useEventListener(filesDropzone, 'dragleave', (e) => {
    if(dragging.value === false) return;
    dragging.value = false
  })

})

// UI

const filesDropzone = ref(null)
const dragging = ref(false)
const draggingFiles = ref([])


</script>

<template>
<!--  <pre>{{ NodesStore.all }}</pre>-->
  <FlowMain class="w-full min-h-screen" :options="PlayerStore.defaultOptions" :edges="EdgesStore.all" :nodes="NodesStore.all"/>
  <div class="absolute bottom-8 flex w-full justify-center">
    <div class="w-full max-w-2xl px-4">
      <UiPane>
        <div class="w-full flex justify-right pr-6">
          <UiLed :type="3"/>
        </div>
      </UiPane>
    </div>
  </div>
  <PocDropzone ref="filesDropzone" v-if="dragging" :files="draggingFiles"/>
</template>

<style>
/* TODO: Move to css */
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
</style>