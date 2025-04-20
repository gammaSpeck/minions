import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import BillSplitterPage from "../views/BillSplitterPage.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/tools/bill-splitter",
    name: "BillSplitter",
    component: BillSplitterPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
