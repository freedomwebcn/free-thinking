<template>
  <div class="author-container" id="scrollArea" ref="containerRef" @scroll="(e) => setItem('scrollKey', e.target.scrollTop)">
    <template v-if="titleList.length">
      <div id="contentArea" ref="contentRef" @click="getContent">
        <span v-for="(title, i) in titleList" :data-id="i">{{ title }}</span>
      </div>
    </template>

    <empty descriptionText="文章还未收录" v-if="status != null" />
  </div>
</template>

<script setup>
import { ref, nextTick, onActivated } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import empty from '@/components/empty.vue';
import { reqTitleData } from '@/api';
import nprogress from 'nprogress/nprogress.js';
import '@/assets/nprogress.css';
import localStorage from './Magazine/localStorage';

const { setItem, getItem, clearLocalStorage } = localStorage();
const router = useRouter();
const route = useRoute();
const authorId = route.params.id;
const titleList = ref([]);
const status = ref(null);
const containerRef = ref(null);
const contentRef = ref(null);
let data;
nprogress.configure({
  template: '<div class="bar" role="bar"><div class="peg"></div</div>'
});

onBeforeRouteLeave((to) => {
  if (to.name != 'Content') {
    clearLocalStorage();
    titleList.value.length = 0;
    status.value = null;
  }
});

// 导航完成后获取数据
//--如果直接请求数据 会在上级路由组件中停留至该组件数据全部请求完成后才会渲染组件
onActivated(() => {
  titleList.value.length > 0 || getTitleListData(authorId);
  containerRef.value.scrollTop = getItem('scrollKey');
});

//请求接口数据
async function getTitleListData(id) {
  nprogress.start();
  data = await reqTitleData({ id });
  if (!data.title_list) {
    status.value = false;
    nprogress.done();
    return;
  }
  titleList.value = data.title_list.split('||');
  nprogress.done();
  setItem('titleListKey', titleList.value, true);
  await nextTick();
  initClusterize();
}

//初始化列表
function initClusterize() {
  // scroll总高度大于可视区域2倍 初始化Clusterize
  const isInitClusterize = contentRef.value.scrollHeight > containerRef.value.clientHeight * 2;
  if (!isInitClusterize) return;
  new Clusterize({ scrollId: 'scrollArea', contentId: 'contentArea', rows_in_block: 16 });
}

const getContent = (e) => {
  const titleId = e.target.getAttribute('data-id');
  router.push(`/author/${authorId}/${titleId}`);
};
</script>

<style lang="less">
.author-container {
  height: 100%;
  overflow-y: auto;
  #contentArea {
    font-size: 16px;
    line-height: 1.3;
    margin: 0 16px;

    span {
      display: block;
      height: 50px;
      padding: 0 5px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 50px;
      border-bottom: 1px solid #ebedf1;
    }
  }
}
</style>
