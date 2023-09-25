<script setup lang="ts">
import CloseIcon from "~icons/ep/close";
const { $toast } = useNuxtApp();

interface Props {
  id: number;
  value: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update"]);
const isLoading = ref(false);

const units = ref(1);

async function submitPurchase() {
  isLoading.value = true;
  const purchase = await $fetch("/api/purchase", {
    method: "POST",
    body: {
      fundId: props.id,
      units: units.value,
    },
  }).catch((error) => {
    console.error(error.data);
    $toast?.error(error.data?.message);
  });

  if (purchase) {
    emit("update");
    $toast?.success("Fund purchased!");
  }

  isLoading.value = false;
}
</script>

<template>
  <Card :span="4" :mobile="6">
    <div class="purchase">
      <div class="purchase-input">
        <div class="flex-shrink">
          <Input v-model:value="units" type="number" />
        </div>
        <span><CloseIcon /></span>
        <span>MYR {{ value }}</span>
      </div>
      <div>
        <h2>Total</h2>
        <p>MYR {{ Math.round(units * value * 10000) / 10000 }}</p>
      </div>
    </div>
  </Card>
  <GridWrapper :span="2" :mobile="6">
    <Button
      :is-loading="isLoading"
      :disabled="units < 1"
      @click="submitPurchase"
    >
      <template v-if="units > 0"> Purchase {{ units }} unit(s) </template>
      <template v-if="units < 1">Minimum 1 unit</template>
    </Button>
  </GridWrapper>
</template>

<style lang="scss" scoped>
.purchase {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(3 * var(--padding-default));

  flex-wrap: wrap;
  .purchase-input {
    display: flex;
    align-items: baseline;

    input {
      flex: 0 1 auto;
    }
  }
}
</style>
