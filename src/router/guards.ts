import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

import { store } from "@/store/index";

export const checkAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (to.matched.some((record) => !record.meta.noLogin)) {
    if (!store.state.auth) {
      next({ path: "/login" });
      return;
    }
  }

  next();
};
