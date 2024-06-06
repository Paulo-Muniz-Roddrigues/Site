<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Orders" 
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
          {{ tituloDialog }} um Pedido
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
              v-model="orders.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Status"
              placeholder="Status"
              v-model="orders.status"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Total"
              placeholder="Total"
              v-model="orders.total"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Total Discount"
              placeholder="Total Discount"
              v-model="orders.totalDiscount"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="orders.idUsersCostumers"
              :items="users"
              label="Customer"
              item-text="name"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="orders.idUsersDelivers"
              :items="users"
              label="Delivery Person"
              item-text="name"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="orders.idAdresses"
              :items="adresses"
              label="Address"
              item-text="street"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
          <v-col>
            <v-select
              v-model="orders.idPayments"
              :items="payments"
              label="Payment Method"
              item-text="name"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="orders.idCupoms"
              :items="cupoms"
              label="Coupon"
              item-text="code"
              item-value="id"
              outlined
            >
            </v-select>
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
    name:'OrdersTableComponent',
    props: {
      titulo: {
        type: String,
        default: 'Orders'
      }
    },
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        orders: {},
        users: [],
        adresses: [],
        payments: [],
        cupoms: [],
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Status', key: 'status' },
          { title: 'Total', key: 'total' },
          { title: 'Total Discount', key: 'totalDiscount' },
          { title: 'Customer', key: 'idUsersCostumers' },
          { title: 'Delivery Person', key: 'idUsersDelivers' },
          { title: 'Address', key: 'idAdresses' },
          { title: 'Payment Method', key: 'idPayments' },
          { title: 'Coupon', key: 'idCupoms' },
          { title: 'actions', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },

    async created() {
      await this.getItems();
      await this.getUsers();
      await this.getAdresses();
      await this.getPayments();
      await this.getCupoms();
    },

    computed: {
      tituloDialog: function() {
        return this.orders.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetOrders()
        }
      }
    },

    methods: {
      resetOrders() {
        this.orders = {
          id: null,
          status: null,
          total: null,
          totalDiscount: null,
          idUsersCostumers: null,
          idUsersDelivers: null,
          idAdresses: null,
          idPayments: null,
          idCupoms: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.orders.id) {
          const response = await this.$api.post(`/orders/persist/${this.orders.id}`, this.orders);
        } else {
          const response = await this.$api.post('/orders/persist', this.orders);
        }
        this.resetOrders()
        await this.getItems();
      },

      editItem(item) {
        this.orders = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar o pedido com o id ${item.id}?`)) {
          const response = await this.$api.post(`/orders/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/orders');
        this.items = response.data;
        this.loading = false;
      },
      
      async getUsers() {
        const response = await this.$api.get('/users');
        this.users = response.data;
      },

      async getAdresses() {
        const response = await this.$api.get('/adresses');
        this.adresses = response.data;
      },

      async getPayments() {
        const response = await this.$api.get('/payments');
        this.payments = response.data;
      },

      async getCupoms() {
        const response = await this.$api.get('/cupoms');
        this.cupoms = response.data;
      }
    }
  }
</script>

<style></style>
