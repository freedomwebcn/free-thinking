import Home from "@/page/Home.vue";

const routes = [{
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

export default routes