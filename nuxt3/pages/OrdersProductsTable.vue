<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Orders Products" 
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
          {{ tituloDialog }} um Produto de Pedido
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
              v-model="ordersProducts.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="ordersProducts.idOrders"
              :items="orders"
              label="Order"
              item-text="id"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="ordersProducts.idProducts"
              :items="products"
              label="Product"
              item-text="name"
              item-value="id"
              outlined
            >
            </v-select>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Price"
              placeholder="Price"
              v-model="ordersProducts.priceProducts"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="CPF"
              placeholder="CPF"
              v-model="ordersProducts.cpf"
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
    name:'OrdersProductsTableComponent',
    props: {
      titulo: {
        type: String,
        default: 'Orders Products'
      }
    },
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        ordersProducts: {},
        orders: [],
        products: [],
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Order', key: 'idOrders' },
          { title: 'Product', key: 'idProducts' },
          { title: 'Price', key: 'priceProducts' },
          { title: 'CPF', key: 'cpf' },
          { title: 'actions', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },

    async created() {
      await this.getItems();
      await this.getOrders();
      await this.getProducts();
    },

    computed: {
      tituloDialog: function() {
        return this.ordersProducts.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetOrdersProducts()
        }
      }
    },

    methods: {
      resetOrdersProducts() {
        this.ordersProducts = {
          id: null,
          idOrders: null,
          idProducts: null,
          priceProducts: null,
          cpf: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.ordersProducts.id) {
          const response = await this.$api.post(`/orders-products/persist/${this.ordersProducts.id}`, this.ordersProducts);
        } else {
          const response = await this.$api.post('/orders-products/persist', this.ordersProducts);
        }
        this.resetOrdersProducts()
        await this.getItems();
      },

      editItem(item) {
        this.ordersProducts = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar o produto do pedido com o id ${item.id}?`)) {
          const response = await this.$api.post(`/orders-products/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/orders-products');
        this.items = response.data;
        this.loading = false;
      },
      
      async getOrders() {
        const response = await this.$api.get('/orders');
        this.orders = response.data;
      },

      async getProducts() {
        const response = await this.$api.get('/products');
        this.products = response.data;
      }
    }
  }
</script>

<style></style>
