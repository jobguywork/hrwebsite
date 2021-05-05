<template>
  <div class="rate layout-h layout-center ltr">
    <div class="star-rating layout-h layout-center-center mr-5">
      {{ rate }}
    </div>
    <ElRate v-model="rate" disabled allow-half />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    rate: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.star-rating {
  background-color: #febe42;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  line-height: 16px;
  padding: 0 10px;
  display: inline-block;
  padding-top: 3px;
}
</style>
