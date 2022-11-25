import Home from '@/page/Home.vue';
import Title from '@/page/Title.vue';
import Content from '@/page/Content.vue';
import MagazineList from '@/page/MagazineList.vue';
import MagazineInfo from '@/page/MagazineInfo.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/author/:id',
    name: 'Title',
    component: Title
  },
  {
    path: '/magazinelist/:id',
    name: 'MagazineList',
    component: MagazineList
  },
  {
    path: '/magazineInfo/:pubid',
    name: 'MagazineInfo',
    component: MagazineInfo
  },
  {
    path: '/author/:author_id/:title_id',
    name: 'Content',
    component: Content
  }
];

export default routes;
