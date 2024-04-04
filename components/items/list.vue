<template>
  <div class="flex flex-row gap-2 overflow-x-scroll">
    <div v-for="i in items" >
      <single v-if="i.data.src" :data="i.data"  :src="i.data.src" :options="options" :id="i.id"/>
    </div>
    <div v-for="i in items" >
      <AudioPlayerMini v-if="i.data.src" :data="i.data"  :src="i.data.src" :options="options" :id="i.id"/>
    </div>
    <div v-for="i in items" >
      <AudioPlayerMini v-if="i.data.src" :data="i.data"  :src="i.data.src" :options="options" :id="i.id"/>
    </div>
    <div v-for="i in items" >
      <AudioPlayerMini v-if="i.data.src" :data="i.data"  :src="i.data.src" :options="options" :id="i.id"/>
    </div>
  </div>

</template>
<script setup>
defineProps({
  items: {
    type: Array
  },
  options: {
    type: Object
  }
})
</script>