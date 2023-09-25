<script setup lang="ts">
interface Props {
  value?: string;
  placeholder?: string;
}

const emit = defineEmits(["update:value"]);

const onChange = (event: Event) => {
  emit("update:value", (event.target as HTMLInputElement).value);
};

withDefaults(defineProps<Props>(), {
  value: "",
  placeholder: "Select an option",
});
</script>

<template>
  <select
    class="select"
    :value="value"
    :placeholder="placeholder"
    @change="onChange($event)"
  >
    <option v-if="placeholder" selected disabled value="">
      {{ placeholder }}
    </option>
    <slot />
  </select>
</template>

<style lang="scss" scoped>
.select {
  width: 100%;
  max-width: 100%;
  padding: var(--padding-default);
  font-family: var(--text-secondary);
  font-size: var(--text-lg);
  background-color: var(--bg-main);
  border: 1px solid var(--bg-accent-dark);
  border-radius: var(--padding-default);
  transition: all 0.1s ease-in-out;

  &:focus {
    border-color: var(--bg-accent-darker);
  }
}
</style>
