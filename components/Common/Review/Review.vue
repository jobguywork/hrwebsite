<template>
  <div class="review">
    <h2 class="title">
      <a :href="link" target="_blank">
        {{ review.title }}
      </a>
    </h2>
    <div class="meta layout-h layout-justified mt-10">
      <div class="date">{{ review.created }}</div>
      <RateView v-model="rate" />
    </div>
    <div class="desc mt-10">
      {{ review.description }}
    </div>
    <div class="response mt-20">
      <ElButton type="primary" size="mini" @click="onReply">
        <i class="fas fa-comment"></i>
        <span class="mr-5">پاسخ دادن</span>
      </ElButton>
    </div>
    <ElDivider />
    <ReviewDialogReply
      v-if="dialogVisible"
      v-model="dialogVisible"
      :review="review"
    />
  </div>
</template>

<script>
import ReviewDialogReply from './ReviewDialogReply'
import RateView from '@/components/Common/RateView'
import { BASE_URL } from '@/config/app'

export default {
  components: {
    RateView,
    ReviewDialogReply
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rate: 2,
      dialogVisible: false
    }
  },
  computed: {
    link() {
      const { id } = this.review
      return `${BASE_URL}/review/${id}`
    }
  },
  mounted() {
    this.rate = this.review.over_all_rate
  },
  methods: {
    onReply() {
      this.dialogVisible = !this.dialogVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .desc {
    height: 74px;
  }
}
</style>
