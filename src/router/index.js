import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
//Characters
import CharacterView from "../views/characters/CharacterView.vue";
import CharacterCreate from "../views/characters/CharacterCreate.vue";
import CharacterIndex from "../views/characters/CharacterIndex.vue";
import CharacterShow from "../views/characters/CharacterShow.vue";
import CharacterEdit from "../views/characters/CharacterEdit.vue";
//Titans
import TitanView from "../views/titans/TitanView.vue";
import TitanCreate from "../views/titans/TitanCreate.vue";
import TitanIndex from "../views/titans/TitanIndex.vue";
import TitanShow from "../views/titans/TitanShow.vue";
import TitanEdit from "../views/titans/TitanEdit.vue";
import Login from "../views/auth/Login.vue";
import Docs from "../views/Docs.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // Characters route
  {
    path: "/characters",
    name: "CharacterView",
    component: CharacterView,
    children: [
      {
        path: "create",
        name: "CharacterCreate",
        component: CharacterCreate,
      },
      {
        path: "",
        name: "CharacterIndex",
        component: CharacterIndex,
      },
      {
        path: ":id",
        name: "CharacterShow",
        component: CharacterShow,
      },
      {
        path: ":id/edit",
        name: "CharacterEdit",
        component: CharacterEdit,
      },
    ],
  },
  // Titans route
  {
    path: "/titans",
    name: "TitanView",
    component: TitanView,
    children: [
      {
        path: "create",
        name: "TitanCreate",
        component: TitanCreate,
      },
      {
        path: "",
        name: "TitanIndex",
        component: TitanIndex,
      },
      {
        path: ":id",
        name: "TitanShow",
        component: TitanShow,
      },
      {
        path: ":id/edit",
        name: "TitanEdit",
        component: TitanEdit,
      },
    ],
  },
  {
    path: "/docs",
    name: "Docs",
    component: Docs,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
