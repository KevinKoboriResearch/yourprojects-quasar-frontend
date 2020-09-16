<template>
  <!-- <div> -->
  <q-card class="q-mb-md">
    <q-card-section horizontal>
      <q-img
        v-if="article.imageUrl"
        class="col-5"
        :src="article.imageUrl"
        style="min-height: 150px;"
        alt="Article"
      />
      <q-img
        v-else
        class="col-5"
        :src="require('../../assets/article/1.gif')"
        alt="Article"
      />
      <!-- style="min-height: 50px;" -->

      <q-card-section class="q-pt-xs">
        <!-- >Categoria:<br>
          <p class="text-orange">>Categoria:<br>
          <p class="text-orange"> -->
        <div class="text-overline text-orange">{{ article.categoryName }}
        </div>
        <div class="text-h6 q-mt-sm q-mb-xs">
          <!-- {{article.name}} -->
          {{ $mq === 'xs' ? article.name.substring(0,12) : $mq === 'sm' ?
            article.name.substring(0,11) : article.name.substring(0,11)}}
        </div>
        <div class="text-caption text-grey">
          {{ $mq === 'xs' ? article.description.substring(0,130)
            : $mq === 'sm' ? article.description.substring(0,50)
            : article.description.substring(0,80)}}
        </div>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        flat
        :to="{ name: 'articleById', params: { id: article.id } }"
      >
        Ler Artigo
      </q-btn>
      <q-btn
        flat
        color="primary"
        @click.stop="onNodeArticles()"
      >
        Compartilhar
      </q-btn>
    </q-card-actions>
  </q-card>

  <!-- <div class="article-item">
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="article-item-image d-none d-sm-block">
                <img v-if="article.imageUrl"
                    :src="article.imageUrl"
                    height="150" width="150" alt="Article">
                <img v-else
                    src="../../assets/article.png"
                    height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>Categoria: {{ article.categoryName }}</h2>
                <h2>Artigo: {{ article.name }}</h2>
                <p>Descricão:{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.author }}
                </span>
            </div>
        </router-link>
    </div> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['article'],
  data () {
    return {
      // descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    onNodeArticles (id) {
      this.$router.push({
        name: 'userArticlesByCategory',
        params: { id: JSON.parse(this.article.categoryId) }
      })
    }
  }
}
</script>

<style>
.article-item {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.article-item a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.article-item-info h2 {
  font-size: 1.7rem;
}

.article-item-image {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.article-item-image img {
  border-radius: 5px;
}

.article-item-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.article-item-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
