<template>
  <div class="columns is-centered">
    <youtube :video-id="this.$youtube.getIdFromUrl(this.videoUrl)"
              ref="youtube"
              :fitPatent="true"
              :resize="true">
    </youtube>
  </div>
</template>

<script>
export default {
  props: {
      videoUrl: ""
  }
}
</script>