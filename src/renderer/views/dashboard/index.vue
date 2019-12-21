<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <div>Amount: {{ limiitedEditionCount }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAmount } from '@/api/orders'

export default {
  name: 'dashboard',
  data() {
    return {
      limiitedEditionCount: 0
    }
  },
  created() {
    this.getAmount()
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    getAmount() {
      getAmount(this.listQuery, this.$store.getters.token).then(result => {
        console.log('result', result)
        this.limiitedEditionCount = result.amount
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
