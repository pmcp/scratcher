<template>
  <div class="w-full">
    <div ref="wavesurferContainer" @click="togglePlay" class="w-full"></div>
    <pre>{{ id }}</pre>
    <UProgress v-if="!ready" animation="carousel" />
  </div>
<!--    <div ref="waveTimeline"></div>-->
</template>

<script setup>

const flowStore = useFlowStore()

const WaveSurfer = (await import('wavesurfer.js')).default;
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js'


// TODO: Save peak data on first load
// https://github.com/katspaugh/wavesurfer.js/discussions/2932

const props = defineProps({
  src:{
    type:String,
    required:true
  },
  options:{
    type:Object,
  },
  regions:{
    type:Array,
  },
  nodeId: {
    type:String,
  }
})

// UI
const ready = ref(false)
const loadingValue = ref(0)

const waveSurfer = ref(null);
const wavesurferContainer = ref(null);



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
  // Add Regions plugin to this WaveSurfer instance
  const wsRegions = waveSurfer.value.registerPlugin(RegionsPlugin.create())

  waveSurfer.value.load(props.src);










  waveSurfer.value.on('decode', () => {
    // Get AudioBuffer data
    audioBuffer.value = waveSurfer.value.getDecodedData()
    const peaks = waveSurfer.value.exportPeaks()
    console.log(peaks)
  })


  const play = waveSurfer.value.getDecodedData()

  /** During audio loading */
  waveSurfer.value.on('loading', (percent) => {
    console.log('Loading', percent + '%')
    loadingValue.value = percent
  })

  /** When the audio has been decoded */
  waveSurfer.value.on('decode', (duration) => {

    // REGION
    // Loop over regions and add to Wavesurfer
    for (let i = 0; i < props.regions.length; i++) {
      console.log('adding region', i, props.regions[i])
      wsRegions.addRegion({
        start: props.regions[i].start,
        end: props.regions[i].end,
        // Get the colors from regions store
        color: props.regions[i].color,
        drag: true,
        resize: true,
        minLength: 4,
      })
    }


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

  // Region reactivity
  // wsRegions.on('region-clicked', (region, e) => {
  //   console.log(region, e)
  //   // e.stopPropagation() // prevent triggering a click on the waveform
  //   // activeRegion = region
  //   // // region.play()
  //   // // region.setOptions({ color: randomColor() })
  // })

  wsRegions.on('region-updated', (region) => {
    console.log('regionnnn', region)
    console.log(props.nodeId)
    flowStore.updateRegionTiming(props.nodeId, region.start, region.end, region.color)
  })





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