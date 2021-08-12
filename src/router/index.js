import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
//Characters
import CharacterView from "../views/characters/CharacterView.vue";
import CharacterCreate from "../views/characters/CharacterCreate.vue";
import CharacterIndex from "../views/characters/CharacterIndex.vue";
import CharacterShow from "../views/characters/CharacterShow.vue";
import CharacterEdit from "../views/characters/CharacterEdit.vue";
import Login from "../views/auth/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
