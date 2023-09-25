<script setup lang="ts">
import Search from "~icons/ep/search";
import FundCard from "~/components/funds/FundCard.vue";

const title = ref("");
const typeId = ref("");

const { data: fundTypes } = await useFetch("/api/fundTypes");
const { data: funds, refresh: searchFunds } = await useFetch(`/api/funds`, {
  query: {
    title,
    typeId,
  },
});
</script>

<template>
  <Head>
    <Title>AHAM Assessment | Funds</Title>
  </Head>
  <Card :span="6"
    ><h2 class="mt-10">
      Find a fund. Search by name or filter by fund type.
    </h2></Card
  >
  <GridWrapper :span="2" :mobile="6">
    <Input v-model:value="title" placeholder="Enter fund name" />
  </GridWrapper>
  <GridWrapper :span="2" :mobile="6">
    <Select v-model:value="typeId" placeholder="Select fund type">
      <option
        v-for="fType in fundTypes"
        :key="fType.id"
        :value="String(fType.id)"
      >
        {{ fType.title }}
      </option>
    </Select>
  </GridWrapper>
  <GridWrapper :span="2" :mobile="6">
    <Button @click="searchFunds()">Search <Search /></Button>
  </GridWrapper>
  <template v-if="funds?.length">
    <FundCard
      v-for="fund in funds"
      :id="fund?.id"
      :key="fund?.id"
      :title="fund?.title"
      :type="fund?.type?.title"
      :value="fund.value"
      :difference="fund.difference"
    />
  </template>
  <template v-else>
    <Card :span="6"
      ><p class="mt-10">No funds with exact search terms found</p></Card
    >
  </template>
</template>
