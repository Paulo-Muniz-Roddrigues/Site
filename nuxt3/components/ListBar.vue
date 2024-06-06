<template>
  <div class="container">

    <div class="word-bar" @click="toggleList">{{ selectedWord }}</div>

    <ul v-if="showList" class="word-list">
      <li v-for="word in items" :key="word" @click="selectWord(word)">{{ word }}</li>
    </ul>

  </div>
</template>
<script>
export default {
  name: 'ListBarComponent',
  props: {
    items: { /* Array de nomes */
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedWord: this.items[0],
      showList: false
    };
  },
  methods: {
    toggleList() {
      this.showList = true;
    },
    selectWord(word) {
      this.selectedWord = word;
      this.showList = false;
      this.$emit('selectedWord', word);
    }
  }
};
</script>
<style scoped>
.container {
  width: 200px;
  margin: auto;
  text-align: center;
}

.word-bar {
  padding: 10px;
  cursor: pointer;
  user-select: none;
}

.word-list {
  list-style-type: none; /* Remove ponto */
  margin: auto;

}

.word-list li {
  padding: 10px; /* separação entre palavras */
  cursor: pointer; /* Muda cursor para apontar */
}

.word-list li:hover {
  color: blue;
}
</style>

