<template>
  <el-select
    v-model="industry"
    filterable
    reserve-keyword
    placeholder="انتخاب دسته شغلی"
  >
    <el-option
      v-for="(item, index) in industries"
      :key="index"
      :label="item.show_name"
      :value="item.name"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      industry: null,
      loading: false,
      industries: []
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.industry = newValue
    },
    industry(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    }
  },
  async mounted() {
    await this.getList()
  },
  methods: {
    remoteMethod(query) {
      this.getList(query)
    },
    async getList(query) {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/industry/list/', {
          params: {
            size: 100
          }
        })
        this.loading = false
        this.industries = res.data.data
      } catch (error) {}
    }
  }
}
</script>
