<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  cardButton: {
    type: String,
    required: true
  },
  cardButtonClass: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class = "card">
      <h2>{{ heading }}</h2>
      <p>{{ text }}</p>
      <button :id="name" :class="cardButtonClass"  type="button">{{ cardButton }}</button>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--white);
  flex-basis: 60%;
  margin: 1% 0;
  padding: 2%;
  color: var(--dark);
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .card {
    flex-direction: row;
    flex-basis: 45%;
  }
}

@media (min-width: 992px) {
  .card {
    flex-basis: 23%;
  }
}
.card__button {
  margin: 8% 4% 3% 4%;
  padding: 4%;
  border-radius: 80px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
}

.card__button--red {
  color: var(--red-purple);
  background-color: var(--white);
  border: var(--dark) solid 1px;
}

.card__button--red:hover {
  background-color: var(--red-purple);
  color: var(--white);
}

</style>
