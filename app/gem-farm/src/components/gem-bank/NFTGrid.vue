<template>
  <div class="px-2">
    <p class="text-center font-bold">{{ title }}</p>
    <slot />
    <div class="flex flex-wrap justify-center">
      <NFTCard
        v-for="nft in nfts"
        :key="nft"
        :nft="nft"
        :staked="staked"
        :selectedNFT="selectedNFT"
        @selected="handleSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NFTCard from '@/components/gem-bank/NFTCard.vue';

export default defineComponent({
  components: { NFTCard },
  emits: ['selected'],
  props: {
    title: String,
    nfts: Array,
    selectedNFT: Object,
    staked: Boolean,
  },
  setup(props, ctx) {
    const handleSelected = (e: any) => {
      ctx.emit('selected', e);
    };
    return {
      handleSelected,
    };
  },
});
</script>

<style scoped></style>
