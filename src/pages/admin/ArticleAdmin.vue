<template>
    <div class="article-admin">
        <!-- <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required

                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="article-description">
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required

                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group
                label="Imagem (URL):" label-for="article-imageUrl">
                <b-form-input id="article-imageUrl" type="text"
                    v-model="article.imageUrl" required

                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>
            <b-form-group
                label="Categoria:" label-for="article-categoryId">
                <b-form-select id="article-categoryId"
                    :options="categories" v-model="article.categoryId" />
            </b-form-group>
            <b-form-group
                label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId" />
            </b-form-group>
            <b-form-group
                label="Conteúdo" label-for="article-content">
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." />
            </b-form-group>
            <b-button variant="primary"
                @click="save">Salvar</b-button>
            <b-button variant="danger"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" /> -->
    <q-form
      v-show="showForm"
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.name"
            label-slot
            hint="Nome - necessário pelo menos 2 caracteres"
            lazy-rules
            :rules="[ val => val && val.length >= 2 || 'Please type something']"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                  Informe o Nome do Artigo...

                <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.description"
            label-slot
            hint="Nome - necessário pelo menos 4 caracteres"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                  Informe a Descrição do Artigo...

                <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-input
            standout
            color="white"
            v-model="article.imageUrl"
            label-slot
            hint="Nome - necessário pelo menos 4 caracteres"
            clearable
          >
            <template v-slot:label>
              <div class="row items-center all-pointer-events">
                <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                  Informe a URL da Imagem...

                <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                  this will be your email login... for more info contact your teacher
                </q-tooltip>
              </div>
            </template>
          </q-input>
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-select
            id="article-parentId"
            standout
            :options="categories"
            v-model="article.categoryId"
            map-options
            emit-value
          />
        </div>
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
          <q-select
            id="category-parentId"
            standout
            :options="users"
            v-model="article.userId"
            map-options
            emit-value
          />
        </div>
      </div>
          <VueEditor v-model="article.content"
            placeholder="Informe o Conteúdo do Artigo..." />
      <div class="row">
        <q-btn @click="save" label="Submit" type="submit" color="primary"/>
        <q-btn @click="reset" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        <q-space/>
        <q-btn @click="showForm = false" label="Cancelar" type="cancel" color="primary" flat class="q-ml-sm" />
      </div>
      <hr>
    </q-form>
    <q-table
      v-show="!showForm"
      :data="articles"
      row-key="name"
      style="min-witdh: 100%;"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width>
            <q-btn flat class="bg-green q-mr-sm" @click="reset(), props.expand = !props.expand, showForm = !showForm">
              <i class="fa fa-user-plus"></i>
            </q-btn>
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
            <q-btn class="bg-yellow q-mr-sm" flat @click="loadArticle(props.row), props.expand = !props.expand">
              <i class="fa fa-user-edit"></i>
            </q-btn>
            <q-btn class="bg-red" flat @click="loadArticle(props.row), confirmDelete()">
              <i class="fa fa-trash-alt"></i>
            </q-btn>
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
            <q-form
              v-show="!showForm"
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <div class="row">
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.name"
                    label-slot
                    hint="Nome - necessário pelo menos 2 caracteres"
                    lazy-rules
                    :rules="[ val => val && val.length >= 2 || 'Please type something']"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                          Informe o Nome do Artigo...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.description"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                          Informe a Descrição do Artigo...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-input
                    standout
                    color="white"
                    v-model="article.imageUrl"
                    label-slot
                    hint="Nome - necessário pelo menos 4 caracteres"
                    clearable
                  >
                    <template v-slot:label>
                      <div class="row items-center all-pointer-events">
                        <q-icon class="q-mr-xs" color="deep-orange" size="24px" name="fa fa-user-tie" />
                          Informe a URL da Imagem...

                        <q-tooltip content-class="bg-grey-8" anchor="top left" self="bottom left" :offset="[0, 8]">
                          this will be your email login... for more info contact your teacher
                        </q-tooltip>
                      </div>
                    </template>
                  </q-input>
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-select
                    id="article-parentId"
                    standout
                    :options="categories"
                    v-model="article.categoryId"
                    map-options
                    emit-value
                  />
                </div>
                <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6">
                  <q-select
                    id="category-parentId"
                    standout
                    :options="users"
                    v-model="article.userId"
                    map-options
                    emit-value
                  />
                </div>
              </div>
                  <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." />
              <div class="row">
                <q-btn @click="save, props.expand = !props.expand" label="Submit" type="submit" color="primary"/>
                <q-btn @click="reset" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                <q-space/>
                <q-btn @click="showForm = false, props.expand = !props.expand" label="Cancelar" type="cancel" color="primary" flat class="q-ml-sm" />
              </div>
              <hr>
            </q-form>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
      return {
        showForm: true,
        article: {},
        articles: [],
        categories: [],
        users: [],
        page: 1,
        limit: 0,
        count: 0,
        fields: [
          { key: 'id', label: 'Código', sortable: true },
          { key: 'name', label: 'Nome', sortable: true },
          { key: 'description', label: 'Descrição', sortable: true },
          { key: 'actions', label: 'Ações' }
        ]
      }
    },
    methods: {
      confirmDelete () {
        this.$q.dialog({
          dark: true,
          title: 'Apagar',
          message: 'Tem certeza que quer apagar este artigo?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.remove()
        }).onCancel(() => {
        }).onDismiss(() => {
        })
      },
        loadArticles() {
          const url = `${baseApiUrl}/articles?page=${this.page}`
          axios.get(url).then(res => {
            this.articles = res.data.data
            this.count = res.data.count
            this.limit = res.data.limit
          })
        },
        reset() {
          this.article = {}
          this.loadArticles()
        },
        save() {
          const method = this.article.id ? 'put' : 'post'
          const id = this.article.id ? `/${this.article.id}` : ''
          axios[method](`${baseApiUrl}/articles${id}`, this.article)
            .then(() => {
              this.$toasted.global.defaultSuccess()
              this.reset()
            })
            .catch(showError)
        },
        remove() {
          const id = this.article.id
          axios.delete(`${baseApiUrl}/articles/${id}`)
            .then(() => {
              this.$toasted.global.defaultSuccess()
              this.reset()
            })
            .catch(showError)
        },
        loadArticle(article) {
          axios.get(`${baseApiUrl}/articles/${article.id}`)
            .then(res => this.article = res.data)
        },
        loadCategories() {
          const url = `${baseApiUrl}/categories`
          axios.get(url).then(res => {
            this.categories = res.data.map(category => {
                return { value: category.id, label: category.path }
            })
          })
        },
        loadUsers() {
          const url = `${baseApiUrl}/users`
          axios.get(url).then(res => {
            this.users = res.data.map(user => {
              return { value: user.id, label: `${user.name} - ${user.email}` }
            })
          })
        }
    },
    watch: {
      page() {
        this.loadArticles()
      }
    },
    mounted() {
        this.loadUsers()
        this.loadCategories()
        this.loadArticles()
    }
}
</script>

<style>

</style>
