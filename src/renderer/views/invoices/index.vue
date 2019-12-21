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
      console.log('send')
      this.listLoading = true
      sendOrders(this.listQuery, this.$store.getters.token).then(response => {
        this.list = response

        console.log('length', this.list.length)

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
          doc.setFontSize(fontSizes.NormalFontSize)
          // Hänge eine neue Seite an.
          doc.addPage()

          // Anschrift
          doc.text(`${invoice.first_name} ${invoice.last_name}`, 20, 50)
          doc.text(`${invoice.address}`, 20, 56)
          doc.text(`${invoice.zip_code} ${invoice.city}`, 20, 62)

          // einfachIOTA Logo
          var img = new Image()
          img.src = './' + this.logo
          doc.addImage(img, 'PNG', 150, 40, 25, 25)

          // Anschreiben Text
          doc.text(`Hallo ${invoice.first_name},`, 20, 120)
          doc.text(`vielen Dank, dass Du das einfachIOTA Magazin bestellt hast!`, 20, 136)
          doc.text(`Wir wünschen Dir viel Spaß beim Lesen,`, 20, 142)
          doc.text(`Dein einfachIOTA Team.`, 20, 154)

          doc.setFontSize(fontSizes.SmallFontSize)
          doc.text(`Wir erklären IOTA einfach - www.einfachIOTA.de`, 20, 280)
        })
        // Save rhe PDF
        doc.save(pdfName + '.pdf')

        this.listLoading = false
      })
    }
  }
}
</script>
