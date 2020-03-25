<template>
  <div class="columns is-centered">
    <youtube :video-id="this.$youtube.getIdFromUrl(this.videoUrl)"
              ref="youtube"
              :width="mobileCheck ? '' : this.cardWidth"
              :height="mobileCheck ? '' : this.cardHeight">
    </youtube>
  </div>
</template>

<script>
import { mobileCheck } from '../js/common'

export default {
  props: {
      videoUrl: ""
  },
  computed: {
    cardWidth() {
      return document.getElementsByClassName('card-content').offsetWidth;
    },
    cardHeight() {
      return document.getElementsByClassName('card-content').offsetHeight;
    },
    mobileCheck() {
      return mobileCheck();
    }
  }
}
</script>