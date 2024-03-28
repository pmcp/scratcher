<script setup>
import { Handle, useHandleConnections, VueFlow, useVueFlow, Position, useNodesData,  } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'
// useVueFlow provides access to the event handlers
const {
  onNodeDragStart,
  onNodeDrag,
  onNodeDragStop,
  onNodeClick,
  onNodeDoubleClick,
  onNodeContextMenu,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onNodeMouseMove,
  onConnect,
  addEdges,
  onPaneReady
} = useVueFlow()

const props = defineProps({
  options:{
    type:Object,
    required:true
  },
  nodes:{
    type: Array,
  },
  edges:{
    type: Array,
  }
})

// logic
onPaneReady(({ fitView }) => {
  fitView()
})

onConnect((connection) => {
  addEdges(connection)
})

onMounted(() => {
  // onNodeClick((event) => {
  //   console.log('Node clicked', event, `${event.node.type}-${event.node.id}`)
  // })
  const theNodes = props.nodes
  console.log(theNodes)
})


</script>



<template>
  <VueFlow :nodes="props.nodes">

    <template :key="id" #node-song-default="{id, data }">
      <Handle type="target" :position="Position.Left" :on-connect="onConnect" />
      <player v-if="data.src" :data="data" class="w-96" :src="data.src" :options="props.options" :id="id" />
      <Handle type="source" :position="Position.Right"  />
    </template>
    <Background />
    <MiniMap />
    <Controls />
    <PocControls />
  </VueFlow>

</template>

<style>
@import '/assets/style/main.css';
</style>