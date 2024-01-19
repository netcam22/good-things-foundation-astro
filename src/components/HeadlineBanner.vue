<script setup>
import { useHeadlineBannerStore } from '../stores/headlineBanner.js';
const store = useHeadlineBannerStore;
import HeadlineBlock from './HeadlineBlock.vue';
</script>

<template>
<div :class = "store.getImage().class"></div>
<HeadlineBlock
      :section="store.getSection()"
      :heading="store.getHeading()"
      :paragraph="store.getParagraph()"
      :button="store.getButton()"
  />
</template>

<style scoped>
.image-box {
  flex-basis: 100%;
  background-position: center;
  margin: 0;
  padding: 2% 6%;
  text-align: center;
}

@media (min-width: 768px) {
  .image-box {
    flex-basis: 50%;
  }
}
.image-box--charity-people {
  background-image: url('./../assets/charity-people.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.image-box--thirty {
  min-height: 30vh;
}

</style>
