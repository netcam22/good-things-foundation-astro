<script setup>
import SelectOption from './SelectOption.vue';
defineProps({
    labelClass: {
    type: String,
    required: true
    },
    label: {
    type: String,
    required: true
    },
    selectClass: {
    type: String,
    required: true
    },
    selectId: {
    type: String,
    required: true
    },
    options: {
    type: Array,
    required: true
    }
})
</script>

<template>
    <label :class="labelClass" :for="selectId">{{ label }}</label>
      <select :class="selectClass" :id="selectId">
          <SelectOption
            v-for="(item) in options"
            :key="item.value"
            :value="item.value"
            :text="item.text"
          />
      </select>
</template>

<style scoped>
.question-box__label {
  background-color: var(--white);
  padding: 0.2%;
  margin: 0.2%;
}
.question-box__select {
  background-color: var(--white);
  color: var(--mid-blue);
  padding: 0.2%;
  margin: 0.2%;
  width: auto;
  font-size: 1.2rem;
}
</style>
