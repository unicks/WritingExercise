<template>
  <div class="hero is-fullheight is-success">
    <div class="hero-head">
      <div class="columns is-mobile is-centered">
        <figure class="image">
          <a href="http://spokenoar.org.il/" target="_blank">
            <img src="./assets/banner.png">
          </a>
        </figure>
      </div>
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <transition name="fade" mode="out-in">
          <exersice-card v-if="exercises.length" :key="currExercise.id" :exersice="currExercise">
          </exersice-card>
          </transition>
        </div>
        <div id="footerColumns" class="columns is-centered is-mobile">
          <div class="column is-narrow">
            <button id="copyExrcButton"
                    class="button is-medium is-success is-inverted is-hover tooltip"
                    @click="copyToClipboard"
                    :data-tooltip="copyTooltipText">
              <span class="icon">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              </span>
            </button>
          </div>
          <div class="column is-narrow">
            <button id="nextExrcButton" 
                    class="button is-medium is-success is-inverted is-hover tooltip"
                    @click="nextExercise"
                    data-tooltip="תרגיל חדש">
              <span class="icon">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <div class="container has-text-centered">
        <div id="footerColumns" class="columns is-centered is-mobile">
          <div class="column is-narrow">
            <figure class="image is-64x64">
              <a href="https://www.facebook.com/Spokenoar/" target="_blank">
                <img src="./assets/facebook.png">
              </a>
            </figure>
          </div>
          <div class="column is-narrow">
            <figure class="image is-64x64">
              <a href="https://www.youtube.com/channel/UClRs26sHhbKy2om1OwLdXVg/about" target="_blank">
                <img src="./assets/youtube.png">
              </a>
            </figure>
          </div>
          <div class="column is-narrow">
            <figure class="image is-64x64">
              <a href="https://www.instagram.com/spokenoar/?" target="_blank">
                <img src="./assets/instagram.png">
              </a>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ExersiceCard from './components/ExerciseCard.vue'
import { mobileCheck } from './js/common'

export default {
  name: 'App',
  components: {
    ExersiceCard
  },
  apollo: {
    exercises: gql`
      query {
        exercises {
        id
        source
        body
      }
    }
    `
  },
  data() {
    return {
      exercises: [],
      currIndex: 0,
      wasCopied: false,
      showCard: true
    }
  },
  computed: {
    currExercise() {
      return this.shuffledExercises[this.currIndex];
    },
    shuffledExercises() {
      return this.exercises.sort(() => Math.random() - 0.5);
    },
    copyTooltipText() {
      if(!this.wasCopied) {
        return "!העתק ושתף"
      } else {
        return "(: הועתק, אפשר לשלוח"
      }
    }
  },
  methods: {
    nextExercise() {
      this.wasCopied = false;
      this.currIndex = (this.currIndex + 1) % this.shuffledExercises.length;
      if(mobileCheck()) {
        setTimeout(() => {
          document.getElementById("nextExrcButton").classList.remove("tooltip")
        },1000)
        document.getElementById("nextExrcButton").classList.add("tooltip")
      }
    },

    copyToClipboard() {
      this.wasCopied = true;
      const content = document.createElement('textarea');
      content.value = "תרגיל כתיבה ✏️" + "\n\n" + this.currExercise.source + "\n\n" + this.currExercise.body;
      content.value = content.value.replace('null\n\n', '');
      document.body.appendChild(content);
      content.select();
      content.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(content);
      if(mobileCheck()) {
        setTimeout(() => {
          document.getElementById("copyExrcButton").classList.remove("tooltip")
        },1500)
        document.getElementById("copyExrcButton").classList.add("tooltip")
      }
    }
  },
  mounted() {
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-x:hidden !important;");
  }
}
</script>

<style scoped>
#footerColumns {
  margin-bottom: 0px !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>