export default {
  data() {
    return {
      total: 0,
      perPage: 10,
      page: 1
    }
  },
  watch: {
    perPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getList()
      }
    },
    page(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getList()
      }
    }
  },
  mounted() {
    this.getList()
  },
  computed: {
    defaultParams() {
      return {
        index: this.page === 1 ? 0 : (this.page - 1) * this.perPage,
        size: this.perPage,
        order_by: '-id'
      }
    }
  },
  methods: {
    handleChangePerPage(val) {
      this.perPage = val
    },
    handleNextPage(val) {
      this.page++
    },
    handlePrevPage(val) {
      this.page--
    },
    handleCurrentChange(val) {
      this.page = val
    }
  }
}
