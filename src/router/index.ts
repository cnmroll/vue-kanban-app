import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "../views/Home.vue";
import { checkAuth } from "./guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/templates/TodoHomeView.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/components/templates/TodoAboutView.vue"),
  },
  {
    path: "/boards",
    name: "Board",
    component: () => import("@/components/templates/TodoBoardView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/components/templates/TodoLoginView.vue"),
    meta: { noLogin: true },
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@/components/templates/TodoErrorView.vue"),
    meta: { noLogin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(checkAuth);

export default router;
