<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Products" 
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
          {{ tituloDialog }} um Produto
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
              v-model="products.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Name"
              placeholder="Name"
              v-model="products.name"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Price"
              placeholder="Price"
              v-model="products.price"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Image"
              placeholder="Image URL"
              v-model="products.image"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Description"
              placeholder="Description"
              v-model="products.description"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="products.idCategories"
              :items="categories"
              label="Category"
              item-text="name"
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
    name:'ProductsTableComponent',
    props: {
      titulo: {
        type: String,
        default: 'Products'
      }
    },
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        products: {},
        categories: [],
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Name', key: 'name' },
          { title: 'Price', key: 'price' },
          { title: 'Image', key: 'image' },
          { title: 'Description', key: 'description' },
          { title: 'Category', key: 'idCategories' },
          { title: 'actions', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },

    async created() {
      await this.getItems();
      await this.getCategories();
    },

    computed: {
      tituloDialog: function() {
        return this.products.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetProducts()
        }
      }
    },

    methods: {
      resetProducts() {
        this.products = {
          id: null,
          name: null,
          price: null,
          image: null,
          description: null,
          idCategories: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.products.id) {
          const response = await this.$api.post(`/products/persist/${this.products.id}`, this.products);
        } else {
          const response = await this.$api.post('/products/persist', this.products);
        }
        this.resetProducts()
        await this.getItems();
      },

      editItem(item) {
        this.products = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar o produto com o id ${item.id}?`)) {
          const response = await this.$api.post(`/products/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/products');
        this.items = response.data;
        this.loading = false;
      },
      
      async getCategories() {
        const response = await this.$api.get('/categories');
        this.categories = response.data;
      }
    }
  }
</script>

<style></style>
