<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="first_name">
        <el-input v-model="form.first_name"></el-input>
      </el-form-item>
      <el-form-item label="last_name">
        <el-input v-model="form.last_name"></el-input>
      </el-form-item>
      <el-form-item label="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="zip_code">
        <el-input v-model="form.zip_code"></el-input>
      </el-form-item>
      <el-form-item label="city">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="country">
        <el-input v-model="form.country"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createInvoice } from '@/utils/invoice_generator'
import { jsPDF as PDF } from 'jspdf'

export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        address: '',
        zip_code: '',
        city: '',
        country: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
      const pdfName = 'test'
      var doc = new PDF()
      doc.setFont('open-sans')
      doc = createInvoice(doc, this.form, 'DE')

      // Save rhe PDF
      doc.save(pdfName + '.pdf')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

