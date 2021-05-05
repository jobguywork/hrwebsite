<template>
  <el-select v-model="size" filterable reserve-keyword placeholder="انتخاب...">
    <el-option
      v-for="(item, index) in sizeOptions"
      :key="index"
      :label="item.label"
      :value="item.value"
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
      sizeOptions: [
        {
          value: 'VS',
          label: '1-10 نفر'
        },
        {
          value: 'S',
          label: '11-50 نفر'
        },
        {
          value: 'M',
          label: '51-200 نفر'
        },
        {
          value: 'L',
          label: '201-500 نفر'
        },
        {
          value: 'VL',
          label: '501-1000 نفر'
        },
        {
          value: 'UL',
          label: 'بیش از 1000 نفر'
        }
      ],
      size: ''
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.size = newValue
    },
    size(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
