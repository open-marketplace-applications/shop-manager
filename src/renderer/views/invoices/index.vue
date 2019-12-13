<template>
  <div class="app-container">
      <button @click="createPDF()">Download open Invoices</button>
      <br>
      <span v-for="(supporter, index) in list" :key="index">{{supporter}}</span>
  </div>
</template>

<script>
import { getList } from '@/api/orders'
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
    createPDF() {
      console.log('length', this.list.length)

      var fontSizes = {
        HeadTitleFontSize: 18,
        Head2TitleFontSize: 16,
        TitleFontSize: 14,
        SubTitleFontSize: 12,
        NormalFontSize: 10,
        SmallFontSize: 8
      }

      const pdfName = 'test'
      var doc = new PDF()
      doc.setFontSize(fontSizes.SubTitleFontSize)
      doc.setFont('times')

      this.list.forEach(invoice => {
        doc.addPage()
        doc.text(`${invoice.first_name} ${invoice.last_name}`, 10, 50)
        doc.text(`${invoice.address}`, 10, 55)
        doc.text(`${invoice.zip_code} ${invoice.city}`, 10, 60)
        var img = new Image()
        img.src = './' + this.logo
        doc.addImage(img, 'PNG', 170, 10, 25, 25)

        doc.text(`Hallo ${invoice.first_name}$,`, 10, 100)
        doc.text(`danke das Du das einfachIOTA Magazin vorbestellt hast!`, 10, 105)
        doc.text(`Wir wünschen dir viel Spaß damit,`, 10, 110)
        doc.text(`Dein einfachIOTA Team.`, 10, 120)
      })
      doc.save(pdfName + '.pdf')
    }
  }
}
</script>
