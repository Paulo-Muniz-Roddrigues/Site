<template>
  <div>
    <ListBar :items="['Usuarios', 'Pagamentos', 'Cupons']" @selectedWord="selectTable" />
    <a v-if="selectedTable === 'Usuarios'" href="./UsersTable.vue"></a>
  </div>
</template>

<script>
export default {
  name: 'table',
  data() {
    return {
      selectedTable: null
    };
  },
  methods: {
    selectTable(word) {
      this.selectedTable = word;
    }
  }
};
</script>
