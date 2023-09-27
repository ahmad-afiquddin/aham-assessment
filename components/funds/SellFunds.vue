<script setup lang="ts">
import CloseIcon from "~icons/ep/close";
const { $toast } = useNuxtApp();

interface Props {
  id: number;
  value: number;
  units: number;
}

const isLoading = ref(false);
const props = defineProps<Props>();
const emit = defineEmits(["update"]);

const sellUnits = ref(props.units);

async function submitSale() {
  isLoading.value = true;
  const sale = await $fetch("/api/purchase", {
    method: "POST",
    body: {
      fundId: props.id,
      units: -Math.floor(sellUnits.value),
    },
  }).catch((error) => {
    console.error(error.data);
    $toast?.error(error.data?.message);
  });

  if (sale) {
    emit("update");
    $toast?.success("Fund sold!");
  }

  isLoading.value = false;
}
</script>

<template>
  <Card :span="4" :mobile="6">
    <div class="purchase">
      <div class="purchase-input">
        <div class="flex-shrink">
          <Input v-model:value="sellUnits" type="number" />
        </div>
        <span><CloseIcon /></span>
        <span>MYR {{ value }}</span>
      </div>
      <div>
        <h2>Total</h2>
        <p>MYR {{ Math.round(sellUnits * value * 10000) / 10000 }}</p>
      </div>
    </div>
  </Card>
  <GridWrapper :span="2" :mobile="6">
    <Button
      :is-loading="isLoading"
      :disabled="Math.floor(sellUnits) < 1 || Math.floor(sellUnits) > units"
      @click="submitSale"
    >
      <template v-if="Math.floor(sellUnits) > 0">
        Sell {{ Math.floor(sellUnits) }} unit(s)
      </template>
      <template v-if="Math.floor(sellUnits) < 1">Minimum 1 unit</template>
      <template v-if="Math.floor(sellUnits) > units"
        >Maximum {{ units }} units</template
      >
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
