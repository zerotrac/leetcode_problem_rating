import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ProblemRating from "../views/ProblemRating.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: ProblemRating,
  },
];

const router = createRouter({
  history: createWebHashHistory("./"),
  routes,
});

export default router;
