var fontSizes = {
  HeadTitleFontSize: 20,
  Head2TitleFontSize: 18,
  TitleFontSize: 14,
  SubTitleFontSize: 16,
  NormalFontSize: 15,
  SmallFontSize: 10
}

export function createInvoice(doc, invoice, language) {
  doc.setFontSize(fontSizes.NormalFontSize)
  // Hänge eine neue Seite an.
  doc.addPage()

  // Anschrift
  doc.text(`${invoice.first_name} ${invoice.last_name}`, 20, 56)
  console.log('invoice.address.length', invoice.address.length)
  if (invoice.address.length <= 30) {
    doc.text(`${invoice.address}`, 20, 62)
    doc.text(`${invoice.zip_code} ${invoice.city}`, 20, 68)
    if (invoice.country.length <= 30) {
      doc.text(`${invoice.country}`, 20, 74)
    } else {
      doc.text(`${invoice.country.substring(0, 30)}`, 20, 74)
      doc.text(`${invoice.country.substring(30, invoice.country.length)}`, 20, 80)
    }
  } else {
    doc.text(`${invoice.address.substring(0, 30)}`, 20, 62)
    doc.text(`${invoice.address.substring(30, invoice.address.length)}`, 20, 68)
    doc.text(`${invoice.zip_code} ${invoice.city}`, 20, 74)
    if (invoice.country.length <= 30) {
      doc.text(`${invoice.country}`, 20, 80)
    } else {
      doc.text(`${invoice.country.substring(0, 30)}`, 20, 80)
      doc.text(`${invoice.country.substring(30, invoice.country.length)}`, 20, 86)
    }
  }

  // einfachIOTA Logo
  var img = new Image()
  img.src = './' + require('@/assets/logo.png')
  doc.addImage(img, 'PNG', 150, 40, 25, 25)

  // Anschreiben Text - EN
  if (language === 'DE') {
    doc.text(`Hallo ${invoice.first_name},`, 20, 120)
    doc.text(`vielen Dank, dass Du das einfachIOTA Magazin bestellt hast!`, 20, 136)
    doc.text(`Wir wünschen Dir viel Spaß beim Lesen,`, 20, 142)
    doc.text(`Dein einfachIOTA Team.`, 20, 154)
  } else {
    doc.text(`Hello ${invoice.first_name},`, 20, 120)
    doc.text(`Thank you for ordering the einfachIOTA magazine!`, 20, 136)
    doc.text(`We hope you enjoy reading it,`, 20, 142)
    doc.text(`Your einfachIOTA Team.`, 20, 154)
  }

  doc.setFontSize(fontSizes.SmallFontSize)

  if (language === 'DE') {
    doc.text(`Wir erklären IOTA einfach - www.einfachIOTA.com`, 20, 280)
  } else {
    doc.text(`IOTA simple and easy - www.einfachIOTA.com`, 20, 280)
  }

  return doc
}
