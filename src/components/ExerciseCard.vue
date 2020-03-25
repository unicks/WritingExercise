<template>
    <div class="card column is-half">
        <div class="card-content">
            <div class="content">
                <h2>#{{this.exersice.id}}</h2>
                <br>
                <component :is="source" v-bind="sourceProps"></component>
                <p id="exerciseBody">{{this.exersice.body}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import YoutubeWrap from './YoutubeWrap';
import songContainer from './SongContainer'

export default {
  name: 'ExersiceCard',
  props: {
    exersice: {}
  },
  components: {
      YoutubeWrap,
      songContainer
  },
  computed: {
      source() {
          const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
          if(youtubeRegex.test(this.exersice.source)){
              return "YoutubeWrap"
          } else if(this.exersice.source != null) {
              return "songContainer"
          }
      },
      sourceProps() {
          if(this.source === "YoutubeWrap") {
              return {videoUrl: this.exersice.source}
          } else if(this.source === "songContainer") {
              return {text: this.exersice.source}
          }
      }
  }
}
</script>

<style scoped>
#exerciseBody {
  direction: rtl !important;
  unicode-bidi: embed;
}
</style>