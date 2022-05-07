<template>
  <div class="relative h-full min-h-screen bg-rb-mickeypink">
    <TheNavBar />
    <div class="px-12 mt-2 mx-auto max-w-2xl">
      <img src="/mickey_degod_banner.png" alt="mickey banner" />
    </div>

    <div class="p-10">
      <router-view />
    </div>
    <div className="relative hidden sm:block">
      <img
        src="/drink_puddle.png"
        alt="Drink Puddle"
        className="z-0 w-52 fixed bottom-0 left-10"
      />
      <img
        src="/FriesPuddle.png"
        alt="Fries"
        className="z-0 w-20 fixed bottom-0 right-10"
      />
    </div>
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
