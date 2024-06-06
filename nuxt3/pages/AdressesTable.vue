<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Adresses" 
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
          {{ tituloDialog }} um Endereço
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
              v-model="adresses.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Zip Code"
              placeholder="Zip Code"
              v-model="adresses.zipCode"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="State"
              placeholder="State"
              v-model="adresses.state"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="City"
              placeholder="City"
              v-model="adresses.city"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Street"
              placeholder="Street"
              v-model="adresses.street"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="District"
              placeholder="District"
              v-model="adresses.district"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Number Forget"
              placeholder="Number Forget"
              v-model="adresses.numberForget"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-select
              variant="outlined"
              :items="users"
              label="User"
              item-text="name"
              item-value="id"
              v-model="adresses.idUsers"
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
    name:'AdressesTablePage',
    
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        adresses: {},
        users: [],
        loading: true,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'Zip Code', key: 'zipCode' },
          { title: 'State', key: 'state' },
          { title: 'City', key: 'city' },
          { title: 'Street', key: 'street' },
          { title: 'District', key: 'district' },
          { title: 'Number Forget', key: 'numberForget' },
          { title: 'User', key: 'idUsers' },
          { title: 'actions', key: 'actions', sortable: false },
        ],
        items: [],
      }
    },

    async created() {
      await this.getItems();
      await this.getUsers();
    },

    computed: {
      tituloDialog: function() {
        return this.adresses.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetAdresses()
        }
      }
    },

    methods: {
      resetAdresses() {
        this.adresses = {
          id: null,
          zipCode: null,
          state: null,
          city: null,
          street: null,
          district: null,
          numberForget: null,
          idUsers: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.adresses.id) {
          const response = await this.$api.post(`/adresses/persist/${this.adresses.id}`, this.adresses);
        } else {
          const response = await this.$api.post('/adresses/persist', this.adresses);
        }
        this.resetAdresses()
        await this.getItems();
      },

      editItem(item) {
        this.adresses = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar o endereço com o id ${item.id}?`)) {
          const response = await this.$api.post(`/adresses/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/adresses');
        this.items = response.data;
        this.loading = false;
      },
      
      async getUsers() {
        const response = await this.$api.get('/users');
        this.users = response.data;
      }
    }
  }
</script>

<style></style>
