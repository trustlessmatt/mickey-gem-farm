<template>
  <div
    class="flex flex-col rounded-lg shadow-lg w-52 m-3"
  >
    <img
      class="rounded-t-lg"
      :src="nft.externalMetadata.image"
      :alt="nft.onchainMetadata.data.name"
    />
      <div class="mt-2">
        <div class="flex mb-3">
          <div class="w-1/2 text-xs text-center text-base border-r border-black text-gray-500"> Title <span class="block text-black">{{nft.onchainMetadata.data.name.split(' ')[1]}}</span> </div>
        </div>
        <div class="flex mb-3 justify-center">
          <button v-if="staked" class="w-full bg-transparent mx-2 hover:bg-red-700 text-black-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded" @click="selectNFT">
            Unstake
          </button>
          <button v-else class="w-full bg-transparent mx-2 hover:bg-green-700 text-black-700 font-semibold hover:text-white py-1 px-2 border border-green-500 hover:border-transparent rounded" @click="selectNFT">
            Stake
          </button>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    nft: { type: Object, required: true },
    staked: Boolean,
    selectedNFT: Object,
  },
  emits: ['selected'],
  setup(props, ctx) {
    const selected = ref<boolean>(false);
    const toggleSelect = () => {
      if (!(selected.value === true && props.selectedNFT !== props.nft)) {
        selected.value = !selected.value;
      }
      console.log('selected', props.nft.mint.toBase58());
      ctx.emit('selected', {
        nft: props.nft,
        selected: selected.value,
      });
    };

    const selectNFT = () => {
      ctx.emit('selected', {
        nft: props.nft,
        selected: selected.value,
      });
    }

    return {
      selected,
      selectNFT,
      toggleSelect,
    };
  },
});
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
}

.card {
  width: 120px;
  height: 120px;
}
</style>
