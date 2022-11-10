import Home from "@/page/Home.vue";
import Author from "@/page/Author.vue";
import art_1_1 from "@/art/art_1_1.vue";



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
},
{
    path: "/author/:id/:artid",
    name: "art",
    component: art_1_1,
}
];



export default routes