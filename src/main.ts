import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

import * as MutationTypes from "@/store/mutation-types";

const app = createApp(App);
app.use(store, key).use(router).mount("#app");

// app.config.performance = true; // NODE_ENV == 'development'で測定有効化

app.config.errorHandler = (err, vm, info) => {
  // handle error
  console.error("errorHandler err:", err);
  console.error("errorHandler vm:", vm);
  console.error("errorHandler info:", info);
  store.commit(MutationTypes.SET_ERROR, { content: err, info: info });
  router.push({ path: "/error" });
};
