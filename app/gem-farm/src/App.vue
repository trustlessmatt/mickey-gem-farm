<template>
  <div class="relative h-full min-h-screen bg-rb-mickeypink">
    <TheNavBar />
    <div class="px-16 mt-2 mx-auto max-w-2xl">
      <img src="/mickey_degod_banner.png" alt="mickey banner" />
    </div>

    <div class="p-10">
      <router-view />
    </div>
    <div className="relative hidden sm:block z-0">
      <!-- <img
        src="/drink_puddle.png"
        alt="Drink Puddle"
        className=" w-52 fixed bottom-0 left-10"
      /> -->
      <img
        src="/FriesPuddle.png"
        alt="Fries"
        className="w-20 fixed bottom-1 right-10"
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

input[type='radio']:checked + span {
  @apply text-black;
}
</style>
