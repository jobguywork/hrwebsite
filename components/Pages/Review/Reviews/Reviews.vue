<template>
  <ElCard v-loading="loading" class="reviews">
    <div slot="header" class="clearfix">
      <span>تجربه های کاری</span>
    </div>
    <div class="body">
      <Review v-for="review of reviews" :key="review.id" :review="review" />
    </div>
    <div v-if="pagination" class="pagination ltr">
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="total"
        @size-change="handleChangePerPage"
        @next-click="handleNextPage"
        @prev-click="handlePrevPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </ElCard>
</template>

<script>
import { mapState } from 'vuex'
import Review from '@/components/Common/Review/Review'
import mixinPagination from '@/mixins/pagination'

export default {
  components: {
    Review
  },
  mixins: [mixinPagination],
  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    perPageDefault: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      reviews: [],
      loading: false
    }
  },
  computed: {
    ...mapState('company', ['company'])
  },
  watch: {
    company(newValue, oldValue) {
      this.getList()
    }
  },
  created() {
    this.perPage = this.perPageDefault
  },
  methods: {
    async getList() {
      const companySlug = this.company.company_slug
      if (companySlug) {
        try {
          this.loading = true
          const { data } = await this.$axios.get(
            `/public/company/${companySlug}/review/`,
            {
              params: this.defaultParams
            }
          )
          this.reviews = data.data
          this.loading = false
        } catch (error) {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reviews {
  min-height: 600px;
}
</style>
