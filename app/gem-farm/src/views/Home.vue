<template>
  <div class="mb-10">
    <p class="text-xl font-bold">Welcome to Mickey Degods - We're Burnin It 🍟</p>
    <p class="mt-5">
      Staking your Combos is a fickle process. Here are the rules:
      <ol>
        <li>Head to our Staking Area and connect your wallet.</li>
        <li>Select your Mickey's Combo, Day 1 Fry, or Mythic Fries on the left (one at a time, people!).</li>
        <li>Click the right arrow to send the NFT into your vault.</li>
        <li>You can send as many valid NFTs to the vault as you want.</li>
        <li>When you're ready, click "Begin Staking" and sign the final transaction.</li>
        <li>Watch those $DUST gainz roll in bruh.</li>
      </ol>
    </p>
  </div>
  <div class="mx-auto">
    <div class="">
      <!-- <img src='/drink_puddle.png' alt='drink' width='300' /> -->
      <router-link to="farmer">
        <button class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2">Get Staking</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GEM_FARM_PROG_ID } from '@gemworks/gem-farm-ts';
export default defineComponent({
  setup() {
    return {
      GEM_FARM_PROG_ID,
    };
  },
});
</script>
<style scoped></style>
