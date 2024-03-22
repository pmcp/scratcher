<template>
  <main>
<!--    <ContentDoc />-->
    <PocPlayer />
    <div
    >pos: {{ x
      }}, {{ y
      }}</div
    >
  </main>
</template>


<script setup lang="ts">


const { x
  , y
} = useMouse
()
</script>
ate>