<template>
   <div>
     <userprofile/>
   </div>
</template>

<script>
import userprofile from "./components/UserProfile.vue"
export default {
  name: 'App',
  components: {
    userprofile
  },
}
</script>

<style lang='scss'>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
