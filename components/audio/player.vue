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

<template>
  <div class="player__card flex flex-col w-96 relative">
<!--    <UiRoster class="w-full absolute top-4 left-0 h-auto z-10"/>-->

    <slot name="actionButtons" />

<!--    <div class="player__info">-->
<!--      <div class="player__info__artist">{{ data.title }}</div>-->
<!--      <div class="player__info__title">{{ data.artist }}</div>-->

<!--    </div>-->
    <UiPane>
<!--      <pre>{{ data }}</pre>-->

      <AudioWaveSurfer v-if="src" ref="refWaveSurfer" :src="src"  :options="options"/>
    </UiPane>

    <slot name="sectionButtons" />


    <div class="player__controls">
      <UiButtonRect :variation="1" align="top">
        BPM
      </UiButtonRect>
      <UiButtonRect :variation="1" align="top">
        KEY
      </UiButtonRect>
      <UiButtonRect :variation="1" align="top">
        LOOP
      </UiButtonRect>
    </div>
  </div>
</template>
<style>
@import '/assets/styles/tokens.css';
.player__card {
  box-shadow: 0 2px 10px var(--color7);
  display: flex;
  flex-direction: column;
  width: 24rem;
  background-color: var(--color2);
}

.player__info {
  display: flex;
  flex-direction: column;
  padding: 1em;
  font-family: 'tech', sans-serif;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  color: var(--color6)
}

.player__info__artist {
  font-size: 0.7em;
}

.player__info__title {
  font-size: 0.5em;
}

.player WaveSurfer {
  box-shadow: 10px 5px 5px red;

}

.player__controls {
  padding: 1em;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: .5em;
  background: linear-gradient(
      to bottom,
      hsla(0,0%,75%,0.65) 0%,
      hsla(0,0%,0%,0) 20%
  ), linear-gradient(
      to bottom,
      hsla(0,0%,0%,1) 0%,
      hsla(0,0%,0%,0) 3%)
;

}





</style>