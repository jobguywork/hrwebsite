<template>
  <div class="item layout-h layout-justified">
    <div class="text layout-v">
      <span>{{ text }}</span>
      <h4>{{ count }}</h4>
    </div>
    <div
      class="icon layout-h layout-center-center"
      :style="{ backgroundColor: backgroundColor }"
    >
      <i class="fas fa-chart-line" :style="{ color: iconColor }"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 25px;
  margin-bottom: 30px;
  flex: 1 1 calc(25% - 30px);
  max-width: calc(25% - 20px);
  height: auto;
  cursor: default;
  transition: 0.3s;
  .text {
    span {
      font-size: 18px;
      color: #888;
      line-height: 22px;
    }
    h4 {
      font-size: 32px;
      color: #333;
      line-height: 38px;
      margin-top: 15px;
    }
  }
  .icon {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.04);
    flex: 0 0 100px;
    height: 100px;
    display: flex;
    text-align: center;
    i {
      font-size: 42px;
    }
  }
}
</style>
