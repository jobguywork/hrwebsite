<template>
  <div v-masonry-tile class="image">
    <img :src="image.path | mediaUrl" />
    <el-input v-model="image.description" placeholder="توضیحات" />
    <div class="remove" @click="onRemove">
      <i class="fas fa-trash"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      image: this.value
    }
  },
  methods: {
    onRemove() {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.image {
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 5px;
  width: 300px;
  padding: 10px;
  margin: 10px;
  position: relative;
  cursor: pointer;
  img {
    border-radius: 4px;
    width: 100%;
    height: auto;
  }
  .remove {
    background-color: #fff;
    border-radius: 4px;
    padding: 4px 6px;
    position: absolute;
    left: 14px;
    top: 15px;
    padding-bottom: 1px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    i {
      color: red;
    }
  }
}
</style>
