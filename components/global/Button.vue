<script setup lang="ts">
import Loading from "~icons/ep/loading";

interface Props {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const emit = defineEmits(["click"]);

const click = () => {
  emit("click");
};

withDefaults(defineProps<Props>(), {
  isLoading: false,
  type: "button",
  disabled: false,
});
</script>

<template>
  <button :type="type" :disabled="disabled" class="button" @click="click">
    <Loading v-if="isLoading" class="spinner" />
    <slot v-else />
  </button>
</template>

<style lang="scss" scoped>
.button {
  width: 100%;
  padding: var(--padding-default);
  font-family: var(--text-secondary);
  font-size: var(--text-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--padding-default);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: var(--bg-accent-dark);
  }
}
</style>
