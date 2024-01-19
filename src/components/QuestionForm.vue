<script setup>
import {useQuestionFormStore} from '../stores/questionForm.js';
import SelectInput from './SelectInput.vue';
const store = useQuestionFormStore;
</script>

<template>
          <form :class="store.getFormClass()" :id="store.getFormId()">
            <SelectInput 
            v-for="(item) in store.getSelectBoxes()"
            :key="item.id"
            :labelClass="item.labelClass"
            :label="item.label"
            :selectClass="item.selectClass" 
            :selectId="item.selectId" 
            :options="item.options"
          />
            <button :class="store.getButtonClass()" type="button">{{ store.getButtonText() }}</button>
          </form>
</template>

<style scoped>
.question-box__form {
  background-color: var(--white);
  padding: 1%;
  margin: 1% 0;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  flex-direction: column;
  align-items: center;
  align-content: center;
}

@media (min-width: 768px) {
  .question-box__form {
    flex-direction: row;
  }
}

.question-box__button {
  margin: 2% 1%;
  padding: 2%;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
}

.question-box__button--red {
  background-color: var(--red-purple);
  color: var(--white);
  border: var(--white) solid 1px;
}

.question-box__button--red:hover {
  background-color: var(--white);
  color: var(--red-purple);
  border: var(--red-purple) solid 1px;
}

@media (min-width: 768px) {
  .question-box__button  {
    margin: 0.2%;
    padding: 0.6%;
    font-size: 1rem;
  }
}
</style>