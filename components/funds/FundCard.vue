<script setup lang="ts">
import TopRight from "~icons/ep/top-right";
import UpOne from "~icons/icon-park-solid/up-one";
import DownOne from "~icons/icon-park-solid/down-one";

interface Props {
  id: number;
  title: string;
  type: string;
  value: number;
  difference: number;
}

defineProps<Props>();
</script>

<template>
  <Card :span="2" :mobile="6" :tablet="2">
    <section class="title">
      <div>
        <h2>{{ title }}</h2>
        <Tag class="mt-2">{{ type }}</Tag>
      </div>
      <div>
        <nuxt-link :to="`/funds/${id}`"
          ><button class="button-icon"><TopRight /></button
        ></nuxt-link>
      </div>
    </section>
    <section class="mt-8 nav-price">
      <div>
        <h3 class="text-xl">NAV</h3>
        <span>
          <UpOne v-if="difference > 0" class="text-green" />
          <DownOne v-if="difference < 0" class="text-red" />
          {{ Math.round(difference * 100) / 100 }}%
        </span>
      </div>
      <div>
        <h4 class="text-sm">MYR</h4>
        <h4 class="text-2xl">{{ value }}</h4>
      </div>
    </section>
  </Card>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
}

.nav-price {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>
