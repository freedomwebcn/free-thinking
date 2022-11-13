import Home from "@/page/Home.vue";
import Author from "@/page/Author.vue";
import MagazineList from "@/page/MagazineList.vue";
import MagazineInfo from "@/page/MagazineInfo.vue";


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
    path: "/magazinelist/:id",
    name: "MagazineList",
    component: MagazineList,
}, {
    path: "/magazineInfo/:pubid",
    name: "MagazineInfo",
    component: MagazineInfo,
},
{
    path: "/author/12/1",
    name: "art",
    component: art_12_1,
}
];



export default routes