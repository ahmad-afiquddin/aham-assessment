<template>
  <span class="tag">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.tag {
  padding: var(--padding-sm);
  display: inline-block;
  font-size: var(--text-sm);
  background-color: var(--bg-accent-darker);
  border-radius: var(--padding-sm);
}
</style>
