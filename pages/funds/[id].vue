<script setup lang="ts">
import TopRight from "~icons/ep/top-right";
import PurchaseFunds from "~/components/funds/PurchaseFunds.vue";
import SellFunds from "~/components/funds/SellFunds.vue";
const route = useRoute();
const { $filters } = useNuxtApp();
const userStorage = useUser();
const user = userStorage.getUser();

const { data: fund } = await useFetch(`/api/funds/${route.params.id}`);

const dates = computed(() => {
  return (
    fund?.value?.values?.map(({ createdAt }: { createdAt: any }) => {
      return $filters.toDateTime(createdAt);
    }) || []
  );
});

const values = computed(() => {
  return (
    fund?.value?.values?.map(({ value }: { value: number }) => value) || []
  );
});

const isLoading = ref(false);
let investment = reactive<Record<string, any>>({});

async function getInvestment() {
  if (user) {
    isLoading.value = true;
    const { data: userInvestment } = await useFetch(
      `/api/investment/${route.params.id}`,
    );
    investment = userInvestment;
    isLoading.value = false;
  }
}

await getInvestment();
</script>

<template>
  <Head>
    <Title>AHAM Assessment | {{ fund?.title }}</Title>
  </Head>
  <Card :span="6">
    <h1 class="mt-10">{{ fund?.title }}</h1>
  </Card>
  <Card :span="6">
    <p class="mt-10">
      {{ fund?.description }}
    </p>
  </Card>
  <GridWrapper :span="6">
    <Table>
      <tr>
        <th>Date</th>
        <th>NAV</th>
      </tr>
      <tr v-for="value in fund?.values" :key="value.id">
        <td>
          {{ $filters.toDateTime(value.createdAt, "DD MMM YY") }}
        </td>
        <td>MYR {{ value.value }}</td>
      </tr>
    </Table>
  </GridWrapper>
  <Card :span="6">
    <ClientOnly>
      <Chart
        :dates="dates"
        :values="values"
        title="NAV trend"
        data-title="NAV"
      />
    </ClientOnly>
  </Card>
  <Card :span="6">
    <h2 class="mt-10">Purchase</h2>
  </Card>
  <Card v-if="!user" :span="6">
    <p class="mt-10">
      You are not logged in, login to purchase units.
      <nuxt-link to="/login">Login<TopRight /></nuxt-link>
    </p>
  </Card>
  <template v-else>
    <PurchaseFunds
      v-if="fund"
      :id="fund?.id"
      :value="fund?.value"
      @update="getInvestment"
    />
    <Card :span="6">
      <h2 class="mt-10">Purchase/selling history</h2>
    </Card>
    <GridWrapper :span="6">
      <Table v-if="!isLoading">
        <tr v-if="investment?.purchases?.length">
          <th>Units</th>
          <th>Value</th>
          <th>Date</th>
        </tr>
        <tr v-else>
          <th>&nbsp;</th>
        </tr>
        <template v-if="investment?.purchases?.length">
          <tr v-for="purchase in investment?.purchases" :key="purchase.id">
            <td>{{ purchase.units }}</td>
            <td>{{ purchase.value?.value }}</td>
            <td>
              {{ $filters.toDateTime(purchase.createdAt, "DD MMM YY hh:mma") }}
            </td>
          </tr>
        </template>
        <tr v-else>
          <td>No purchases made</td>
        </tr>
      </Table>
      <Loading v-else />
    </GridWrapper>
    <SellFunds
      v-if="fund && investment?.purchases?.length"
      :id="fund?.id"
      :value="fund?.value"
      :units="investment.units"
      @update="getInvestment"
    />
  </template>
</template>
