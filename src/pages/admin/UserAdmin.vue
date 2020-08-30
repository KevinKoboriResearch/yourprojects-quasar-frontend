<template>
    <div class="user-admin">
          <!-- && Object.keys(user).length === 0 && user.constructor === Object -->
        <b-form v-show="showForm" >
            <input id="user-id" type="hidden" v-model="user.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            placeholder="Informe o Nome do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin"
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox>
            <b-row
            >
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
                    <b-button variant="primary"
                        @click="save">Salvar</b-button>
                    <b-button class="ml-2" @click="reset">Cancelar</b-button>
                </b-col>
            </b-row>
        <hr>
        </b-form>
            <!-- :columns="columns" -->
        <q-table
            :data="users"
            row-key="name"
            style="min-witdh: 100%;"
        >
            <!-- class="row align-start justity-start" -->
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width>
                        <b-button style="max-width: 40px;" variant="primary" class="q-mr-sm"
                            @click="user = {}, showForm = !showForm, expand = false"
                        ><i :class="showForm ? 'fa fa-minus' : 'fa fa-user-plus'"></i></b-button><strong>AÇÕES</strong>
                    </q-th>
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        <strong>
                            {{ col.label }}
                        </strong>
                    </q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <b-button variant="warning" class="q-mr-sm"
                            @click="loadUser(props.row), expand = !expand, showForm = false"
                        ><i class="fa fa-pencil"></i></b-button>
                        <b-button variant="danger" class="q-mr-sm"
                            @click="loadUser(props.row), remove(), showForm = false"
                        ><i class="fa fa-trash"></i></b-button>
                    </q-td>
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.value }}
                    </q-td>
                </q-tr>
                <q-tr v-show="expand === true" :props="props">
                    <q-td colspan="100%">
                        <b-form>
                            <input id="user-id" type="hidden" v-model="user.id" />
                            <b-row>
                                <b-col md="6" sm="12">
                                    <b-form-group label="Nome:" label-for="user-name">
                                        <b-form-input id="user-name" type="text"
                                            v-model="user.name" required
                                            placeholder="Informe o Nome do Usuário..." />
                                    </b-form-group>
                                </b-col>
                                <b-col md="6" sm="12">
                                    <b-form-group label="E-mail:" label-for="user-email">
                                        <b-form-input id="user-email" type="text"
                                            v-model="user.email" required
                                            placeholder="Informe o E-mail do Usuário..." />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-form-checkbox id="user-admin"
                                v-model="user.admin" class="mt-3 mb-3">
                                Administrador?
                            </b-form-checkbox>
                            <b-row
                            >
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
                                    <b-button variant="primary" @click="save">Salvar</b-button>
                                    <b-button class="ml-2" @click="reset, user = {}, expand = false">Cancelar</b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            showForm: false,
            expand: false,
            // mode: 'save',
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
            // this.mode = 'save'
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
        loadUser(user) {
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
