<script setup>
const flowStore = useFlowStore()
const UiStore = useUiStore()
const dropZoneRef = ref(null)
const files = ref(0)

const { x , y } = useMouse()

async function onDrop(files) {
  flowStore.draggingFiles(false)
  const route = useRoute()
  const project = await flowStore.uploadFiles(files, { x: x.value, y: y.value }, route.path)

}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  // dataTypes: ['image/jpeg']
})

onMounted(() => {
  useEventListener(window, 'dragenter', (e) => {
    if(UiStore.draggingFiles) return;
    files.value = Object.values(e.dataTransfer.items).length
    flowStore.draggingFiles(true)
  })

  useEventListener(dropZoneRef, 'dragleave', (e) => {
    files.value = 0
    flowStore.draggingFiles(false)
  })
})

</script>

<template>

  <div v-if="UiStore.draggingFiles" ref="dropZoneRef" class="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
    Drop {{ files }} file<span v-if="files > 1">s</span>

  </div>
</template>

<style>
@import '/assets/styles/tokens.css';


</style>