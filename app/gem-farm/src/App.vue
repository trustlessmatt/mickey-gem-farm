<template>
  <div class="relative h-full min-h-screen bg-rb-mickeypink">
    <TheNavBar />
    <div class=" mx-auto max-w-2xl">
      <img src="/mickey_degod_banner.jpg" alt="mickey banner" />
    </div>

    <div class="p-10">
      <router-view />
    </div>

    <div class="pt-10"></div>
  </div>
</template>

<script>
import TheNavBar from '@/components/TheNavBar';
import TheFooter from '@/components/gem-farm/TheFooter';
export default {
  components: { TheFooter, TheNavBar },
};
</script>

<style>
* {
  font-family: monospace;
}
input[type='radio']:checked + span {
  @apply text-black;
}
</style>
