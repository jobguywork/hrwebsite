<template>
  <span class="wrap-pros-select">
    <el-select
      v-model="pros"
      :multiple-limit="20"
      :remote-method="remoteMethod"
      :loading="loading"
      class="full-width"
      multiple
      filterable
      remote
      reserve-keyword
      allow-create
      placeholder="انتخاب مزایا"
    >
      <el-option
        v-for="(item, index) in prosList"
        :key="index"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
      required: true
    }
  },
  data() {
    return {
      loading: false,
      prosList: []
    }
  },
  computed: {
    pros: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
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
        const res = await this.$axios.get('/public/pros/list/', {
          params: {
            name__icontains: query || ''
          }
        })
        this.loading = false
        this.prosList = res.data.data
      } catch (error) {}
    }
  }
}
</script>
<style lang="scss">
.wrap-pros-select {
  .el-input__suffix {
    display: none;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 15px;
  }
  .el-select .el-select__tags {
    margin-right: 15px;
  }
}
</style>
