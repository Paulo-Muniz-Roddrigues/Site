<template>
    <body>
      <div class="title" style="color: white;">
        <u>Titulo</u>
      </div >
      <div class="content">
        oi
      </div>
    </body>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style scoped>

.title {
  height: 30vh;
  margin: auto;
  text-align: center;
  background-color: red;
}
.content {
  margin-top: 10vh;
  margin-left: auto;
  border: 1px solid white;
  display: flex
}
.item {
  flex: 1;
  height: 30vh;
}
.user {
  margin-left: 100%;
  height: 30vh;
  width: 30vh;
  background-color: green;
}

</style>