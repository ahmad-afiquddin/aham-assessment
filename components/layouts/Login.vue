<script setup lang="ts">
import TopRight from "~icons/ep/top-right";
const userStorage = useUser();
const route = useRoute();

let user = reactive<Record<string, any>>({});
const isLoggedIn = ref(false);

interface Props {
  class?: string;
}

watch(
  () => route.path,
  () => {
    if (userStorage.getUser()) {
      user = userStorage.getUser() || {};
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  },
  { deep: true, immediate: true },
);

const props = defineProps<Props>();
</script>

<template>
  <nuxt-link v-if="!isLoggedIn" class="link" :class="props.class" to="/login">
    <span>Login</span>
    <TopRight class="icon-lg" />
  </nuxt-link>
  <nuxt-link
    v-if="isLoggedIn"
    class="link"
    :class="props.class"
    to="/portfolio"
  >
    <span>{{ `${user.firstName} ${user.lastName}` }}</span>
    <TopRight class="icon-lg" />
  </nuxt-link>
</template>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  column-gap: var(--padding-sm);
}
</style>
