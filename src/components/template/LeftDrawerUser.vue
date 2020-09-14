<template>
  <div>
    <!-- {{nodeData.selected.map(el => el.text)}} -->
    <q-toolbar
      class="q-pa-sm"
      :class="$q.dark.isActive ? 'bg-grey-10 text-white': 'text-black'"
    >
      <q-input
        dense
        standout
        v-model="treeFilter"
        input-class="text-left"
        style="width: 100%;"
      >
        <template v-slot:append>
          <q-icon
            v-if="treeFilter === ''"
            name="search"
          />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="treeFilter = ''"
          />
        </template>
      </q-input>
    </q-toolbar>
    <q-btn
      dense
      @click.stop="addNew()"
      class="q-mx-md q-mt-md"
      :class="$q.dark.isActive ? 'bg-grey-10 text-white': 'text-teal'"
    >
      <!-- icon="mdi-plus-box"
      size="12px" -->
      <i class="q-px-xs fas fa-plus-square"></i>
    </q-btn>
    <Tree
      v-if="renderComponent"
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="tree"
    >
      <!-- v-model="nodeData" -->
      <!-- <div v-if="node.text == user.id"> -->
      <div slot-scope="{ node }">
        <div class="">{{ node.text }}</div>
        <!-- <div v-if="userEditable(node.id) == true"> -->
        <!-- <q-btn
          dense
          class="text-teal"
          @click.stop="userEditable(node)"
        >?</q-btn> -->
        <q-btn
          dense
          class="text-teal"
          @click.stop="editNode(node)"
        ><i class="q-px-xs fas fa-pen-square"></i></q-btn>
        <q-btn
          dense
          class="text-teal"
          @click.stop="removeNode(node)"
        ><i class="q-px-xs fas fa-minus-square"></i></q-btn>
        <!-- minum = true -->
        <q-btn
          dense
          class="text-teal"
          @click.stop="addChildNode(node)"
        >
          <i class="q-px-xs fas fa-plus-square"></i>
        </q-btn>
      </div>
      <!-- </div> -->
    </Tree>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import Tree from 'liquor-tree'
import axios from 'axios'

export default {
  components: { Tree },
  data () {
    return {
      user: {},
      minum: false,
      category: {},
      // nodeData: null,
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        // data: { 'text': 'name' },
        propertyNames: {
          'text': 'name'
          // 'userId': 'userId'
        }, //, 'userId': 'userId'
        filter: { emptyText: 'Categoria não encontrada' }
        // fetchData: (node) => {
        //   return treeData[node.id - 1].userId
        // },
      },
      renderComponent: true,
    }
  },
  methods: {
    userEditable (id) {
      let userAcessible = false
      // console.log(this.treeData)
      for (let i = 0; i < this.treeData.length; i++) {
        // if (this.treeData[i].id == id && this.treeData[i].userId == user.id) {
        userAcessible = true
        // console.log(userAcessible)
        // }
      }
      return userAcessible
      // const compareId = treeData.filter(td => {
      //   td.userId == this.user.id
      // })
      // if (compareId == node.id)
      // console.log(node)
    },
    reloadMinum2 () {
      if (this.minum === true) {
        location.reload()
      }
    },
    forceRerenderTree () {
      this.renderComponent = false
      this.$nextTick().then(() => {
        this.renderComponent = true
        this.treeData = this.getTreeData()
        this.minum = true
      });
    },
    editNode (node, e) {
      this.reloadMinum2()
      node.startEditing()
    },
    removeNode (node) {
      axios.delete(`${baseApiUrl}/categories/${node.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.forceRerenderTree()
        })
        .catch(showError)
    },
    addChildNode (node) {
      if (node.enabled()) {
        this.save(node, true)
      }
    },
    getTreeData () {
      this.loadUser()
      // const url = `${baseApiUrl}/categories/tree`
      // this.user.id
      // console.log(this.user)
      const url = `${baseApiUrl}/user/${this.user.id}/categories/tree`
      return axios.get(url).then(res => {
        // console.log(res.data)
        return res.data
      })
    },
    onNodeSelect (node) {
      this.$router.push({
        name: 'articlesByCategory',
        params: { id: JSON.parse(node.id) }
      })
    },
    makeid (length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    loadCategory (node) {
      const category = {}
      const url = `${baseApiUrl}/categories${node.id}`
      axios.get(url).then(res => {
        category = res.data.map(category => {
          return { id: category.id, name: category.name, parentId: category.parentId }
        })
      })
      return category
    },
    addNew () {
      this.category = {}
      this.category.name = this.makeid(5)
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.forceRerenderTree()
        })
        .catch(showError)
    },
    save (node, child = false) {
      this.category = {}
      if (!child) {
        this.category.id = node.id
        this.category.name = node.text
        this.category.parentId = node.parentId
      } else {
        this.category.name = this.makeid(5)
        this.category.parentId = node.id
      }
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios.post(`${baseApiUrl}/categories`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
        })
        .catch(showError)

      setTimeout(function () {
        location.reload()
      }, 700)
    },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    },
  },
  mounted () {
    this.loadUser()
    this.$refs.tree.$on('node:clicked', this.onNodeSelect)
    this.$refs.tree.$on('node:editing:stop', (node) => {
      this.save(node, false)
    })
  }
}
</script>
