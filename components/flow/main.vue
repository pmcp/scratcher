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
  addEdges,
  onEdgeDoubleClick,
  getConnectedEdges
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
  // addEdges(connection)
  // On connect of edge, save to db
  flowStore.connectEdge(connection)
})

onEdgeDoubleClick((value) => {
  flowStore.removeEdges([value.edge.id])
})

const cloneNode = ((val) => {
  console.log('going to clone node', val)
})

const removeNode = ((val) => {
  // Get connected edges
  const connectedEdges = getConnectedEdges(val)

  console.log('going to remove node', val, connectedEdges)

  flowStore.removeNode(val, connectedEdges)
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
  <VueFlow class="flow" :nodes="props.nodes" :edges="props.edges" :connection-radius="30" auto-connect fit-view-on-init>

    <template :key="id" #node-song-default="{id, data }">
      <Handle type="target" :position="Position.Left" :on-connect="onConnect" />
      <AudioPlayer v-if="data.src" :data="data" class="w-96" :src="data.src" :options="props.options" :id="id">
        <template v-slot:actionButtons>
          <div class="p-4 flex gap-2">
            <UiButtonRect @click="cloneNode(id)">
              Clone
            </UiButtonRect>
            <UiButtonRect @click="removeNode(id)">
              Remove
            </UiButtonRect>
          </div>
        </template>
      </AudioPlayer>
      <Handle type="source" :position="Position.Right"  />
    </template>
    <Background />
<!--    <MiniMap />-->
    <Controls />
    <PocControls />
    <template #connection-line="{ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }">
      <FlowLineSnappable
          :source-x="sourceX"
          :source-y="sourceY"
          :target-x="targetX"
          :target-y="targetY"
          :source-position="sourcePosition"
          :target-position="targetPosition"
      />
    </template>

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

<style>
@import '/assets/styles/tokens.css';


.flow .vue-flow__edge-path {
  stroke: var(--color5);
  stroke-width: 8;
  fill: none;
}

.flow .vue-flow__edge.selected .vue-flow__edge-path, .vue-flow__edge:focus .vue-flow__edge-path, .vue-flow__edge:focus-visible .vue-flow__edge-path {
  stroke: var(--color12);
  stroke-width: 8;
  fill: none;
}

.flow .vue-flow__connectionline path {
  stroke: var(--color5);
  stroke-width: 8;
  fill: none;
  stroke-dasharray: 10;
  stroke-dashoffset: 100;
  animation: draw 8s linear forwards;
}

.flow .vue-flow__handle {
  width: 1em;
  height: 1em;
}



@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}


</style>