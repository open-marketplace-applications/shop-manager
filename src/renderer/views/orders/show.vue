<template>
    <div>
      <h2>Order data</h2>
      <pre>{{order}}</pre>
    </div>
</template>

<script>
import { getOrder } from '@/api/orders'

export default {
  name: 'OrderDetails',
  components: { },
  params: ['id'],
  data() {
    return {
      order: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      console.log('ididid', this.$route.params.id)
      getOrder(this.$route.params.id).then(response => {
        console.log('response', response)
        this.order = response
      })
    }
  }
}
</script>

<style lang="scss">
</style>