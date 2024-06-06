<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Cupoms" 
      :loading="loading" 
      :headers="headers" 
      :items="items"
    ></TablesData>
  </v-container>
  <v-dialog
    v-model="ativo"
    max-width="500"
  >
    <v-card
      height="600"
      width="700"
    >
      <v-card-title>
        <h1>
          {{ tituloDialog }} um Cupom
        </h1>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Id"
              placeholder="Identificador"
              disabled
              v-model="cupoms.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Code"
              placeholder="Code"
              v-model="cupoms.code"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Type"
              placeholder="Type"
              v-model="cupoms.type"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Value"
              placeholder="Value"
              v-model="cupoms.value"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Uses"
              placeholder="Uses"
              v-model="cupoms.uses"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green"
          variant="outlined"
          @click="persist"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name:'CupomsTableComponent',
    props: {
      titulo: {
        type: String,
        default: 'Cupoms'
      }
    },
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        cupoms: {},
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Code', key: 'code' },
          { title: 'Type', key: 'type' },
          { title: 'Value', key: 'value' },
          { title: 'Uses', key: 'uses' },
          { title: 'actions', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },

    async created() {
      await this.getItems();
    },

    computed: {
    tituloDialog: function() {
      return this.cupoms.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetCupoms()
        }
      }
    },

    methods: {
      resetCupoms() {
        this.cupoms = {
          id: null,
          code: null,
          type: 'percent',
          value: null,
          uses: 999
        }
        this.ativo = false;
      },

      async persist() {
        if (this.cupoms.id) {
          const response = await this.$api.post(`/cupoms/persist/${this.cupoms.id}`, this.cupoms);
        } else {
          const response = await this.$api.post('/cupoms/persist', this.cupoms);
        }
        this.resetCupoms()
        await this.getItems();
      },

      editItem(item) {
        this.cupoms = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar itens do id ${item.id}?`)) {
          const response = await this.$api.post(`/cupoms/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/cupoms');
        this.items = response.data;
        this.loading = false;
      }
    }
  }
</script>

<style></style>
