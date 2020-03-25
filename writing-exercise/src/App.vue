<template>
  <div class="hero is-fullheight is-success">
    <div class="hero-head">
      <div class="columns is-mobile is-centered">
        <figure class="image is-128x128">
          <a href="http://spokenoar.org.il/" target="_blank">
            <img id="spokenLogo" src="./assets/spokenoar.png">
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
      </div>
    </div>

    <div class="hero-foot">
      <div class="container has-text-centered">
        <div id="footerColumns" class="columns is-centered is-mobile">
          <div class="column is-narrow">
            <button class="button is-medium is-success is-inverted is-hover tooltip"
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
            <button class="button is-medium is-success is-inverted is-hover tooltip"
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
  </div>
</template>

<script>
import gql from 'graphql-tag'
import ExersiceCard from './components/ExerciseCard.vue'

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
    }
  },
  mounted() {
    document.getElementsByTagName("body")[0].setAttribute("style", "overflow-x:hidden !important;");
  }
}
</script>

<style scoped>
#spokenLogo {
  margin-top: 44px !important;
}
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