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

const elements = ref([
  {
    id: '1',
    type: 'song-default',
    label: 'Speed',
    position: { x: 250, y: 5 },
    // pass custom data to the node
    data: {
      src: 'speed.m4a',
      playerOptions: options
    },
  },

  {
    id: '2',
    type: 'song-default',
    label: 'Trek',
    position: { x: 550, y: 5 },
    data: {
      src: 'trek.m4a',
      playerOptions: options
    },
  },

  {
    id: '3',
    type: 'song-default',
    label: 'Barracuda',
    position: { x: 150, y: 5 },
    data: {
      src: 'barracuda.m4a',
      playerOptions: options
    },
  },


  {
    id: '4',
    type: 'song-default',
    label: 'Barracuda',
    position: { x: 150, y: 5 },
    data: {
      src: 'barracuda.m4a',
      playerOptions: options
    },
  },
  {
    id: '5',
    type: 'song-default',
    label: 'Barracuda',
    position: { x: 150, y: 5 },
    data: {
      src: 'barracuda.m4a',
      playerOptions: options
    },
  },

  {
    id: '6',
    type: 'song-default',
    label: 'Barracuda',
    position: { x: 150, y: 5 },
    data: {
      src: 'barracuda.m4a',
      playerOptions: options
    },
  },

  // {
  //   id: '4',
  //   type: 'resizable',
  //   label: 'NodeResizer',
  //   position: { x: 0, y: 0 },
  //   style: { background: 'red', border: '2px solid black' },
  // },


])

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

  <VueFlow v-model="els" class="absolute w-full h-full" fit-view-on-init elevate-edges-on-select nodesConnectable connectable connectableEnd connectableStart>
    <!-- bind your custom node type to a component by using slots, slot names are always `node-<type>` -->
    <template #node-song-default="{id, data }" >
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
/*!* import the default theme, this is optional but generally recommended *!*/
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css'
</style>