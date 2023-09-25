<script setup lang="ts">
interface Props {
  type?: string;
  value?: string | number;
  error?: string;
  placeholder?: string;
}

const emit = defineEmits(["update:value"]);

const onChange = (event: Event) => {
  emit("update:value", (event.target as HTMLInputElement).value);
};

withDefaults(defineProps<Props>(), {
  value: "",
  type: "text",
  error: "",
  placeholder: "Enter text here",
});
</script>

<template>
  <div class="input-container">
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="onChange($event)"
    />
    <p v-if="error?.length" class="mt-1 text-sm text-red">{{ error }}</p>
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  .input {
    width: 100%;
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
}
</style>
