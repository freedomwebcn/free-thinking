import Home from "@/page/Home.vue";
import Author from "@/page/Author.vue";

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
{
    path: "/author/:id",
    name: "Author",
    component: Author,
}
];

export default routes