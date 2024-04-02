<script setup>
defineProps({
  sourceX: {
    type: Number,
    required: true,
  },
  sourceY: {
    type: Number,
    required: true,
  },
  targetX: {
    type: Number,
    required: true,
  },
  targetY: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <svg>
    <defs>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="red" />
        <stop offset="50%" stop-color="black" stop-opacity="0" />
        <stop offset="100%" stop-color="blue" />
      </linearGradient>
    </defs>
    <g>
      <path
          class="vue-flow__connection"
          :stroke-width="10"
          fill="none"
          stroke="url(#Gradient2)"
          :d="`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`"
      />

      <circle :cx="targetX" :cy="targetY" fill="#fff" :r="4" stroke="#6F3381" :stroke-width="4" />
    </g>
  </svg>



</template>
<style>
#rect1 {
  fill: url(#Gradient1);
}
.stop1 {
  stop-color: red;
}
.stop2 {
  stop-color: black;
  stop-opacity: 0;
}
.stop3 {
  stop-color: blue;
}
</style>