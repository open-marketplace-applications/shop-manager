<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
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
      listLoading: true
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
      getList(this.listQuery).then(response => {
        this.list = response
        this.listLoading = false
      })
    }
  }
}
</script>
