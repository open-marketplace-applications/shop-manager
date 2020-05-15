<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div>Amount: {{ limiitedEditionCount }}</div>
    <div v-for="(name, index) in names" :key="index"><div v-if="name">{{ name }},</div></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAmount, getList } from '@/api/orders'

export default {
  name: 'dashboard',
  data() {
    return {
      limiitedEditionCount: 0,
      listLoading: false,
      list: []
    }
  },
  created() {
    this.getAmount()
    this.fetchData()
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    names() {
      return this.list.map(a => {
        if (a.print_name) {
          return a.print_name
        } else if (a.print_name === '') {
          console.log('no')
        }
      })
    }
  },
  methods: {
    getAmount() {
      getAmount(this.listQuery, this.$store.getters.token).then(result => {
        console.log('result', result)
        this.limiitedEditionCount = result.amount
      })
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery, this.$store.getters.token).then(response => {
        this.list = response
        console.log('list', this.list)
        this.listLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
