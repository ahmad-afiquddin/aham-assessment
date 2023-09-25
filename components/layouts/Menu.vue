<script setup lang="ts">
import Login from "./Login.vue";

interface Props {
  isOpen: boolean;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});
const emit = defineEmits(["update:isOpen"]);

function toggleMenu() {
  if (window.innerWidth > 768) {
    emit("update:isOpen", false);
  }
}

const route = useRoute();

watch(
  () => route.path,
  () => {
    emit("update:isOpen", false);
  },
  { deep: true, immediate: true },
);

toggleMenu();

onMounted(() => {
  document.addEventListener("resize", toggleMenu);
});

onUnmounted(() => {
  document.removeEventListener("resize", toggleMenu);
});
</script>

<template>
  <section class="menu" :class="isOpen ? 'open' : ''">
    <section class="link-container">
      <nuxt-link class="link" to="/"> Home </nuxt-link>
      <nuxt-link class="link" to="/funds"> Funds </nuxt-link>
      <ClientOnly>
        <Login />
      </ClientOnly>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: 100%;
  padding: calc(5 * var(--padding-lg));
  display: none;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  font-family: var(--text-secondary);
  font-size: var(--text-2xl);
  font-weight: 600;
  backdrop-filter: blur(20px);
  transform: translateY(-110%);
  transition: all 0.5s ease-in-out;

  &.open {
    transform: translateY(0);
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }

  .link-container {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--padding-lg) * 2);
    position: relative;

    .link {
      display: flex;
      align-items: center;
      column-gap: var(--padding-sm);
    }
  }
}
</style>
