<template>
  <div class="statics layout-h layout-justified">
    <Static
      icon="fas fa-chart-line"
      background-color="rgba(42, 65, 230, 0.07)"
      icon-color="rgb(42, 65, 230)"
      text="بازدید کل صفحات"
      :count="data.total_page_view"
    />
    <Static
      icon="far fa-building"
      background-color="rgba(239, 168, 15, 0.07)"
      icon-color="rgb(239, 168, 15)"
      text="بازدید پروفایل شرکت"
      :count="data.site_users_view"
    />
    <Static
      icon="far fa-comments"
      background-color="rgba(184, 27, 127, 0.07)"
      icon-color="rgb(184, 27, 127)"
      text="تجربه کاری"
      :count="data.total_review"
    />
    <Static
      icon="fas fa-coffee"
      background-color="rgba(54, 189, 120, 0.07)"
      icon-color="rgb(54, 189, 120)"
      text="مصاحبه کاری"
      :count="data.total_interview"
    />
  </div>
</template>

<script>
import Static from './Static'
export default {
  components: {
    Static
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
