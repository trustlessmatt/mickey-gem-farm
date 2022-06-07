<template>
  <div class='pt-2'>
    <p class="text-2xl">{{ title }}</p>
    <div class="mb-2">Accrued: {{ reward.accruedReward / 1000000000 }}</div>
    <div class="mb-2">Total paid out: {{ reward.paidOutReward / 1000000000 }}</div>
    <div>
      <!-- fixed daily dust funding = 264/day so reward varies per number of staked items -->
      <div class="mb-2">
        Estimated Reward Rate (Variable):
        <span class="font-bold">
        {{ 
          // divide by two for the first halving
          Math.floor(((264/2) / parseNumGems(allGems)) * parseNumGems(yourGems) * 10) / 10
        }} $DUST/day
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FixedScheduleDisplay from '@/components/gem-farm/FixedScheduleDisplay.vue';
import { parseDate } from '@/common/util';
import numeral from 'numeral';

export default defineComponent({
  components: { FixedScheduleDisplay },
  props: {
    reward: Object,
    farmReward: Object,
    allGems: Object,
    yourGems: Object,
    title: String,
    farmAcc: Object,
  },
  setup() {
    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    const parseNumGems = (items: any): number => {
      // returns number of gems
      return items;
    }

    return {
      parseRewardType,
      parseNumGems,
      parseDate,
      numeral,
    };
  },
});
</script>

<style scoped></style>
