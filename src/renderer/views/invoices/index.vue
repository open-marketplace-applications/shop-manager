<template>
  <div class="app-container">
      <button @click="send()">Send orders</button>
      <br>
      <span v-for="(supporter, index) in list" :key="index">{{supporter}}</span>
  </div>
</template>

<script>
import { getList } from '@/api/orders'
import { sendOrders } from '@/api/orders'
import { createInvoice } from '@/utils/invoice_generator'
import logo from '@/assets/logo.png'
import { jsPDF as PDF } from 'jspdf'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      logo: logo
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
    send() {
      this.listLoading = true
      sendOrders(this.listQuery, this.$store.getters.token).then(response => {
        this.list = response

        const pdfName = 'test'
        var doc = new PDF()
        doc.setFont('open-sans')

        // Laufe durch alle Reechnungen durch
        this.list.forEach(invoice => {
          let count = invoice.amount || 1
          while (count) {
            doc = createInvoice(doc, invoice, null)

            count = count - 1
          }
        })
        // Save rhe PDF
        doc.save(pdfName + '.pdf')

        this.listLoading = false
      })
    }
  }
}
</script>
