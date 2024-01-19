<script setup>
import HeroBanner from '../components/HeroBanner.vue';
import HeadlineBanner from '..//components/HeadlineBanner.vue';
import QuestionBox from '../components/QuestionBox.vue';

</script>

<template>
  <main class = "main-content">
    <HeroBanner />
    <HeadlineBanner />
    <QuestionBox />
  </main>
</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
