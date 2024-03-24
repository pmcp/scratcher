<template>
  <div class="bg-black rounded-lg bg-opacity-40 p-2">
<div class="nodrag w-40 h-40 rounded-full  overflow-hidden">
      <WaveSurfer class=" " ref="refWaveSurfer" :src="src"  :options="options"/>
</div>
  </div>
</template>
<script setup>

const props = defineProps({
  src:{
    type:String,
    required:true
  },
  options:{
    type:Object,
  }
})

import { guess  } from 'web-audio-beat-detector';

const refWaveSurfer = ref(null);

const play = function play() {
  refWaveSurfer.value.waveSurfer.play();  // Calling the play method




}

defineExpose({
  play
})

function pause(){
  refWaveSurfer.value.waveSurfer.pause();  // Calling the pause method
}

function resetBPM() {

  refWaveSurfer.value.waveSurfer.setPlaybackRate(1, true);  // Calling the pause method
}
function setBPM({targetBpm, preservePitch}){
  // Get "original" bpm song
  const audioBuffer = refWaveSurfer.value.waveSurfer.getDecodedData()
  guess(audioBuffer, { maxTempo: 190, minTempo: 70 })
      .then(({ bpm, offset, tempo }) => {
        console.log(bpm, offset, tempo)
        // Calculate diff = (final - original)/ original
        const BpmDiff = (targetBpm - bpm) / bpm
        const newPlaybackRate = 1 + BpmDiff
        console.log(`new PlaybackRate = ${newPlaybackRate}`)
        // set playback rate
        refWaveSurfer.value.waveSurfer.setPlaybackRate(newPlaybackRate, preservePitch);  // Calling the pause method
      })
      .catch((err) => {
        console.log(err)
        // something went wrong
      });
  //

}
</script>