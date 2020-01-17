<template>
  <div class="app-container">
    <el-input
          placeholder="Nachname suchen..."
          v-model="search"
          class="search-form">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-table :data="list.filter(data => !search || data.last_name.toLowerCase().includes(search.toLowerCase()))" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
       <el-table-column label="DB ID">
        <template slot-scope="scope">
          {{scope.row._id}} 
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{scope.row.first_name}}  {{scope.row.last_name}}
        </template>
      </el-table-column>
      <el-table-column label="Menge" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Summe" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.final_price}}€
        </template>
      </el-table-column>
      <el-table-column label="Status" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.status}}
        </template>
      </el-table-column>
       <el-table-column label="Actions" width="110" align="center">
        <template slot-scope="scope">
           <router-link :to="{ name: 'OrderDetails', params: {id: scope.row._id} }">
             Details
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/orders'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      search: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
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
    }
  }
}
</script>
