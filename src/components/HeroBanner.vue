<script setup>
import {useHeroBannerStore} from '../stores/heroBanner.js';
const store = useHeroBannerStore;
import HeadlineBlock from './HeadlineBlock.vue';
</script>

<template>
  <HeadlineBlock
      :section="store.getSection()"
      :heading="store.getHeading()"
      :paragraph="store.getParagraph()"
      :button="store.getButton()"
  />
</template>
