<template>
  <div class="interview">
    <h2 class="title">
      <a :href="link" target="_blank">
        {{ interview.title }}
      </a>
    </h2>
    <div class="meta layout-h layout-justified mt-10">
      <div class="date">{{ interview.created }}</div>
      <RateView v-model="rate" />
    </div>
    <div class="desc mt-10">
      {{ interview.description }}
    </div>
    <div class="response mt-20">
      <ElButton type="primary" size="mini" @click="onReply">
        <i class="fas fa-comment"></i>
        <span class="mr-5">پاسخ دادن</span>
      </ElButton>
    </div>
    <ElDivider />
    <InterviewDialogReply
      v-if="dialogVisible"
      v-model="dialogVisible"
      :interview="interview"
    />
  </div>
</template>

<script>
import InterviewDialogReply from './InterviewDialogReply'
import RateView from '@/components/Common/RateView'
import { BASE_URL } from '@/config/app'

export default {
  components: {
    RateView,
    InterviewDialogReply
  },
  props: {
    interview: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rate: 0,
      dialogVisible: false
    }
  },
  computed: {
    link() {
      const { id } = this.interview
      return `${BASE_URL}/interview/${id}`
    }
  },
  mounted() {
    this.rate = this.interview.interviewer_rate
  },
  methods: {
    onReply() {
      this.dialogVisible = !this.dialogVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.interview {
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
