<script setup>
import { Handle, useHandleConnections, VueFlow, useVueFlow, Position, useNodesData,  } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
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
  addEdges
} = useVueFlow()

import { Background } from '@vue-flow/background'


// PLAYER
const options = ref({
  height: 160,
  progressColor: '#e03639',
  waveColor: '#e7e7e7',
  cursorColor: '#FFDDDD',
  barWidth: 6,
  barGap: 1,
  barRadius: 8,
  barAlign: 'center',
  mediaControls: false,
  backend: 'MediaElement',
  scrollParent:true,
  interact: true,
  // normalize: true,
  minPxPerSec: 60,
  autoCenter: true,
  autoScroll: true,
  hideScrollbar: true,
  audioRate: 1, // set the initial playback rate
  xhr: {
    mode: 'no-cors'
  }
})



// FLOW

const nodesRefs = ref([]);



const els = elements.value
onConnect((connection) => {
  addEdges(connection)
})


elements.value = elements.value.map((node) => ({ ...node, hidden: true }))
  onMounted(() => {
    onNodeClick((event) => {
      console.log('Node clicked', event, `${event.node.type}-${event.node.id}`)
      // elements.value.autoplay = true
      // const player = ref(event.node.id)
      // console.log(this.$refs)

      console.log(nodesRefs)
      // const all = nodesRefs.value;
      // const activeNode = all.filter(x => x.id === event.node.id)
      // console.log(all)


  })




})



</script>

<template>

  <VueFlow v-model="els" class="" >
    <template #node-song-default="{id, data }">
<!--      <NodeToolbar :is-visible="data.toolbarVisible" :position="data.toolbarPosition">-->
<!--        <button>delete</button>-->
<!--        <button>copy</button>-->
<!--        <button>expand</button>-->
<!--      </NodeToolbar>-->

      <Handle type="target" :position="Position.Left" :on-connect="onConnect" />
        <player :src="data.src" :options="data.playerOptions" :id="id" />
      <Handle type="source" :position="Position.Right"  />
    </template>
    <template #node-resizable="resizableNodeProps">
<!--      <PocNodeResizer :label="resizableNodeProps.label" >-->
<!--        test-->
<!--      </PocNodeResizer>-->
    </template>
    <Background />
    <MiniMap />
    <Controls />
    <PocControls />
  </VueFlow>
</template>

<style>
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/minimap/dist/style.css';
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/node-resizer/dist/style.css';


</style>