<script setup>
import { Handle, useHandleConnections, VueFlow, useVueFlow, Position, useNodesData,  } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Controls } from '@vue-flow/controls'
import { Background } from '@vue-flow/background'
// useVueFlow provides access to the event handlers
const flowStore = useFlowStore()

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


onNodeDragStop((value) => {
  flowStore.flowUpdate('onNodeDragStop', value)
})

onConnect((connection) => {
  console.log('onConnect', connection)
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
      <AudioPlayer v-if="data.src" :data="data" class="w-96" :src="data.src" :options="props.options" :id="id"/>
      <Handle type="source" :position="Position.Right"  />
    </template>
    <Background />
<!--    <MiniMap />-->
    <Controls />
    <PocControls />
<!--    <template #connection-line="{ sourceX, sourceY, targetX, targetY }">-->
<!--      <FlowLine :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" />-->
<!--    </template>-->

<!--    <FlowDropzoneBackground-->
<!--        :style="{-->
<!--          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',-->
<!--          transition: 'background-color 0.2s ease',-->
<!--        }"-->
<!--    />-->
  </VueFlow>

</template>
