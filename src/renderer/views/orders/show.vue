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
      var fontSizes = {
        HeadTitleFontSize: 20,
        Head2TitleFontSize: 18,
        TitleFontSize: 14,
        SubTitleFontSize: 16,
        NormalFontSize: 15,
        SmallFontSize: 10
      }

      const pdfName = 'test'
      var doc = new PDF()
      doc.setFont('open-sans')

      let count = this.order.amount || 1
      while (count) {
        doc.setFontSize(fontSizes.NormalFontSize)
        // Hänge eine neue Seite an.
        doc.addPage()

        // Anschrift
        doc.text(`${this.order.first_name} ${this.order.last_name}`, 20, 56)
        doc.text(`${this.order.address}`, 20, 62)
        doc.text(`${this.order.zip_code} ${this.order.city}`, 20, 68)
        doc.text(`${this.order.country}`, 20, 74)

        // einfachIOTA Logo
        var img = new Image()
        img.src = './' + this.logo
        doc.addImage(img, 'PNG', 150, 40, 25, 25)

        // Anschreiben Text
        doc.text(`Hallo ${this.order.first_name},`, 20, 120)
        doc.text(`vielen Dank, dass Du das einfachIOTA Magazin bestellt hast!`, 20, 136)
        doc.text(`Wir wünschen Dir viel Spaß beim Lesen,`, 20, 142)
        doc.text(`Dein einfachIOTA Team.`, 20, 154)

        doc.setFontSize(fontSizes.SmallFontSize)
        doc.text(`Wir erklären IOTA einfach - www.einfachIOTA.de`, 20, 280)
        count = count - 1
      }

      // Save rhe PDF
      doc.save(pdfName + '.pdf')
    }
  }
}
</script>

<style lang="scss">
</style>