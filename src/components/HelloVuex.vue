<template>
  <div>
    <h2>{{$store.state.counter}}</h2>
    <!-- 该值来自于store/index.js -->
  </div>
</template>

<script>
export default {
  name: "HellVuex"
  /* props: {
    aaa: Number
  } */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
