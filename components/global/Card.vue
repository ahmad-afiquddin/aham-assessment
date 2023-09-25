<script setup lang="ts">
interface Props {
  span?: number;
  mobile?: number;
  tablet?: number;
}

withDefaults(defineProps<Props>(), {
  span: 1,
  mobile: 0,
  tablet: 0,
});
</script>

<template>
  <article
    class="card"
    :class="`span-${span} mobile-span-${mobile} tablet-span-${tablet}`"
  >
    <slot />
  </article>
</template>

<style lang="scss" scoped>
.card {
  padding: var(--padding-default);
  font-family: var(--text-secondary);
  font-size: var(--text-lg);
  background-color: var(--bg-secondary);
  border-radius: var(--padding-default);
  overflow: hidden;
}

@for $i from 1 through 6 {
  .span-#{$i} {
    grid-column: span $i;
  }

  @media screen and (max-width: 768px) {
    .mobile-span-#{$i} {
      grid-column: span $i !important;
    }
  }

  @media screen and (max-width: 1024px) {
    .tablet-span-#{$i} {
      grid-column: span $i !important;
    }
  }
}
</style>
