<script setup>
import { useCardContainerStore } from '../stores/cardContainer.js';
const store = useCardContainerStore;
import InfoCard from './InfoCard.vue';
</script>

<template>
    <section class = "card-container" :aria-labelledby="store.getAriaLabel">
      <h1 :id="store.getAriaLabel" class = "card-container__heading">
        {{store.getTitle()}}
      </h1>
      <p class = "card-container__text">{{store.getDetails()}}</p>
        <div class = "card-container__container">
        <InfoCard
            v-for="(item) in store.getCardContent()"
            :key="item.id"
            :name="item.name"
            :heading="item.heading"
            :text="item.text"
            :cardButton="item.cardButton"
            :cardButtonClass="store.getCardButtonClass()"
          />
      </div>
      <button :id="store.getMainButton().name" :class="store.getMainButton().class" type="button">
      {{store.getMainButton().text}}</button>
    </section>

</template>

<style scoped>
.card-container {
  background-color: var(--mid-blue);
  color: var(--white);
  padding: 2% 6%;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.card-container__heading {
  margin: 0.5% 0;
  padding: 0;
  width:fit-content;
  font-size: 1.6rem;
}

.card-container__text {
  margin: 1% 0;
  padding: 0;
  font-size: 1.3rem;
}

.card-container__container {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: stretch;
  align-content: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .card-container__container {
    gap: 1%;
  }
}

@media (min-width: 992px) {
  .card-container__container {
    justify-content: space-between;
  }
}

.card-container__button {
  border-radius: 80px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  border: none;
  padding: 3%;
  align-self: center;
  margin: 2% 1% 1% 1%;
}

@media (min-width: 768px) {
  .card-container__button {
    border: none;
    padding: 1%;
  }
}

.card-container__button--red {
  color: var(--red-purple);
  background-color: var(--white);
  border: var(--dark) solid 1px;
}

.card-container__button--red:hover {
  background-color: var(--red-purple);
  color: var(--white);
}

</style>
