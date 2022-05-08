<template>
  <div class="mb-10">
    <p class="text-xl font-bold">Welcome to Mickey Degods - We're Burnin It 🍟</p>
    <p class="mt-5">
      Staking your Combos is a fickle process. Here's a quick overview:
      <ol>
        <li>1. Head to our Staking Area and connect your wallet.</li>
        <li>2. Select your Mickey's Combo, Day 1 Fry, or Mythic Fries on the left. You may select multiple and move them over at together.</li>
        <li>3. Click the right arrow to stage the NFTs in your vault.</li>
        <li>4. Click "Move NFTs" and sign the transaction to lock them up in the vault.</li>
        <li>5. When you're ready, click "Begin Staking" and sign the final transaction.</li>
        <li>6. Watch those $DUST gainz roll in bruh.</li>
      </ol>
      You can collect $DUST at any time by clicking the "Collect X $DUST" button.
    </p>
    <p>
      Unstaking is also a trip (turn up your volume for a surprise):
      <ol>
        <li>1. Click "End Staking" and sign the first txn.</li>
        <li>2. Your staking account is now in a "cooldown" state. There's no cooldown period though, so just click "End Cooldown" and sign txn #2.</li>
        <li>3. You may now move your NFTs back into your wallet by selecting them and clicking the left arrow.</li>
        <li>4. Finally, click the "Move NFTs" button to sign the final txn, putting them back in your wallet.</li>
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
