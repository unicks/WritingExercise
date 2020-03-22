<template>
    <div class="card column is-half">
        <div class="card-header">
            <div class="card-header-title">
                #{{this.exersice.id}}
            </div>
        </div>
        <div class="card-content">
            <component :is="source" v-bind="sourceProps"></component>
            {{this.exersice.body}}
        </div>
        <div class="card-footer">
            
        </div>
    </div>
</template>

<script>
import YoutubeWrap from './YoutubeWrap';

export default {
  name: 'ExersiceCard',
  props: {
    exersice: {}
  },
  components: {
      YoutubeWrap
  },
  computed: {
      source() {
          const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
          if(youtubeRegex.test(this.exersice.source)){
              return "YoutubeWrap"
          }
      },
      sourceProps() {
          if(this.source === "YoutubeWrap") {
              return {videoUrl: this.exersice.source}
          }
      }
  }
}
</script>