<template>
  <div class="login-view">
    <h1>MyTodo</h1>
    <TodoLoginForm :onlogin="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import TodoLoginForm from "@/components/molecules/TodoLoginForm.vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { AuthInfo } from "@/types/auth";

const store = useStore();
const router = useRouter();

const handleLogin = (authInfo: AuthInfo) => {
  return store
    .dispatch("login", authInfo)
    .then(() => {
      router.push({ path: "/boards" });
    })
    .catch((err) => Promise.reject(err));
};
</script>

<style scoped>
.login-view {
  width: 320px;
  margin: auto;
}
</style>
