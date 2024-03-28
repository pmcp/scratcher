<template>
  <UCard>
    <template #header>
      <h1>{{ data.title }} - {{ data.artist }}</h1>

    </template>
        <WaveSurfer v-if="src" class="w-full" ref="refWaveSurfer" :src="src"  :options="options"/>
    <template #footer>
      <UButton @click="setBPM"></UButton>
    </template>
  </UCard>
</template>
<script setup>

const PlayerStore = usePlayerStore()

const props = defineProps({
  src:{
    type:String,
    required:true
  },
  data: {
    type: Object,
    required:true
  },
  options:{
    type:Object,
  }
})

const refWaveSurfer = ref(null);
const play = function play() {
  refWaveSurfer.value.waveSurfer.play();  // Calling the play method
}

function pause(){
  refWaveSurfer.value.waveSurfer.pause();  // Calling the pause method
}

defineExpose({
  play, pause
})



function resetBPM() {
  refWaveSurfer.value.waveSurfer.setPlaybackRate(1, true);  // Calling the pause method
}

function setBPM({targetBpm, preservePitch}){
  // Get "original" bpm song
  console.log(refWaveSurfer.value)
  // OPTIMISE: On upload, analyse BPM
  const audioBuffer = refWaveSurfer.value.audioBuffer
  console.log('got audioBuffer', audioBuffer)
  // Calculate new BPM
  const oldBPM = PlayerStore.calculateBPM(audioBuffer, targetBpm)
  console.log('NEW', oldBPM)

  // Set new BPM
  refWaveSurfer.value.waveSurfer.setPlaybackRate(newPlaybackRate, preservePitch);  // Calling the pause method


}
</script>