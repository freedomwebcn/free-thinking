import Home from '@/page/Home.vue';
import Title from '@/page/Title.vue';
import Content from '@/page/Content.vue';
import Magazine from '@/page/Magazine/Magazine.vue';

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
    path: '/magazine/:id',
    name: 'Magazine',
    component: Magazine
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
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: test
  // }
];

export default routes;
