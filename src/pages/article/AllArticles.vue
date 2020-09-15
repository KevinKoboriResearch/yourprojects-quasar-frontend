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
        <!-- {{article}} -->
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
import { baseApiUrl } from '../../global'
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
    }
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
