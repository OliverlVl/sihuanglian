<template>
  <div class="pagination-wrapper">
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pageData.page"
      :page-size="pageData.pageSize"
      :page-sizes="pageSizeList"
      :layout="paginationLayout"
      :total="pageData.total"></el-pagination>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pagination',
  data () {
    return {
      pageSizeList: this.$store.state.app.default.pageSizeList
    }
  },
  props: {
    pageData: {
      type: Object
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array
    },
    total: {
      type: Number,
      default: 0
    },
    sizeChange: {
      type: Function
    },
    currentChange: {
      type: Function
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ]),
    paginationLayout () {
      return 'total, sizes, prev, pager, next, jumper';
      // if (this.device === 'desktop') { return 'total, sizes, prev, pager, next, jumper' }
      // return 'total,prev,next'
    }
  }
}
</script>

<style scoped>
  .pagination-wrapper{
    text-align: center;
    margin-top: 20px;
  }
</style>
