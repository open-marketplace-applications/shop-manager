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

        // Laufe durch alle Reechnungen durch
        this.list.forEach(invoice => {

          let count = invoice.amount || 1
          while (count) {
            doc.setFontSize(fontSizes.NormalFontSize)
            // Hänge eine neue Seite an.
            doc.addPage()

            // Anschrift
            doc.text(`${invoice.first_name} ${invoice.last_name}`, 20, 56)
            doc.text(`${invoice.address}`, 20, 62)
            doc.text(`${invoice.zip_code} ${invoice.city}`, 20, 68)
            doc.text(`${invoice.country}`, 20, 74)

            // einfachIOTA Logo
            var img = new Image()
            img.src = './' + this.logo
            doc.addImage(img, 'PNG', 150, 40, 25, 25)

            // Anschreiben Text - DE
            // doc.text(`Hallo ${invoice.first_name},`, 20, 120)
            // doc.text(`vielen Dank, dass Du das einfachIOTA Magazin bestellt hast!`, 20, 136)
            // doc.text(`Wir wünschen Dir viel Spaß beim Lesen,`, 20, 142)
            // doc.text(`Dein einfachIOTA Team.`, 20, 154)

            // Anschreiben Text - EN
            doc.text(`Hello ${invoice.first_name},`, 20, 120)
            doc.text(`Thank you for ordering the einfachIOTA magazine!`, 20, 136)
            doc.text(`We hope you enjoy reading it,`, 20, 142)
            doc.text(`Your einfachIOTA Team.`, 20, 154)

            doc.setFontSize(fontSizes.SmallFontSize)
            // DE
            // doc.text(`Wir erklären IOTA einfach - www.einfachIOTA.com`, 20, 280)
            // EN
            doc.text(`IOTA simple and easy - www.einfachIOTA.com`, 20, 280)

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
