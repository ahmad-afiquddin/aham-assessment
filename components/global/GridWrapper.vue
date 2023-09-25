<script setup lang="ts">
export interface Props {
  span?: number;
  mobile?: number;
  tablet?: number;
  grid?: number;
}

withDefaults(defineProps<Props>(), {
  span: 1,
  mobile: 0,
  tablet: 0,
  grid: 1,
});
</script>

<template>
  <section
    :class="`grid-wrapper span-${span} mobile-span-${mobile} tablet-span-${tablet} grid-${grid}`"
  >
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.grid-wrapper {
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

@for $i from 1 through 6 {
  .grid-#{$i} {
    display: grid !important;
    grid-template-columns: repeat($i, 1fr);
    column-gap: var(--padding-sm);
    row-gap: var(--padding-sm);
  }
}
</style>
