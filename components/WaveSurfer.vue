<template>
  <div ref="wavesurferContainer" @click="togglePlay"></div>
  <!--  <div ref="waveTimeline"></div>-->
</template>

<script setup>

// OPTIM: Save peak data on upload
// https://github.com/katspaugh/wavesurfer.js/discussions/2932

const props = defineProps({
  src:{
    type:String,
    required:true
  },
  options:{
    type:Object,
  }
})

const waveSurfer = ref(null);
const wavesurferContainer = ref(null);

const WaveSurfer = (await import('wavesurfer.js')).default;
// const Timeline  = (await import('wavesurfer.js/dist/plugins/timeline.js')).default;

const togglePlay = function(){
  if(waveSurfer.value.isPlaying()) {
    waveSurfer.value.pause()
  } else {
    waveSurfer.value.play()
  }

}

const audioBuffer = ref(null)

onMounted(async()=>{
  let wsOptions = Object.assign({
        container: wavesurferContainer.value,
      },
      props.options);

  waveSurfer.value = WaveSurfer.create(wsOptions);
  waveSurfer.value.load(props.src);

  waveSurfer.value.on('decode', () => {
    // Get AudioBuffer data
    audioBuffer.value = waveSurfer.value.getDecodedData()
    const peaks = exportPeaks()
    console.log(peaks)
  })


  const play = waveSurfer.value.getDecodedData()


  console.log(play)

})
onUnmounted(()=>{
  waveSurfer.value.destroy();
})
defineExpose({
  waveSurfer,
  audioBuffer
})
</script>

<style lang="css" scoped>
div {
  position: relative;
}
</style>