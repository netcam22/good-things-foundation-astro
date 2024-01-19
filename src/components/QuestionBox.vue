<script setup>
import {useQuestionBoxStore} from '../stores/questionBox.js';
const store = useQuestionBoxStore;
import QuestionForm from './QuestionForm.vue';
</script>

<template>
<section class = "question-box" :aria-labelledby="store.getAriaLabel">
  
          <h1 class = "question-box__heading" :id="store.getAriaLabel">{{store.getHeading()}}</h1>
          <p class = "question-box__text">
            {{store.getText()}}
          </p>

          <QuestionForm/>

        </section>
</template>

<style scoped>
.question-box {
  padding: 2% 6%;
  flex-basis: 100%;
  background-color: var(--light);
  color: var(--dark);
}
.question-box__heading {
  margin: 0.5% 0;
  padding: 0;
  width:fit-content;
  font-size: 1.6rem;
}
.question-box__text {
  margin: 1% 0;
  padding: 0;
  font-size: 1.3rem;
}
</style>
