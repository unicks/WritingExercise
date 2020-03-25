<template>
  <div class="columns is-centered is-multiline is-mobile">
    <div class="column is-full">
    <div class="content">
      <p id="exerciseSource" class="has-text-right">
        <pre id="sourceWrap">
          {{this.text}}
        </pre>
      </p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      text: ""
  },
  computed: {
    
  }
}
</script>

<style scoped>
#exerciseSource {
  direction: rtl !important;
  unicode-bidi: embed;
}
#sourceWrap {
  white-space: pre-wrap;
}
</style>