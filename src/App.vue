<template>
  <div id="app">
    <TopHeader></TopHeader>
    <img src="./assets/logo.png">



    <router-view></router-view>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
export default {
  name: 'app',
  components: {
    TopHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

body{
  margin:  0px;
}

</style>
