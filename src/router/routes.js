import Home from '@/page/Home.vue';
import Title from '@/page/Title.vue';
import MagazineList from '@/page/MagazineList.vue';
import MagazineInfo from '@/page/MagazineInfo.vue';

import Content from '@/page/Content.vue';

import text2 from '@/test/text2.vue';

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
  },
  {
    path: '/test2',
    name: 'text2',
    component: text2
  }
];

export default routes;
