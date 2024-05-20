import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ListingsView from "@/views/ListingsView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },

  {
    path: "/sets/listings",
    name: "Listings",
    component: ListingsView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

export default router;
