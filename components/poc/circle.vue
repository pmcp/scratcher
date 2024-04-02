<template>



  <div ref="el" :style="style" class="relative w-40 h-40 overflow-none">
    <div class="pr-2 w-full h-full rounded-full overflow-clip z-20 absolute">
      <slot/>
    </div>
    <div class="absolute -inset-1 rounded-full blur-md bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div>
  </div>


</template>

<script setup lang="ts">

const el = ref<HTMLElement | null>(null)

// `styles` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
</script>