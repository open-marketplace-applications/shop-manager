<template>
    <div>
      <h2>Order data</h2>
      <el-button @click="generatePDF">Generate PDF</el-button>
      <pre>{{order}}</pre>
    </div>
</template>

<script>
import { getOrder } from '@/api/orders'
import logo from '@/assets/logo.png'
import { jsPDF as PDF } from 'jspdf'
import { createInvoice } from '@/utils/invoice_generator'

export default {
  name: 'OrderDetails',
  components: { },
  params: ['id'],
  data() {
    return {
      order: {},
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
      console.log('ididid', this.$route.params.id)
      getOrder(this.$route.params.id, this.$store.getters.token).then(response => {
        console.log('response', response)
        this.order = response
        this.listLoading = false
      })
    },
    generatePDF() {
      if (this.listLoading) {
        console.log('loading.... wait a little bit')
        return
      }
      const pdfName = 'test'
      var doc = new PDF()
      doc.setFont('open-sans')
      doc = createInvoice(doc, this.order, 'DE')

      // Save rhe PDF
      doc.save(pdfName + '.pdf')
    }
  }
}
</script>