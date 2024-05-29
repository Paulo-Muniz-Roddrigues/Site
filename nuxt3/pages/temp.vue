<template>
  <v-container class="justify-center mt-5">
    <TabelaDados v-if="items.length > 0" @editItem="editItem" @abrirDialog="() => ativo = true" titulo="Eventos" :loading="loading" @deleteItem="deleteItem" :headers="headers" :items="items"></TabelaDados>
    <h1 v-else> Sem items</h1>
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
              v-model="atividade.id"
            >

            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="Nome"
              placeholder="Nome"
              v-model="atividade.nome"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="dataInicio"
              placeholder="dataInicio"
              v-model="atividade.dataInicio"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              variant="outlined"
              label="dataFim"
              placeholder="dataFim"
              v-model="atividade.dataFim"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              variant="outlined"
              label="local"
              placeholder="local"
              v-model="atividade.local"
            >
            </v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              :items="eventos"
              item-title="nome"
              item-value="id"
              v-model="atividade.idEvento"
            >
            </v-autocomplete>
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
  data: () => {
    return {
      dialog: false,
      valor: 0,
      ativo: false,
      loading: true,
      textoUsuario: null,
      atividade: {
        id: null,
        nome: null,
        dataInicio: null,
        dataFim: null,
        local: null,
        idEvento: null
      },
      headers: [
        {
          title: 'Identificador',
          key: 'id'
        },
        {
          title: 'nome',
          key: 'nome'
        },
        {
          title: 'local',
          key: 'local'
        },
        {
          title: 'Data de Inicio',
          key: 'dataInicio'
        },
        {
          title: 'Actions',
          key: 'actions',
          sortable: false
        },
      ],
      items: [],
      eventos: [],
    }
  },

  async created(){
    await this.getItems();
    await this.getEventos()
  },

  computed: {
    tituloDialog: function() {
      return this.atividade.id ? 'Editar': 'Criar';
    }
  },

  watch: {
    ativo(valor) {
      if (valor == false) {
        this.resetAtividade()
      }
    }
  },

  methods: {
    resetAtividade() {
      this.atividade = {
        id: null,
        nome: null,
        dataInicio: null,
        dataFim: null,
        local: null,
        idEvento: null
      }
      this.ativo = false;
    },

    async persist() {
      if (this.atividade.id) {
        const response = await this.$api.post(`/atividade/persist/${this.atividade.id}`, this.atividade);
      } else {
        const response = await this.$api.post('/atividade/persist', this.atividade);
      }
      this.resetAtividade()
      await this.getItems();
    },

    editItem(item) {
      this.atividade = {
        ...item
      };
      this.ativo = true;
    },

    async deleteItem(item) {
      if (confirm(`Deseja deletar o registro com id ${item.id}`)) {
        const response = await this.$api.post('/atividade/destroy'  );
        if (response.type == 'error') {
          alert(response.message);
        }
      }
      await this.getItems();
    },

    async getEventos() {
      const response = await this.$api.get('/evento');
      this.eventos = response.data;
    },

    async getItems() {
      const response = await this.$api.get('/atividade');
      this.items = response.data;
      this.loading = false;
    }
  }
}
</script>
