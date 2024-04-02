<script setup>
const flowStore = useFlowStore()

defineProps({
  files: {
    type: Array
  }
})

const dropZoneRef = ref(null)

async function onDrop(files) {
  const router = useRouter()
  const { x , y , sourceType } = useMouse()
  const project = await flowStore.createProject(files, { x: x.value, y: y.value })
  router.push({ path: `/${project}` })
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  // specify the types of data to be received.
  // dataTypes: ['image/jpeg']
})
</script>

<template>

  <div ref="dropZoneRef" class="dropzone">
    Upload {{ files }} file<span v-if="files > 1">s</span>
  </div>
</template>

<style>
@import '/assets/styles/tokens.css';

.dropzone {
  background-color: var(--color6);
  color: var(--color1);
  font-family: 'tech';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>