<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      @mouseover.native="menuOver = true"
      @mouseout.native="menuOver = false"
      v-model="menu"
      auto-close
      :label="user.name"
      dropdown-icon="mdi-triangle"
      style="background-color: #ffffff22;"
      :content-style="{ backgroundColor: '#ffffff22' }"
    >
    <!-- <Gravatar :email="user.email" alt="User" /> -->
    <!-- <div style="height:18px"></div> -->
      <q-list class="q-pt-md" @mouseover.native="listOver = true" @mouseout.native="listOver = false">
        <q-item to="/admin" v-if="user.admin">
          <!-- v-if="user.admin" -->
          <q-item-section>
            <q-item-label>Admin Pages</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/user/articles">
          <q-item-section>
            <q-item-label>Meu Blog</q-item-label>
          </q-item-section>
        </q-item>
        <q-item @click.prevent="logout()" clickable>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { debounce } from 'quasar'
import { userKey } from '../../global'
// import Gravatar from 'vue-gravatar'

export default {
  // components: { Gravatar },
  data () {
    return {
      menu: false,
      menuOver: false,
      listOver: false
    }
  },
  computed: {
    user: {
      get () {
        return this.$store.state.user.user
      },
      set (val) {
        this.$store.commit('user/setUser', val)
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('user/setUser', null)
      this.$router.push({ name: 'auth' })
    },
    debounceFunc: debounce(function () { this.checkMenu() }, 0),
    onItemClick () {
      console.log('Clicked on an Item')
    },
    checkMenu () {
      if (this.menuOver || this.listOver) {
        this.menu = true
      } else {
        this.menu = false
      }
    }
  },
  watch: {
    menuOver (val) {
      this.debounceFunc()
    },
    listOver (val) {
      this.debounceFunc()
    }
  }
}
</script>

<style>

</style>
