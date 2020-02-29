<template>
  <div id="app">
   
    <VideoGetEar msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import VideoGetEar from './components/VideoGetEar.vue'

export default {
  name: 'App',
  components: {
    VideoGetEar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-left:300px;
  padding-right:300px;
  color: #2c3e50;
  margin-top: 60px;
}
img{
  float:right;
}
</style>
