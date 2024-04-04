<script setup>

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


</script>

<template>
  <div class="single--simple__card flex flex-col w-96">
    <div class="single--simple__info">
      <div class="single--simple__info__artist">{{ data.title }}</div>
      <div class="single--simple__info__title">{{ data.artist }}</div>
    </div>
    <UiPane>
      BLOCKS
    </UiPane>
    <div class="single--simple__controls">
      <UiButtonSquare :variation="1" align="top">
        <template v-slot:label>
          BPM
        </template>
        <template v-slot:led>
          <UiLed :type="0"/>
        </template>
      </UiButtonSquare>
      <UiButtonSquare :variation="1" align="top">
        <template v-slot:label>
          Sound
        </template>
      </UiButtonSquare>
      <UiButtonSquare :variation="2" align="top">
        <template v-slot:label>
          Record
        </template>
      </UiButtonSquare>
    </div>
  </div>
</template>
<style>
@import '/assets/styles/tokens.css';
.single--simple__card {
  box-shadow: 0 2px 10px var(--color7);
  display: flex;
  flex-direction: column;
  width: 24rem;
  background-color: var(--color2);
}

.single--simple__info {
  display: flex;
  flex-direction: column;
  padding: 1em;
  font-family: 'tech', sans-serif;
  letter-spacing: 0.075em;
  text-transform: uppercase;
  color: var(--color6)
}

.single--simple__info__artist {
  font-size: 0.7em;
}

.single--simple__info__title {
  font-size: 0.5em;
}

.player WaveSurfer {
  box-shadow: 10px 5px 5px red;

}

.single--simple__controls {
  padding: 1em;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: .4em;
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