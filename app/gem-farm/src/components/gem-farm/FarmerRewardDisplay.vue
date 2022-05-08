<template>
  <div class='pt-2'>
    <p class="text-2xl">{{ title }}</p>
    <div class="mb-2">Accrued: {{ reward.accruedReward / 1000000000 }}</div>
    <div class="mb-2">Total paid out: {{ reward.paidOutReward / 1000000000 }}</div>
    <div>
      <!-- <div class="mb-2">
        Last recorded accrued reward per meal:
        {{
          numeral(
            reward.variableRate.lastRecordedAccruedRewardPerRarityPoint.n /
              10 ** 12
          ).format('0,0.0')
        }} $DUST (this is variable and changes often based on # of stakers)
      </div> -->
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
    title: String,
  },
  setup() {
    const parseRewardType = (reward: any): string => {
      //returns "variable" or "fixed"
      return Object.keys(reward.rewardType)[0];
    };

    return {
      parseRewardType,
      parseDate,
      numeral,
    };
  },
});
</script>

<style scoped></style>
