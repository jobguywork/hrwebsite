<template>
  <ElCard v-loading="loading" class="interviews">
    <div slot="header" class="clearfix">
      <span>تجربه های مصاحبه</span>
    </div>
    <div class="body">
      <Interview
        v-for="interview of interviews"
        :key="interview.id"
        :interview="interview"
      />
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
import Interview from '@/components/Common/Interview/Interview'
import mixinPagination from '@/mixins/pagination'

export default {
  components: {
    Interview
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
      interviews: [],
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
            `/public/company/${companySlug}/interview/`,
            {
              params: this.defaultParams
            }
          )
          this.interviews = data.data
          this.loading = false
        } catch (error) {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.interviews {
  min-height: 600px;
}
</style>
