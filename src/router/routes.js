import Home from "@/page/Home.vue";
import Author from "@/page/Author.vue";
import Magazine from "@/page/Magazine.vue";

import art_12_1 from "@/art/art_12_1.vue";



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
    path: "/magazine/:id",
    name: "Magazine",
    component: Magazine,
},
{
    path: "/author/12/1",
    name: "art",
    component: art_12_1,
}
];



export default routes