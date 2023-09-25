<script setup lang="ts"></script>

<template>
  <table class="table">
    <slot />
  </table>
</template>

<style lang="scss">
.table {
  font-family: var(--text-secondary);
  font-size: var(--text-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--padding-default);
  overflow: hidden;

  th,
  td {
    padding: var(--padding-sm);
    text-align: left;
  }

  td {
    background-color: var(--bg-main);
  }
}
</style>
