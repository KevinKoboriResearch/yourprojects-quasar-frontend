<template>
  <q-layout
    class="selectDisable"
    :view="user ? 'hHh LpR lFf' : 'hHh LpR lff'"
    :style="$q.dark.isActive ? 'background:linear-gradient( 180deg, #16434d 0%, #c1f4ff 100%)' : 'background:linear-gradient( 180deg, #c1f4ff 0%, #16434d 100%)'"
  >
    <!-- <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />
        <q-space v-if="!user && $q.screen.lt.sm" />
        <img
          class="q-pa-xs q-pl-sm"
          @click="$q.dark.toggle()"
          src="../assets/logo/your-design-trans-white.png"
          height="32"
        >
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            square
            dense
            flat
            to="/"
            label="Dashboard"
            icon="dashboard"
          >
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Pricing"
            label="Pricing"
            icon="lock"
          >
            <q-tooltip>Pricing</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Lock-2"
            label="Lock"
            icon="lock"
          >
            <q-tooltip>Lock</q-tooltip>
          </q-btn>

          <q-space v-if="!user && $q.screen.lt.sm" />

          <q-space />

          <UserDropdown v-if="user && !right" />

          <q-btn
            v-if="!user"
            dense
            flat
            icon="fa fa-user"
            to="auth"
          />
          <q-btn
            v-else
            dense
            flat
            :size="right ? '16px' : '12px'"
            :class="right ? 'q-py-none q-px-xs' : 'q-py-xs q-px-sm'"
            :icon="right ? 'fas fa-window-close' : 'fa fa-user-cog'"
            @click="right = !right"
          />

        </div>

      </q-toolbar>
      <q-tabs v-if="!user">
        <q-space v-if="$q.screen.gt.xs" />
        <q-route-tab
          label="Início"
          to="/"
        />
        <q-route-tab
          label="Sobre"
          to="/about"
        />
        <q-route-tab
          label="Serviços"
          to="/services"
        />
        <q-route-tab
          label="Dúvidas"
          to="/doubts"
        />
      </q-tabs>
    </q-header> -->
    <q-header
      v-if="!validatingToken"
      height-hint="98"
      class="selectDisable text-white"
      style="background-color: #000000"
    >
      <q-toolbar>
        <q-btn
          square
          dense
          flat
          icon="menu"
          @click="left = !left"
        >
          <q-tooltip v-if="$q.screen.gt.xs">menu</q-tooltip>
        </q-btn>

        <q-space v-if="!user && $q.screen.lt.sm" />

        <!-- <q-toolbar-title> -->
        <div>
          <!-- class="q-px-xs q-pt-xs" -->
          <img
            style="margin-top: 8px;"
            class="q-px-sm"
            @click="$q.dark.toggle()"
            src="../assets/logo/your-design-trans-white.png"
            height="22"
          >
          <q-tooltip v-if="$q.screen.gt.xs">projects</q-tooltip>
        </div>
        <!-- </q-toolbar-title> -->
        <q-space />

        <!-- <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            square
            dense
            flat
            to="/"
            label="Dashboard"
            icon="dashboard"
          >
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Pricing"
            label="Pricing"
            icon="lock"
          >
            <q-tooltip>Pricing</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Lock-2"
            label="Lock"
            icon="lock"
          >
            <q-tooltip>Lock</q-tooltip>
          </q-btn> -->

        <q-space v-if="!user && $q.screen.lt.sm" />

        <q-space />

        <UserDropdown v-if="user && !right" />

        <q-btn
          v-if="!user"
          dense
          flat
          icon="fa fa-user"
          to="auth"
        />
        <!-- padding="none" -->
        <q-btn
          :size="right ? '17px' : '10px'"
          v-else
          dense
          flat
          :padding="right ? 'none' : ''"
          :class="right ? '' : 'q-pa-xs'"
          :icon="right ? 'mdi-close' : 'fa fa-user-cog'"
          @click="right = !right"
        >
          <q-tooltip v-if="$q.screen.gt.xs">config</q-tooltip>
        </q-btn>

        <!-- </div> -->
      </q-toolbar>

      <q-tabs v-if="!user">
        <q-space v-if="$q.screen.gt.xs" />
        <q-route-tab
          label="Início"
          to="/"
        />
        <q-route-tab
          label="Sobre"
          to="/about"
        />
        <q-route-tab
          label="Serviços"
          to="/services"
        />
        <q-route-tab
          label="Dúvidas"
          to="/doubts"
        />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="left"
      show-if-above
      side="left"
      bordered
      content-class="bg-white"
    >
      <LeftDrawer v-if="!user" />
      <LeftDrawerAdmin v-else-if="user.admin" />
      <LeftDrawerUser v-else />
    </q-drawer>

    <!-- show-if-above -->
    <q-drawer
      v-if="user"
      v-model="right"
      side="right"
      bordered
      content-class="bg-white"
    >
      <RightDrawer v-if="user" />
    </q-drawer>

    <q-page-container>
      <Loading v-if="validatingToken" />
      <div v-else>
        <router-view class="q-pa-md" />
        <whatsapp />
      </div>
    </q-page-container>

    <q-footer
      v-if="!validatingToken"
      bordered
      class="selectDisable bg-black text-white"
    >

      <q-toolbar v-if="!user">
        <img
          src="../assets/logo/your.png"
          height="25"
          class
        >
        <q-toolbar-title>
          Projects
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs
        dense
        v-if="user"
      >
        <!-- <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            square
            dense
            flat
            to="/"
            label="Dashboard"
            icon="dashboard"
          >
            <q-tooltip>Dashboard</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Pricing"
            label="Pricing"
            icon="lock"
          >
            <q-tooltip>Pricing</q-tooltip>
          </q-btn>
          <q-btn
            square
            dense
            flat
            to="/Lock-2"
            label="Lock"
            icon="lock"
          >
            <q-tooltip>Lock</q-tooltip>
          </q-btn> -->
        <q-space v-if="$q.screen.gt.xs" />
        <q-route-tab
          label="Articles"
          to="/articles"
        />
        <q-route-tab
          label="Sobre"
          to="/about"
        />
        <q-route-tab
          label="Serviços"
          to="/services"
        />
        <q-route-tab
          label="Dúvidas"
          to="/doubts"
        />
      </q-tabs>
    </q-footer>

  </q-layout>
</template>

<script>
import axios from "axios"
import { baseApiUrl, userKey } from "../global"
import { mapState } from "vuex"
// import Header from "../components/template/Header"
// import Menu from "../components/template/Menu"
// import Content from "../components/template/Content"
// import Footer from "../components/template/Footer"
import Loading from "../components/template/Loading"
import LeftDrawer from "../components/template/LeftDrawer"
import LeftDrawerAdmin from "../components/template/LeftDrawerAdmin"
import LeftDrawerUser from "../components/template/LeftDrawerUser"
import RightDrawer from "../components/template/RightDrawer"
import UserDropdown from '../components/template/UserDropdown'
import whatsapp from '../components/whatsapp/Dynamicwhatsapp'
// import Btn from '../components/template/Btn'

export default {
  name: "App",
  components: {
    UserDropdown,
    // Btn,
    // Menu,
    // Content,
    // Footer,
    Loading,
    LeftDrawer,
    LeftDrawerUser,
    LeftDrawerAdmin,
    RightDrawer,
    whatsapp
  },
  data () {
    return {
      // left: false,
      // right: false,
      validatingToken: true
    }
  },
  computed: {
    right: {
      get () {
        return this.$store.state.rightDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('rightDrawer/toggleMenu', val)
      }
    },
    left: {
      get () {
        return this.$store.state.leftDrawer.isMenuVisible
      },
      set (val) {
        this.$store.commit('leftDrawer/toggleMenu', val)
      }
    },
    // isMenuVisible: {
    //   get () {
    //     return this.$store.state.leftDrawer.isMenuVisible
    //   },
    //   set (val) {
    //     this.$store.commit('leftDrawer/toggleMenu', val)
    //   }
    // },
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
    async validateToken () {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('user/setUser', null)

      if (!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if (res.data) {
        this.$store.commit('user/setUser', userData)

        if (this.$mq === 'xs' || this.$mq === 'sm') {
          this.$store.commit('leftDrawer/toggleMenu', false)
        }
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    }
  },
  created () {
    this.validateToken()
  }
}
</script>

<style>
body::-webkit-scrollbar {
  width: 0px;
}

.selectDisable {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.drawer-bg {
  background-color: white;
}

/* * {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#q-app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#q-app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
} */
</style>
