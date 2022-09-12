import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ListView from "@/views/ListView.vue";
import PaginatedListView from "@/views/PaginatedListView.vue";
import PokemonDetailView from "@/views/PokemonDetailView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: ListView,
  },
  {
    path: "/paginate",
    name: "Paginate",
    component: PaginatedListView,
  },
  {
    path: "/pokemon/:id",
    name: "PokemonDetails",
    component: PokemonDetailView,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
