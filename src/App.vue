<template>
  <div id="app">
    <Chat/>
  </div>
</template>

<script>
import Chat from '@/components/Chat'
export default {
  components: {
    Chat
  }
}
</script>

<style>
html {
  font-size: 62.5%;
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
  background: #efefef;
}

p {
  margin: 0;
}
ul{
  list-style:none;;
}
#app{
  height: 100%;
}
</style>
