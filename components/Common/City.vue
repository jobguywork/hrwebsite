<template>
  <el-autocomplete
    v-model="city"
    suffix-icon="fas fa-map-marker-alt"
    placeholder="نام شهر"
    :fetch-suggestions="querySearchCityAsync"
  />
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      city: '',
      loading: false,
      cities: [],
      firstLoad: false
    }
  },
  watch: {
    city(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    },
    value(newValue) {
      this.city = newValue
    }
  },
  async mounted() {
    this.city = this.value
    await this.getList()
  },
  methods: {
    async getList() {
      try {
        this.loading = true
        const res = await this.$axios.get('/public/city/list/', {
          params: {
            name: this.city || ''
          }
        })
        this.firstLoad = true
        this.loading = false
        this.cities = res.data.data.map((item) => {
          return {
            value: item.name,
            slug: item.name
          }
        })

        return this.cities
      } catch (error) {}
    },
    querySearchCityAsync: _.debounce(async function(queryString, cb) {
      try {
        if (queryString.length > 0) {
          await this.getList()
        }
        cb(this.cities)
      } catch (error) {}
    }, 200)
  }
}
</script>
