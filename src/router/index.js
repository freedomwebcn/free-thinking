import { createRouter,  

// createWebHistory

createWebHashHistory 



} from "vue-router";
import Home from "@/page/Home.vue";
const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
