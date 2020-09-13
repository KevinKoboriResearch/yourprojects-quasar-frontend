<template>
  <div>
    <q-toolbar :class="$q.dark.isActive ? 'bg-grey-10 text-white': 'text-black'">
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
    <!-- href="#" -->
    <q-btn @click.stop="addNew()">add raiz</q-btn>
    <Tree
      v-if="renderComponent"
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      class="tree"
    >
      <div
        slot-scope="{ node }"
        class="node-container"
      >
        <div class="node-text">{{ node.text }}</div>
        <div class="node-controls">
          <!-- href="#" -->
          <q-btn @click.stop="editNode(node)">{{minum}}</q-btn>
          <!-- href="#" -->
          <q-btn @click.stop="removeNode(node), minum = true">-</q-btn>
          <!-- href="#" -->
          <q-btn @click.stop="addChildNode(node)">+</q-btn>
        </div>
      </div>
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
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: { 'text': 'name' },
        filter: { emptyText: 'Categoria não encontrada' }
        // fetchData: (node) => {
        //   return Promise.resolve(data[node.id])
        // },
      },
      renderComponent: true,
    }
  },
  methods: {
    reloadMinum2 () {
      if (this.minum === true) {
        location.reload()
      }
    },
    forceRerender () {
      this.renderComponent = false
      this.$nextTick().then(() => {
        this.renderComponent = true
        // this.treeData = this.getTreeData()
      });
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
      // if (confirm('Are you sure?')) {
      axios.delete(`${baseApiUrl}/categories/${node.id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.forceRerenderTree()
        })
        .catch(showError)
      // }
    },
    addChildNode (node) {
      if (node.enabled()) {
        this.save(node, true)
        // this.saveChild(node)
      }
    },
    // addNew (node) {
    //   if (node.enabled()) {
    //     this.save(node)
    //   }
    // },
    getTreeData () {
      const url = `${baseApiUrl}/categories/tree`
      return axios.get(url).then(res => res.data)
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
    //     loadCategory (category) {
    //   this.category = { ...category }
    // },
    //     loadCategories () {
    //   const url = `${baseApiUrl}/categories`
    //   axios.get(url).then(res => {
    //     this.tableCategories = res.data.map(category => {
    //       return { id: category.id, name: category.name, path: category.path }
    //     })
    //     this.categories = res.data.map(category => {
    //       return { ...category, label: category.path, value: category.id }
    //     })
    //   })
    // },
    loadCategory (node) {
      const category = {}
      console.log('oioioi ' + this.category.id)
      const url = `${baseApiUrl}/categories${node.id}`
      axios.get(url).then(res => {
        // this.tableCategories = res.data.map(category => {
        //   return { id: category.id, name: category.name, path: category.path }
        // })
        category = res.data.map(category => {
          return { id: category.id, name: category.name, parentId: category.parentId }
        })
      })
      console.log('heyyheyhey ' + this.category.parentId)
      return category
      // })
    },
    addNew () {
      this.category.id = undefined
      this.category.name = this.makeid(5) //'nova raiz ' +  Math.floor(Math.random() * (100000 - 0))
      this.category.userId = this.user.id
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          // location.reload()
          this.forceRerenderTree()
        })
        .catch(showError)
    },
    async save (node, child = false) {
      if (!child) {
        this.category.id = node.id
        // this.category = category
        this.category.name = node.text
        this.category.parentId = node.parentId
        // this.category.userId = this.user.id
      } else {
        this.category.name = this.makeid(5) //'novo nó ' + Math.floor(Math.random() * (1000 - 0))
        this.category.parentId = node.id
      }
      this.category.userId = this.user.id
      // console.log(this.user.id)
      // const category = {}
      // console.log('oioioi ' + this.category.id)
      // const url = `${baseApiUrl}/categories${node.id}`
      // await axios.get(url).then(res => {
      //   // this.tableCategories = res.data.map(category => {
      //   //   return { id: category.id, name: category.name, path: category.path }
      //   // })
      //   this.category = res.data.map(category => {
      //     return { id: category.id, name: category.name, parentId: category.parentId }
      //   })
      // })
      // this.category = await this.loadCategory(node)
      // this.category.id = node.id
      // // this.category = category
      // this.category.name = node.text
      // this.category.parentId = node.parentId
      // this.category.userId = this.user.id
      // this.category.parentId = node.parentId ? node.parentId : null
      const method = this.category.id ? 'put' : 'post'
      const id = this.category.id ? `/${this.category.id}` : ''
      axios.post(`${baseApiUrl}/categories`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          location.reload()
        })
        .catch(showError)
      // const method = this.category.id ? 'put' : 'post'
      // const id = this.category.id ? `/${this.category.id}` : ''
      // // axios[method](`${baseApiUrl}/categories${id}`, this.category)
      // axios[method](`${baseApiUrl}/category/name${id}`, this.category)
      //   .then(() => {
      //     this.$toasted.global.defaultSuccess()
      //     location.reload()
      //     // this.forceRerender()
      //   })
      //   .catch(showError)
      // .catch(() => {
      //   location.reload()
      // }, showError)
    },
    // saveChild (node) {
    //   // console.log(this.category.id)
    //   // this.category.id = ''
    //   // this.forceRerenderTree()
    //   this.category.name = this.makeid(5) //'novo nó ' + Math.floor(Math.random() * (1000 - 0))
    //   this.category.parentId = node.id
    //   this.category.userId = this.user.id
    //   const method = this.category.id ? 'put' : 'post'
    //   const id = this.category.id ? `/${this.category.id}` : ''
    //   axios.post(`${baseApiUrl}/categories`, this.category)
    //     .then(() => {
    //       this.$toasted.global.defaultSuccess()
    //       location.reload()
    //     })
    //     .catch(showError)
    // },
    loadUser () {
      const json = localStorage.getItem(userKey)
      this.user = JSON.parse(json)
    },
  },
  // save (node) {
  //     this.category.id = node.id
  //     this.category.name = node.text
  //     // const method = this.category.id ? 'put' : 'post'
  //     const id = this.category.id ? `/${this.category.id}` : ''
  //     axios.put(`${baseApiUrl}/categories${id}`, this.category)
  //       .then(() => {
  //         this.$toasted.global.defaultSuccess()
  //         this.forceRerenderTree()
  //       })
  //       .catch(showError)
  //   },
  //   saveChild (node) {
  //     // this.category.id = ''
  //     console.log(this.category.id)
  //     this.category.name = Math.floor(Math.random() * (100000 - 0))
  //     this.category.parentId = node.id
  //     // const method = this.category.id ? 'put' : 'post'
  //     // const id = this.category.id ? `/${this.category.id}` : ''
  //     axios.post(`${baseApiUrl}/categories`, this.category)
  //       .then(() => {
  //         this.$toasted.global.defaultSuccess()

  //         // location.reload()
  //       })
  //       .catch(showError)
  //   },
  mounted () {
    this.loadUser()
    this.$refs.tree.$on('node:clicked', this.onNodeSelect)
    this.$refs.tree.$on('node:editing:start', (node) => {
      console.log('Start editing: ' + node.id)
      // if (this.minum === true) {
      //   location.reload()
      // }
    })
    this.$refs.tree.$on('node:editing:stop', (node) => {
      // if (this.minum === true) {
      //   location.reload()
      // }
      this.save(node, false)
    })
    // this.$watch(this.$refs.tree.$on('node:clicked', this.onNodeSelect))
    // this.$watch(this.$refs.tree.$on('node:editing:start', (node) => {
    //   console.log('Start editing: ' + node.id)
    // }))
    // this.$watch(this.$refs.tree.$on('node:editing:stop', (node) => {
    //   this.save(node)
    // }))
  }
}
</script>

<style scoped>
</style>
