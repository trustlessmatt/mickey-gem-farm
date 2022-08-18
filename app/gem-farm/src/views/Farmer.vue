<template>
  <loading :active="isLoading" :is-full-page="fullPage" :loader="loader" />
  <div v-if="!wallet" class="flex justify-center ">
    <div class="justify-center w-full flex flex-col">
      <div class="flex flex-col sm:flex-row justify-center mb-10">
        <div
          class="flex flex-col w-full sm:w-96 text-center p-3 sm:p-1 justify-center"
        >
          <div class="text-base">Total Menu Items Staked</div>
          <div v-if="farmAcc" class="text-6xl farm-value">
            {{ farmAcc?.gemsStaked }}
          </div>
          <div v-else class="text-6xl farm-value">{{ 69 }}</div>
        </div>
        <div
          class="flex flex-col w-full sm:w-96 text-center p-3 sm:p-1 justify-center"
        >
          <div class="text-base">% of Meals Not Thrown Out (Staked)</div>
          <!-- 275 OG stakeable items + 13 special fries -->
          <div v-if="farmAcc" class="text-6xl farm-value">
            {{
              Math.floor((parseInt(farmAcc?.gemsStaked) / (275 + 13)) * 100 * 10) /
              10
            }}%
          </div>
          <div v-else class="text-6xl farm-value">{{ 69 }}%</div>
        </div>
      </div>
      <ConfigPane />
    </div>
  </div>
  <div v-else>
    <!--farm address-->
    <!-- <div class="nes-container with-title mb-10">
      <p class="title">Connect to a Farm</p>
      <div class="nes-field mb-5">
        <label for="farm">Farm address:</label>
        <input id="farm" class="nes-input" v-model="farm" />
      </div>
    </div> -->

    <div v-if="farmerAcc">
      <FarmerDisplay
        :key="farmerAcc"
        :farm="farm"
        :farmAcc="farmAcc"
        :farmer="farmer"
        :farmerAcc="farmerAcc"
        class="mb-10"
        @refresh-farmer="handleRefreshFarmer"
      />
      <Vault
        :key="farmerAcc"
        class="mb-10"
        :vault="farmerAcc.vault.toBase58()"
        @selected-wallet-nft="handleNewSelectedNFT"
      >
        <button
          v-if="farmerState === 'staked' && selectedNFTs.length > 0"
          class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2"
          @click="addGems"
        >
          Add Gems (resets staking)
        </button>
        <button
          v-if="farmerState === 'unstaked'"
          class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2"
          @click="beginStaking"
        >
          Begin staking
        </button>
        <button
          v-if="farmerState === 'staked'"
          class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2"
          @click="endStaking"
        >
          End staking
        </button>
        <button
          v-if="farmerState === 'pendingCooldown'"
          class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2"
          @click="endStaking"
        >
          End cooldown
        </button>
        <button class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2" @click="claim">
          Claim {{ availableA / 1000000000 }} $DUST
        </button>
      </Vault>
    </div>
    <div v-else>
      <div class="w-full text-center mb-5">
        No staking account found with this wallet! Make a new one?
      </div>
      <div class="w-full text-center">
        <button class="bg-rb-mickeyred text-white rounded-lg py-2 px-3 mx-2" @click="initFarmer">
          Create New Staking Account
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import useWallet from '@/composables/wallet';
import useCluster from '@/composables/cluster';
import { initGemFarm } from '@/common/gem-farm';
import { PublicKey } from '@solana/web3.js';
import ConfigPane from '@/components/ConfigPane.vue';
import FarmerDisplay from '@/components/gem-farm/FarmerDisplay.vue';
import Vault from '@/components/gem-bank/Vault.vue';
import { INFT } from '@/common/web3/NFTget';
import { findFarmerPDA, stringifyPKsAndBNs } from '@gemworks/gem-farm-ts';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default defineComponent({
  components: { Vault, FarmerDisplay, ConfigPane, Loading },

  created() {
    setInterval(() => {
      this.currentTS = Date.now();
    }, 1000);
  },

  setup() {
    const { wallet, getWallet } = useWallet();
    const { cluster, getConnection } = useCluster();

    let gf: any;
    let initGf: any;
    watch([wallet, cluster], async () => {
      await freshStart();
    });

    // --------------------------------------- loading

    //current walet/vault state
    const isLoading = ref<boolean>(false);

    // --------------------------------------- farmer details
    const farm = ref<string>("7hVwjcQ8Gf1p3mFRBtNPUU9SofnuxbneQXSaz9jM4dvF");
    const farmAcc = ref<any>();

    const farmerIdentity = ref<string>();
    const farmerAcc = ref<any>();
    const farmerState = ref<string>();

    const availableA = ref<string>();
    const availableB = ref<string>();

    //needed in case we switch in from another window
    onMounted(async () => {
      await freshStart();
      await updateAvailableRewards();
    });
    

    const updateAvailableRewards = async () => {
      availableA.value = farmerAcc.value.rewardA.accruedReward
        .sub(farmerAcc.value.rewardA.paidOutReward)
        .toString();
      // availableB.value = farmerAcc.value.rewardB.accruedReward
      //   .sub(farmerAcc.value.rewardB.paidOutReward)
      //   .toString();
    };

    const fetchInitFarm = async () => {
      farmAcc.value = await initGf.fetchFarmAcc(new PublicKey(farm.value!));
      console.log(
        `farm found at ${farm.value}:`,
        stringifyPKsAndBNs(farmAcc.value)
      );
    };

    const fetchFarn = async () => {
      farmAcc.value = await gf.fetchFarmAcc(new PublicKey(farm.value!));
      console.log(
        `farm found at ${farm.value}:`,
        stringifyPKsAndBNs(farmAcc.value)
      );
    };

    const fetchFarmer = async () => {
      const [farmerPDA] = await findFarmerPDA(
        new PublicKey(farm.value!),
        getWallet()!.publicKey!
      );
      farmerIdentity.value = getWallet()!.publicKey?.toBase58();
      farmerAcc.value = await gf.fetchFarmerAcc(farmerPDA);
      farmerState.value = gf.parseFarmerState(farmerAcc.value);
      await updateAvailableRewards();
      console.log(
        `farmer found at ${farmerIdentity.value}:`,
        stringifyPKsAndBNs(farmerAcc.value)
      );
    };

    const freshStart = async () => {
      try {
        isLoading.value = true;
        initGf = await initGemFarm(getConnection());
        await fetchInitFarm();
        isLoading.value = false;
      } catch (e) {
        console.log(`farm with PK ${farm.value} not found :(`);
        isLoading.value = false;
      }
      if (getWallet() && getConnection()) {
        isLoading.value = true;
        gf = await initGemFarm(getConnection(), getWallet()!);
        farmerIdentity.value = getWallet()!.publicKey?.toBase58();

        //reset stuff
        farmAcc.value = undefined;
        farmerAcc.value = undefined;
        farmerState.value = undefined;
        availableA.value = undefined;
        availableB.value = undefined;

        try {
          await fetchFarn();
          await fetchFarmer();
          isLoading.value = false;
        } catch (e) {
          isLoading.value = false;
          console.log(`farm with PK ${farm.value} not found :(`);
        }
      }
    };

    const initFarmer = async () => {
      isLoading.value = true;
      try {
        await gf.initFarmerWallet(new PublicKey(farm.value!));
        await fetchFarmer();
      } catch (err) {
        console.log(err);
        alert(err)
      } finally {
        isLoading.value = false;
      }
    };

    // --------------------------------------- staking
    const beginStaking = async () => {
      isLoading.value = true;
      await gf.stakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
      isLoading.value = false;
    };

    const endStaking = async () => {
      isLoading.value = true;
      await gf.unstakeWallet(new PublicKey(farm.value!));
      await fetchFarmer();
      selectedNFTs.value = [];
      isLoading.value = false;
    };

    const claim = async () => {
      isLoading.value = true;
      try {
        await gf.claimWallet(
          new PublicKey(farm.value!),
          new PublicKey(farmAcc.value.rewardA.rewardMint!),
          new PublicKey(farmAcc.value.rewardB.rewardMint!)
        );
      } catch (err) {
        console.log(err);
      } finally {
        await fetchFarmer();
        isLoading.value = false;
        var audio = new Audio('/Fast_Dust.mp3'); // path to file
        audio.play();
      }
    };

    const handleRefreshFarmer = async () => {
      await fetchFarmer();
    };

    // --------------------------------------- adding extra gem
    const selectedNFTs = ref<INFT[]>([]);

    const handleNewSelectedNFT = (newSelectedNFTs: INFT[]) => {
      console.log(`selected ${newSelectedNFTs.length} NFTs`);
      selectedNFTs.value = newSelectedNFTs;
    };

    const addSingleGem = async (
      gemMint: PublicKey,
      gemSource: PublicKey,
      creator: PublicKey
    ) => {
      isLoading.value = true;
      await gf.flashDepositWallet(
        new PublicKey(farm.value!),
        '1',
        gemMint,
        gemSource,
        creator
      );
      await fetchFarmer();
      isLoading.value = false;
    };

    const addGems = async () => {
      isLoading.value = true;
      await Promise.all(
        selectedNFTs.value.map((nft) => {
          const creator = new PublicKey(
            //todo currently simply taking the 1st creator
            (nft.onchainMetadata as any).data.creators[0].address
          );
          console.log('creator is', creator.toBase58());

          addSingleGem(nft.mint, nft.pubkey!, creator);
        })
      );
      console.log(
        `added another ${selectedNFTs.value.length} gems into staking vault`
      );
      isLoading.value = false;
    };

    return {
      currentTS: Date.now(),
      isLoading,
      fullPage: true,
      loader: 'bars',
      wallet,
      farm,
      farmAcc,
      farmer: farmerIdentity,
      farmerAcc,
      farmerState,
      availableA,
      availableB,
      initFarmer,
      beginStaking,
      endStaking,
      claim,
      handleRefreshFarmer,
      selectedNFTs,
      handleNewSelectedNFT,
      addGems,
      fetchFarn,
      fetchFarmer,
    };
  },
});
</script>

<style scoped></style>
