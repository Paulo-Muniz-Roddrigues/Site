<template>
  <v-row>
    <v-col cols="11">
      <h1 style="color: white">
        {{ titulo }}
      </h1>
    </v-col>
    <v-col>
      <v-tooltip color="green" text="Clique para adicionar um registro">
        <template v-slot:activator="{ props }">
          <v-btn
            fab
            v-bind="props"
            small
            icon="mdi-plus"
            color="green darken-2"
            @click="abrirDialog"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-data-table :loading="loading" :headers="headers" theme="dark" :items="items">

        <template v-slot:no-data>
          <span>
            Nenhum dado Encontrado
          </span>
          <v-btn color="error">
            <v-icon>
              mdi-reload
            </v-icon>
          </v-btn>
        </template>

        <template v-slot:loading>
          <span>
            Carregando dados
          </span>
          <v-progress-circular
            color="green"
            indeterminate
          ></v-progress-circular>
        </template>

        <template v-slot:item.dataInicio="{ item }">
          <span style="color: green">
            {{
              item.dataInicio.substring(0, 10)
            }}
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            class="me-2"
            size="small"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            color="error"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name:'TablesDataComponent',
  props: {
    items: {
      type: Array
    },
    headers: {
      type: Array,
    },
    loading: {
      type: Boolean
    },
    titulo: {
      type: String
    }
  },

  methods: {
    deleteItem(item) {
      this.$emit('deleteItem', item)
    },
    editItem(item) {
      this.$emit('editItem', item)
    },
    abrirDialog(){
      this.$emit('abrirDialog');
    }
  }
}
</script>

<style>

</style>
