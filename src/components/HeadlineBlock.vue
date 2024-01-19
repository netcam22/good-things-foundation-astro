<script setup>
defineProps({
  section: {
    type: Object,
    required: true
  },
  heading: {
    type: Object,
    required: true
  },
  paragraph: {
    type: Object,
    required: false
  },
  button: {
    type: Object,
    required: false
  }
})
</script>

<template>
  <section :class="section.class" :aria-labelledby="section.aria">
    <h1 :class="heading.class" :id="section.aria">{{heading.text}}</h1>
      <p v-if="paragraph" :class="paragraph.class">
        {{paragraph.text}}
      </p>
      <button v-if="button" :class="button.class" type="button">{{button.text}}</button>
  </section>
</template>

<style scoped>

.headline {
  margin: 0;
  text-align: center;
  flex-basis: 100%;
  background-position: center;
  padding: 2% 6%;
}

@media (min-width: 768px) {
  .headline {
    text-align: left;
  }
}
.headline--volunteers {
  background-image: url("./../assets/volunteers.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.headline--thirty {
  min-height: 30vh;
}
.headline--fifty {
  min-height: 50vh;
}
.headline--blue {
  background-color: var(--mid-blue);
  color: var(--white);
}

@media (min-width: 768px) {
  .headline--half {
    flex-basis: 50%;
    text-align: left;
  }
}
.headline__heading {
  text-align: center;
  font-size: 1.7rem;
}
.headline__heading--hero {
  background-color: var(--mid-blue);
  color: var(--white);
  font-size: 3rem;
  font-weight: 600;
  margin: 3% 0;
  padding: 1% 2%;
  width: 100%;
}

@media (min-width: 768px) {
  .headline__heading--hero {
    width:fit-content;
  }
}

.headline__heading--box {
  margin: 3% 0 2% 0;
  padding: 0;
  width:fit-content;
  text-align: center;
}

@media (min-width: 768px) {
  .headline__heading--box {
    text-align: left;
  }
}

.headline__text {
  width: 100%;
  font-size: 1.3rem;
}

.headline__text--hero {
  color: var(--mid-blue);
  background-color: var(--white);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 2% 0;
  padding: 1% 2%;
}

@media (min-width: 768px) {
  .headline__text--hero {
    width: 50%;
  }
}

.headline__text--box {
  margin: 1% 0;
  padding: 0;
}

.headline__button {
  cursor: pointer;
  font-size: 1rem;
  padding: 1.5%;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  border-radius: 80px;
}
.headline__button--hero {
  margin: 0 0 3% 0;
  background-color: var(--white);
  border: var(--white) solid 1px;
  color: var(--red-purple); 
}

.headline__button--hero:hover {
  background-color: var(--red-purple);
  color: var(--white);
  border-color: var(--red-purple);
}

@media (min-width: 768px) {
  .headline__button--hero {
    padding: 1%;
  }
}
.headline__button--box {
  margin: 1% 0 3% 0;
  background-color: transparent;
  border: var(--white) solid 2px;
  color: var(--white);
}

.headline__button--box:hover {
  background-color: var(--white);
  color: var(--mid-blue);
}
</style>
