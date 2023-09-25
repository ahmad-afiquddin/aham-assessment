<script setup lang="ts">
import FundCard from "~/components/funds/FundCard.vue";
import UpOne from "~icons/icon-park-solid/up-one";
import DownOne from "~icons/icon-park-solid/down-one";

const { data: funds } = await useFetch(`/api/funds`);

const { data: topFunds } = await useFetch(`/api/funds`, {
  query: {
    trend: "positive",
  },
});

const { data: bottomFunds } = await useFetch(`/api/funds`, {
  query: {
    trend: "negative",
  },
});
</script>

<template>
  <Head>
    <Title>AHAM Assessment | Home</Title>
  </Head>
  <Card :span="6">
    <p class="mt-10">
      AHAM Asset Management Berhad ("AHAM Capital") is an independently-managed,
      institutionally-owned asset management ﬁrm. Since its formation in 2001,
      AHAM Capital has served the wealth needs of corporates, institutions,
      pension funds, government-linked companies, high net worth individuals and
      the mass affluent.
    </p>
  </Card>
  <Card :span="6">
    <Marquee>
      <div v-for="fund in funds" :key="fund.id" class="m-4">
        {{ fund.title }}<UpOne v-if="fund.difference > 0" class="text-green" />
        <DownOne v-if="fund.difference < 0" class="text-red" />{{
          Math.round(fund.difference * 100) / 100
        }}%
      </div>
    </Marquee>
  </Card>
  <Card :span="4"><h2 class="mt-10">Best performers today</h2></Card>
  <Card :span="2">
    <nuxt-link to="/funds"><h2 class="mt-10">More funds</h2></nuxt-link>
  </Card>
  <GridWrapper :span="6" :grid="6">
    <FundCard
      v-for="fund in topFunds"
      :id="fund?.id"
      :key="fund?.id"
      :title="fund?.title"
      :type="fund?.type?.title"
      :value="fund.value"
      :difference="fund.difference"
    />
  </GridWrapper>
  <Card :span="4"><h2 class="mt-10">Worst performers today</h2></Card>
  <Card :span="2">
    <nuxt-link to="/funds"><h2 class="mt-10">More funds</h2> </nuxt-link>
  </Card>
  <GridWrapper :span="6" :grid="6">
    <FundCard
      v-for="fund in bottomFunds"
      :id="fund?.id"
      :key="fund?.id"
      :title="fund?.title"
      :type="fund?.type?.title"
      :value="fund.value"
      :difference="fund.difference"
    />
  </GridWrapper>
</template>
