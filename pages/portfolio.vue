<script setup lang="ts">
import TopRight from "~icons/ep/top-right";

const userStorage = useUser();
const { data: portfolio } = await useFetch("/api/portfolio");

async function logout() {
  await $fetch("/api/auth/logout", {
    method: "POST",
  }).catch((error) => {
    console.error(error.data);
  });

  userStorage.storeUser();
  await navigateTo("/login");
}

definePageMeta({
  middleware: ["auth"],
});

const overallValue = computed(() => {
  const overall = portfolio.value?.investments?.reduce((totalValue, investment) => {
    totalValue += (investment.averagePrice * investment.units);
    return totalValue
  }, 0) || 0;

  return Math.round(overall * 100) / 100;
});

function getPercentageChange(investmentPrice, currentPrice) {
  return Math.round(((currentPrice - investmentPrice) / investmentPrice) * 100 * 100) / 100;
}
</script>

<template>
  <Head>
    <Title>AHAM Assessment | Portfolio</Title>
  </Head>
  <template v-if="portfolio?.investments?.length">
    <Card :span="3" :mobile="6"
      >
      <div class="mt-10 stat">
        <h2>Total funds invested in to date</h2>
        <h2 class="text-3xl">{{ portfolio?.investments?.length }}</h2>
      </div>
      </Card
    >
    <Card :span="3" :mobile="6"
      >
      <div class="mt-10 stat">
        <h2>Overall portfolio value</h2>
        <h2 class="text-3xl">MYR {{ overallValue }}</h2>
      </div></Card
    >
    <Card :span="6"><h2 class="mt-10">Invested funds</h2></Card>
    <GridWrapper :span="6">
      <Table>
        <tr>
          <th>Fund</th>
          <th>Units</th>
          <th>NAV</th>
          <th>Change</th>
        </tr>
        <tr v-for="investment in portfolio.investments" :key="investment.id">
          <td>
            <nuxt-link :to="`/funds/${investment?.fund?.id}`">{{ investment.fund?.title }}<TopRight /></nuxt-link>
          </td>
          <td>{{ investment.units }}</td>
          <td>{{ investment?.fund?.value }}</td>
          <td>{{ getPercentageChange(investment?.averagePrice, investment?.fund?.value) }}%</td>
        </tr>
      </Table>
    </GridWrapper>
  </template>
  <Card v-else :span="6">
    <p class="mt-10">
      Your profile is looking a bit bare, head over to
      <nuxt-link to="/funds">funds<TopRight /></nuxt-link> to start investing
    </p>
  </Card>
  <GridWrapper :span="6">
    <Button @click="logout">Logout</Button>
  </GridWrapper>
</template>

<style lang="scss" scoped>
.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(3 * var(--padding-default));

  flex-wrap: wrap;
}
</style>
