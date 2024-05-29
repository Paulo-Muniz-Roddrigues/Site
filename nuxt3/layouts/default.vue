<template>
  <div class="trigger">
    <div class="navbar">
      <div>
        <img src="" alt="">
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.trigger {
  height: 100vh;
  width: 20vh;
  /* border: 2px solid white; */
}
.navbar {
  height: 100vh;
  width: 20vh;
  background-color: red;
  transform: translate(-100%, 0%);
  transition: 0.5s;
}
.trigger:hover .navbar {
  transform: translate(0%, 0%);
  transition: 0.5s;
}
</style>