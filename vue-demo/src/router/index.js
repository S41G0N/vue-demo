import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ListingsView from "@/views/ListingsView.vue";
import SetView from "@/views/SetView.vue";

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
  },

  {
    path: "/sets/listings/:set_id",
    name: "SetPage",
    component: SetView
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  }
});

export default router;
