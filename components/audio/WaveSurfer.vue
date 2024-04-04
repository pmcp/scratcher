<template>
  <div class="w-full">
    <div ref="wavesurferContainer" @click="togglePlay" class="w-full"></div>
    <UProgress v-if="!ready" animation="carousel" />
  </div>
<!--    <div ref="waveTimeline"></div>-->
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

// UI
const ready = ref(false)
const loadingValue = ref(0)

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
  // TODO: add loader
  let wsOptions = Object.assign({
        container: wavesurferContainer.value,
      },
      props.options);

  waveSurfer.value = WaveSurfer.create(wsOptions);
  waveSurfer.value.load(props.src);

  waveSurfer.value.on('decode', () => {
    // Get AudioBuffer data
    audioBuffer.value = waveSurfer.value.getDecodedData()
    // const peaks = exportPeaks()
    // console.log(peaks)
  })


  const play = waveSurfer.value.getDecodedData()

  /** During audio loading */
  waveSurfer.value.on('loading', (percent) => {
    console.log('Loading', percent + '%')
    loadingValue.value = percent
  })

  /** When the audio has been decoded */
  waveSurfer.value.on('decode', (duration) => {
    console.log('Decode', duration + 's')
  })

  /** When the audio is both decoded and can play */
  waveSurfer.value.on('ready', (duration) => {
    console.log('Ready', duration + 's')
    ready.value = true;
  })

  /** When visible waveform is drawn */
  waveSurfer.value.on('redrawcomplete', () => {
    console.log('Redraw began')
  })

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