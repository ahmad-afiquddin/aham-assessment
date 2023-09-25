<script setup lang="ts">
import Menu from "~icons/ep/menu";
import Login from "~/components/layouts/Login.vue";
import NavMenu from "~/components/layouts/Menu.vue";

const blur = ref(false);
const isOpen = ref(false);

function toggleBlur() {
  if (window.scrollY > 0) {
    blur.value = true;
  } else {
    blur.value = false;
  }
}

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

onMounted(() => {
  document.addEventListener("scroll", toggleBlur);
});

onUnmounted(() => {
  document.removeEventListener("scroll", toggleBlur);
});
</script>

<template>
  <Head>
    <Title>AHAM Assessment</Title>
  </Head>
  <NuxtLoadingIndicator />
  <ClientOnly>
    <NavMenu v-model:is-open="isOpen" />
  </ClientOnly>
  <nav class="navigation" :class="blur ? 'blur' : ''">
    <img class="logo" src="/assets/svg/aham-logo.svg" />
    <section class="link-container">
      <nuxt-link class="link lg-only" to="/"> Home </nuxt-link>
      <nuxt-link class="link lg-only" to="/funds"> Funds </nuxt-link>
      <ClientOnly>
        <Login class="lg-only" />
      </ClientOnly>
      <button class="link sm-only" @click="toggleMenu">
        <Menu class="icon-xl" />
      </button>
    </section>
  </nav>
  <main class="main-container">
    <slot />
  </main>
</template>

<style lang="scss" scoped>
.main-container {
  padding: var(--padding-lg);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: var(--padding-sm);
  row-gap: var(--padding-sm);
}
.navigation {
  padding: var(--padding-lg);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--text-secondary);
  font-size: var(--text-lg);
  font-weight: 600;

  &.blur {
    backdrop-filter: blur(10px);
  }

  .logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  .link-container {
    display: flex;
    align-items: center;
    column-gap: calc(var(--padding-lg) * 5);

    .link {
      display: flex;
      align-items: center;
      column-gap: var(--padding-sm);
    }
  }
}
</style>
