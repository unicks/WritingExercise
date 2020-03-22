<template>
  <div class="hero is-fullheight is-success">
    <div class="hero-head">
      <div class="columns is-mobile is-centered">
        <figure class="image is-128x128">
          <img src="./assets/bitui.png">
        </figure>
      </div>
    </div>

    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-centered">
          <exersice-card :exersice="currExercise">
          </exersice-card>
        </div>
      </div>
    </div>

    <div class="hero-foot">
      <div class="container has-text-centered">
        <div class="columns is-centered is-mobile">
          <div class="column is-narrow">
            <button class="button is-success is-inverted is-hover"
                    @click="copyToClipboard">
              <span class="icon">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              </span>
            </button>
          </div>
          <div class="column is-narrow">
            <button class="button is-success is-inverted is-hover"
                    @click="nextExercise">
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
      currIndex: 0
    }
  },
  computed: {
    currExercise() {
      return this.shuffledExercises[this.currIndex];
    },
    shuffledExercises() {
      return this.exercises.sort(() => Math.random() - 0.5);
    }
  },
  methods: {
    nextExercise() {
      this.currIndex = (this.currIndex + 1) % this.shuffledExercises.length;
    },
    copyToClipboard() {
      const content = document.createElement('textarea');
      content.value = this.currExercise.source + "\n\n" + this.currExercise.body;
      content.value = content.value.replace('null\n\n', '');
      document.body.appendChild(content);
      content.select();
      content.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(content);
    }
  }
}
</script>