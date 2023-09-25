<script setup lang="ts">
import TopRight from "~icons/ep/top-right";
import BottomLeft from "~icons/ep/bottom-left";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
const userStorage = useUser();

const loginForm = reactive({
  email: "",
  password: "",
});

const registerForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);

const loginRules = {
  email: { required, email },
  password: { required, minLengthValue: minLength(8) },
};

const password = computed(() => {
  return registerForm.password || "";
});

const registerRules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  password: { required, minLengthValue: minLength(8) },
  confirmPassword: { required, sameAsPassword: sameAs(password) },
};

function consolidateError(errors: any[]) {
  return errors?.map(({ $message }) => $message).join(" ") || "";
}

const login$ = useVuelidate(loginRules, loginForm);
const register$ = useVuelidate(registerRules, registerForm);

async function submitLogin() {
  login$.value.$touch();
  if (!login$.value.$invalid) {
    isLoading.value = true;

    const data = await $fetch("/api/auth/login", {
      method: "POST",
      body: loginForm,
    }).catch((error) => {
      console.error(error.data);
    });

    isLoading.value = false;

    data && userStorage.storeUser(data);
    data && (await navigateTo("/"));
  }
}

async function submitRegister() {
  register$.value.$touch();
  if (!register$.value.$invalid) {
    isLoading.value = true;

    const data = await $fetch("/api/auth/register", {
      method: "POST",
      body: registerForm,
    }).catch((error) => {
      console.error(error.data);
    });

    isLoading.value = false;

    data && userStorage.storeUser(data);
    data && (await navigateTo("/"));
  }
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <Head>
    <Title>AHAM Assessment | Login</Title>
  </Head>
  <Card :span="6">
    <h1 class="mt-10">Login</h1>
  </Card>
  <GridWrapper :span="6" :grid="1">
    <form class="form">
      <GridWrapper :span="6" :grid="6">
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="login$.email.$model"
            placeholder="Email Address"
            :error="consolidateError(login$.email.$errors)"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="login$.password.$model"
            type="password"
            placeholder="Password"
            :error="consolidateError(login$.password.$errors)"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="6">
          <Button :is-loading="isLoading" @click="submitLogin"
            >Login <BottomLeft
          /></Button>
        </GridWrapper>
      </GridWrapper>
    </form>
  </GridWrapper>
  <Card :span="6">
    <h1 class="mt-10">Register</h1>
  </Card>
  <GridWrapper :span="6" :grid="1">
    <form class="form">
      <GridWrapper :span="6" :grid="6">
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="register$.firstName.$model"
            placeholder="First Name"
            :error="consolidateError(register$.firstName.$errors)"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="register$.lastName.$model"
            placeholder="Last Name"
            :error="consolidateError(register$.lastName.$errors)"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="register$.email.$model"
            placeholder="Email"
            :error="consolidateError(register$.email.$errors)"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="register$.password.$model"
            placeholder="Password"
            :error="consolidateError(register$.password.$errors)"
            type="password"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Input
            v-model:value="register$.confirmPassword.$model"
            placeholder="Confirm Password"
            :error="consolidateError(register$.confirmPassword.$errors)"
            type="password"
          />
        </GridWrapper>
        <GridWrapper :span="2" :mobile="6" :tablet="3">
          <Button :is-loading="isLoading" @click="submitRegister"
            >Register <TopRight
          /></Button>
        </GridWrapper>
      </GridWrapper>
    </form>
  </GridWrapper>
</template>
