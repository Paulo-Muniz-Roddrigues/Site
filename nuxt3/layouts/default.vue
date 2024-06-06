<template>
  <v-layout>
    <layerBody>
      <layer>
        <v-main style="height: 100vh;">
          <slot></slot>
        </v-main>
      </layer>
      <layer>
        <div class="trigger">
          <div class="navbar">
          </div>
        </div>
        <button class="config">
          Clique aqui
        </button>
      </layer>
    </layerBody>
  </v-layout>
</template>

<script></script>

<style scoped>
  .trigger {
    height: 100vh;
    width: 20vh;
    /* border: 2px solid white; */
  }
  .navbar {
    min-height: 100vh;
    width: 20vh;
    background-color: rgb(253, 107, 253);
    transform: translate(-100%, 0%);
    transition: 0.5s;
  }
  .trigger:hover .navbar {
    transform: translate(0%, 0%);
    transition: 0.5s;
  }

  .config {
    height: 10vh;
    width: 10vh;
    background-color: green;
  }
  layerBody{
    position: relative;
    width: 100%;
    height: 100vh;
  }
  layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
