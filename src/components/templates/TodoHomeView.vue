<template>
  <div class="home">
    <h1>MyTodo</h1>
  </div>
</template>

<script setup lang="ts">
console.log("home");
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  h1 {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
