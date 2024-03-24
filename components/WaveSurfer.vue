<template>
  <div ref="wavesurferMain" @click="togglePlay"></div>
<!--  <div ref="waveTimeline"></div>-->
</template>

<script setup>
const props = defineProps({
  src:{
    type:String,
    required:true
  },
  peaksData:{
    type:String,
  },
  options:{
    type:Object,
  }
})

const waveSurfer = ref(null);
const wavesurferMain = ref(null);
const waveTimeline = ref(null);

const togglePlay = function(){
  console.log('here')
  if(waveSurfer.value.isPlaying()) {
    waveSurfer.value.pause()
  } else {
    waveSurfer.value.play()
  }

}

onMounted(async()=>{
  const WaveSurfer = (await import('wavesurfer.js')).default;
  const Timeline  = (await import('wavesurfer.js/dist/plugins/timeline.js')).default;
  let options = props.options;
  let wsOptions = Object.assign({
        container: wavesurferMain.value,
        plugins:[
          Timeline.create({container:waveTimeline.value})
        ] },
      options);

  waveSurfer.value = WaveSurfer.create(wsOptions);
  if (props.peaksData){
    fetch(props.peaksData)
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(peaks => {
          waveSurfer.value.load(props.src,peaks.data);
        })
        .catch((e) => {
          console.error('error', e);
        });
  }else{
    waveSurfer.value.load(props.src);
  }


})
onUnmounted(()=>{
  waveSurfer.value.destroy();
})
defineExpose({
  waveSurfer
})
</script>

<style lang="css" scoped>
div {
  position: relative;
}
</style>