<template>
  <div id="app">
    <header v-if="!noHeader" id="nav">
      <div class="header-left">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        <span v-if="store.state.auth">
          |
          <router-link to="/boards">Boards</router-link>
        </span>
      </div>
      <div class="header-right">
        <a href v-if="store.state.auth" @click.prevent="logout">Logout</a>
        <router-link to="/login" v-else>Login</router-link>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import Actions from "@/store/actions";

const store = useStore();
const router = useRouter();

const logout = () => {
  store
    .dispatch(Actions.logout.name)
    .then(() => {
      router.push({ path: "/login" });
    })
    .catch((e) => {
      throw e;
    });
};
</script>

<style lang="scss">
html body #app {
  // height: 100%;
  margin: 0;
  padding: 0;
}
h1 {
  margin: 0;
}
</style>
<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

header {
  display: flex;
}
.header-left {
  display: inline-block;
  margin-right: auto;
}
.header-right {
  display: inline-block;
}
</style>
