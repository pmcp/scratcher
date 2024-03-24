<script setup>
import { Panel, useVueFlow } from '@vue-flow/core'

const flowKey = 'example-flow'

const { nodes, addNodes, dimensions, toObject, fromObject } = useVueFlow()

function onSave() {
  console.log(JSON.stringify(toObject()))
  localStorage.setItem(flowKey, JSON.stringify(toObject()))
}

function onRestore() {
  const flow = JSON.parse(localStorage.getItem(flowKey))

  if (flow) {
    fromObject(flow)
  }
}

function onAdd() {
  const id = nodes.value.length + 1

  const newNode = {
    id: `random_node-${id}`,
    label: `Node ${id}`,
    position: { x: Math.random() * dimensions.value.width, y: Math.random() * dimensions.value.height },
  }

  addNodes([newNode])
}
</script>

<template>
  <Panel position="top-right" class="save-restore-controls">
    <div class="flex gap-4">
      <UButton @click="onSave">save</UButton>
      <UButton @click="onRestore">restore</UButton>
    </div>

  </Panel>
</template>
