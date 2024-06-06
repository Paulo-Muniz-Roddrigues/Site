<template>
  <v-container class="justify-center mt-5">
    <TablesData 
      @editItem="editItem" 
      @deleteItem="deleteItem"
      @abrirDialog="() => ativo = true"
      titulo="Users" 
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
          {{ tituloDialog }} um Evento
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
              v-model="users.id"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Username"
              placeholder="Username"
              v-model="users.username"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="cpf"
              placeholder="cpf"
              v-model="users.cpf"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Name"
              placeholder="Name"
              v-model="users.name"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Phone"
              placeholder="Phone"
              v-model="users.phone"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="PassWord"
              placeholder="PassWord"
              v-model="users.passwordHash"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Role"
              placeholder="Role"
              v-model="users.role"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Cart"
              placeholder="Cart"
              v-model="users.cart"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Email"
              placeholder="Email@gmail.com"
              v-model="users.email"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Recuperation"
              placeholder="Recuperation"
              v-model="users.recuperation"
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
    name:'UserTableComponent',
    data: () => {
      return {
        dialog: false,
        valor: 0,
        ativo: false,
        users: {},
        loading: true,
        textoUsuario: null,
        headers: [
          { title: 'Identificador', key: 'id' },
          { title: 'UserName', key: 'username' },
          { title: 'cpf', key: 'cpf' },
          { title: 'Name', key: 'name' },
          { title: 'Phone', key: 'phone' },
          { title: 'Password', key: 'passwordHash' },
          { title: 'Token', key: 'token' },
          { title: 'Role', key: 'role' },
          { title: 'Cart', key: 'cart' },
          { title: 'Email', key: 'email' },
          { title: 'Recuperation', key: 'recuperation' },
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
      return this.users.id ? 'Editar': 'Criar';
      }
    },

    watch: {
      ativo(valor) {
        if (valor == false) {
          this.resetusers()
        }
      }
    },

    methods: {
      resetusers() {
        this.users = {
          id: null,
          username: null,
          cpf: null,
          name: null,
          phone: null,
          passwordHash: null,
          token: null,
          role: null,
          cart: null,
          email: null,
          recuperation: null
        }
        this.ativo = false;
      },

      async persist() {
        if (this.users.id) {
          const response = await this.$api.post(`/users/update/${this.users.id}`, this.users);
        } else {
          const response = await this.$api.post('/users/create', this.users);
        }
        this.resetusers()
        await this.getItems();
      },

      editItem(item) {
        this.users = {
          ...item
        };
        this.ativo = true;
      },
      
      async deleteItem(item) {
        if(confirm(`Tem certeza que deseja deletar itens do id ${item.id}?`)) {
          const response = await this.$api.post(`/users/destroy/${item.id}`, { id: item.id });
            if(response.type == 'error') {
              alert(response.message);
            }
          }
        await this.getItems();
      },
      
      async getItems() {
        const response = await this.$api.get('/users');
        this.items = response.data;
        this.loading = false;
      }
    }
  }
</script>

<style></style>