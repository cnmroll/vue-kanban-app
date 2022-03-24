import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";
import { State } from "@/types/store";
import createPersistedState from "vuex-persistedstate";

export const store = createStore<State>({
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [
    createPersistedState({
      key: "todo_vux",
      paths: ["auth"],
    }),
  ],
});

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}
