import { MEDIA_URL } from '@/config/app'
export default {
  filters: {
    mediaUrl(patch) {
      if (patch) {
        return MEDIA_URL + patch
      }
    }
  }
}
