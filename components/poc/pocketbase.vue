<template>
  <div>
  <UiButtonSquare @click="doLogin($config.public.testUser, $config.public.testPass)">
    <template v-slot:label>
      LOGIN
    </template>
  </UiButtonSquare>

    <TeamsAll />


    <UiButtonSquare @click="doLogin($config.public.testUser, $config.public.testPass)">
      <template v-slot:label>
        ADD
      </template>
    </UiButtonSquare>
  </div>
</template>


<script setup>
const flowStore = useFlowStore()

const nodes = ref([])


const doLogin = function(user, pass) {
  flowStore.login(user, pass)
}


const uploadFile = function(user, pass) {

}


</script>