<template>
  <div class="app-container">
      <button @click="createPDF()">Download open Invoices</button>
      <br>
      <span v-for="(supporter, index) in list" :key="index">{{supporter}}</span>
  </div>
</template>

<script>
import { getList } from '@/api/orders'
import { jsPDF as PDF } from 'jspdf'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery, this.$store.getters.token).then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    createPDF() {
      const pdfName = 'test'
      var doc = new PDF()
      doc.text('Hello World', 10, 10)
      doc.save(pdfName + '.pdf')
      console.log('doc', doc)
    }
  }
}
</script>
