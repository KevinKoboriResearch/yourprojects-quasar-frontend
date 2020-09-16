<template>
  <div>
    <!-- <q-toolbar :class="$q.dark.isActive ? 'text-white': 'text-black'">
      <q-input
        @change="getArticles"
        placeholder="pesquise aqui todos artigos..."
        dense
        standout
        v-model="searchArticleAll"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchArticleAll === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchArticleAll = ''"
          />
        </template>
      </q-input>
    </q-toolbar> -->
    <!-- <PageTitle
      icon="fa fa-folder-o"
      :main="category.name"
      sub="Categoria"
    /> -->
    <q-card class="bg-transparent no-shadow no-border q-pa-md">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #f37169"
              class="q-pa-none q-ml-xs "
            >
              <q-item-section
                side
                style="background-color: #f34636"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="fab fa-twitter"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{countCategories}}</q-item-label>
                <!-- {{categories[0].children.length}} -->
                <q-item-label>Categories here</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #5064b5"
              class="q-pa-none q-ml-xs"
            >
              <q-item-section
                side
                style="background-color: #3e51b5"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="far fa-newspaper"
                  color="white"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{articles.length}}</q-item-label>
                <q-item-label>All Articles</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #ea6a7f"
              class="q-pa-none q-ml-xs"
            >
              <q-item-section
                side
                style="background-color: #ea4b64"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="fab fa-google"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">50</q-item-label>
                <q-item-label>Connections</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <q-item
              style="background-color: #a270b1"
              class="q-pa-none q-ml-xs q-mr-xs"
            >
              <q-item-section
                side
                style="background-color: #9f52b1"
                class=" q-pa-lg q-mr-none text-white"
              >
                <q-icon
                  name="bar_chart"
                  size="24px"
                ></q-icon>
              </q-item-section>
              <q-item-section class=" q-pa-md q-ml-none  text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">1020</q-item-label>
                <q-item-label> Website Visits</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-toolbar :class="$q.dark.isActive ? 'text-white': 'text-black'">
      <q-input
        @change="getArticles"
        placeholder="pesquise aqui os artigos desta categoria..."
        dense
        standout
        v-model="searchArticle"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="searchArticle === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="searchArticle = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <!-- {{searchArticle}}
    {{searchArticleAll }} -->
    <div class="fit row wrap justify-start items-start content-start">
      <div
        class="q-pt-md q-px-md col-xs-12 col-sm-6 col-md-4"
        v-for="article in articles"
        :key="article.id"
        v-if="searchArticle === '' || article.name.includes(searchArticle) || article.description.includes(searchArticle)"
      >
        {{article}}
        <ArticleItem :article="article" />
      </div>
      <!-- <div
        class="q-pt-md q-px-md col-xs-12 col-sm-6 col-md-4"
        v-for="article in articles"
        :key="article.id"
        v-if="searchArticleAll === '' || article.name.includes(searchArticleAll) || article.description.includes(searchArticleAll)"
      >
        <ArticleItem :article="article" />
      </div> -->
    </div>
    <div class="column justify-center items-center">
      <q-btn
        v-if="loadMore"
        class="bg-orange-14"
        label="Carregar Mais Artigos"
        @click="getArticles"
      />
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey } from '../../global'
import axios from 'axios'
// import PageTitle from '../../components/template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
  name: 'ArticlesByCategory',
  components: { ArticleItem },
  data () {
    return {
      searchArticle: '',
      searchArticleAll: '',
      category: {},
      categories: [],
      countCategories: 0,
      count: 0,
      articles: [],
      page: 1,
      loadMore: true
      // treeOptions: {
      //   propertyNames: { 'text': 'name' },
      //   filter: { emptyText: 'Categoria não encontrada' }
      // }
    }
  },
  methods: {
    getCategory () {
      const url = `${baseApiUrl}/categories/${this.category.id}`
      axios(url).then(res => this.category = res.data)
    },
    // getArticlesByCategory () {
    //   const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
    //   axios(url).then(res => {
    //     this.articles = this.articles.concat(res.data)
    //     this.page++

    //     if (res.data.length === 0) this.loadMore = false
    //   })
    // },
    // loadArticles () {
    //   const url = `${baseApiUrl}/articles?page=${this.page}`
    //   axios.get(url).then(res => {
    //     this.articles = res.data.data
    //     this.count = res.data.count
    //     this.limit = res.data.limit
    //   })
    // },
    getArticles () {
      const url = `${baseApiUrl}/articles?page=${this.page}`
      axios.get(url).then(res => {
        this.articles = this.articles.concat(res.data)
        // this.count = res.data.count
        // this.limit = res.data.limit
        this.page++
        // this.category.id = this.$route.params.id
        // this.getCategory()
        if (res.data.data.length === 0) this.loadMore = false
      })
    },
    countTree (cat) {
      for (let i = 0; i < cat[0].children.length; i++) {
        this.count++
        this.categoryYet = [cat[0].children[i]]
        this.countTree(this.categoryYet)
      }
    },
    //     getTreeData () {
    //   const url = `${baseApiUrl}/categories/tree`
    //   return axios.get(url).then(res => res.data)
    // },
    loadCategories () {
      this.loadUser()
      const url = `${baseApiUrl}/categories/tree`
      axios.get(url).then(res => {
        this.categories = res.data
        this.countTree(this.categories)
        this.countCategories = this.count
        this.count = 0
      })
    },
    // getArticles () {
    //   const url = `${baseApiUrl}/articles?page=${this.page}`
    //   axios.get(url).then(res => {
    //     this.articles = res.data
    //   })
    // }
  },
  // watch: {
  //   $route (to) {
  //     this.category.id = to.params.id
  //     this.articles = []
  //     this.page = 1
  //     this.loadMore = true

  //     this.getCategory()
  //     this.getArticles()
  //   }
  // },
  mounted () {
    // this.category.id = this.$route.params.id
    // this.getCategory()
    this.getArticles()
    this.loadCategories()
  }
}
</script>

<style>
/* .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    } */

/* .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    } */
</style>
