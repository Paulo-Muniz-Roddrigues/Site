<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Payments" 
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
          {{ tituloDialog }} um Pagamento
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
              v-model="payments.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Name"
              placeholder="Name"
              v-model="payments.name"
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
    name:'PaymentsTableComponent',
    props: {
      titulo: {
        type: String,
        default: 'Payments'
      }
    },
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        payments: {},
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Name', key: 'name' },
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
      return this.payments.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetPayments()
        }
      }
    },

    methods: {
      resetPayments() {
        this.payments = {
          id: null,
          name: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.payments.id) {
          const response = await this.$api.post(`/payments/persist/${this.payments.id}`, this.payments);
        } else {
          const response = await this.$api.post('/payments/persist', this.payments);
        }
        this.resetPayments()
        await this.getItems();
      },

      editItem(item) {
        this.payments = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar itens do id ${item.id}?`)) {
          const response = await this.$api.post(`/payments/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/payments');
        this.items = response.data;
        this.loading = false;
      }
    }
  }
</script>

<style></style>