<template>
    <div class="user-admin">
        <b-form v-show="showForm">
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12">
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirmação de Senha:"
                        label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>

        <q-table
            title="Treats"
            :data="users"
            :columns="columns"
            row-key="name"
        >

            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                      <b-button variant="primary" v-show="showForm"
                            @click="loadUser(props.row, 'save'), props.expand = !props.expand, showForm = !showForm"
                      >Editar</b-button>
                      <!-- <div class="columnq-px-xl"></div> -->
                      <b-button variant="danger" v-show="showForm"
                            @click="loadUser(props.row, 'remove'), props.expand = !props.expand, showForm = !showForm"
                      >Excluir</b-button>
                        <!-- <q-btn v-show="showForm" color="green" style="background-color: black;" label="delete"
                            @click="loadUser(props.row, 'remove'), props.expand = !props.expand, showForm = !showForm"
                        />
                        <q-btn v-show="showForm" size="sm" color="green" round dense
                        @click="loadUser(props.row, 'save'), props.expand = !props.expand,
                        showForm = !showForm" :icon="props.expand ? 'remove' : 'add'" /> -->
                    </q-td>
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.value }}
                    </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <b-form>
                            <input id="user-id" type="hidden" v-model="user.id" />
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Nome:" label-for="user-name">
                                        <b-form-input id="user-name" type="text"
                                            v-model="user.name" required
                                            :readonly="mode === 'remove'"
                                            placeholder="Informe o Nome do Usuário..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12">
                                    <b-form-group label="E-mail:" label-for="user-email">
                                        <b-form-input id="user-email" type="text"
                                            v-model="user.email" required
                                            :readonly="mode === 'remove'"
                                            placeholder="Informe o E-mail do Usuário..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                                v-model="user.admin" class="mt-3 mb-3">
                                Administrador?
                            </b-form-checkbox>
                            <b-row v-show="mode === 'save'">
                                <b-col md="6" sm="12">
                                    <b-form-group label="Senha:" label-for="user-password">
                                        <b-form-input id="user-password" type="password"
                                            v-model="user.password" required
                                            placeholder="Informe a Senha do Usuário..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Confirmação de Senha:"
                                        label-for="user-confirm-password">
                                        <b-form-input id="user-confirm-password" type="password"
                                            v-model="user.confirmPassword" required
                                            placeholder="Confirme a Senha do Usuário..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col xs="12">
                                    <b-button variant="primary" v-if="mode === 'save'"
                                        @click="save">Salvar</b-button>
                                    <b-button variant="danger" v-if="mode === 'remove'"
                                        @click="remove">Excluir</b-button>
                                    <b-button class="ml-2"
                                    @click="reset, user = {}, props.expand = !props.expand, showForm = !showForm, mode = 'save'">Cancelar</b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    <!-- <q-table
      title="Treats"
      :data="users"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
                        <q-btn v-show="showForm" color="green" style="background-color: black;" label="delete"
                            @click="loadUser(props.row, 'remove'), props.expand = !props.expand, showForm = !showForm"
                        />
                        <q-btn v-show="showForm" color="green" style="background-color: black;" label="delete"
                            @click="loadUser(props.row, 'remove'), props.expand = !props.expand, showForm = !showForm"
                        />
                    </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
          </q-td>
        </q-tr>
      </template>

    </q-table> -->
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            showForm: true,
            mode: 'save',
            user: {},
            users: [],
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data
            })
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>

<style>

</style>
