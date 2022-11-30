<template>
  <div class="author-container" id="scrollArea" ref="containerRef">
    <div id="contentArea" ref="contentRef" @click="getContent">
      <span v-for="(title, i) in titleList" :data-id="i">{{ title }}</span>
    </div>

    <empty descriptionText="文章还未收录" v-if="status != null" />
  </div>
</template>

<script setup>
import { ref, nextTick, watch, onMounted } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
import empty from '@/components/empty.vue';
import { reqTitleData } from '@/api';
import nprogress from 'nprogress/nprogress.js';
import '@/assets/nprogress.css';

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
  if (to.name != 'Content') window.localStorage.clear();
});
onMounted(() => {
  containerRef.value.addEventListener('scroll', (e) => window.localStorage.setItem('scrollKey', e.target.scrollTop));
});

// 导航完成后获取数据
//--如果直接请求数据 会在上级路由组件中停留至该组件数据全部请求完成后才会渲染组件
watch(
  () => route.params,
  async () => {
    console.log('title--------------------', route.params);
    const id = route.params.id;
    if (!id) return;
    (await getLocalStorgeData()) || getTitleListData(id);
  },
  { immediate: true }
);

//从本地读取数据
async function getLocalStorgeData() {
  const data = JSON.parse(window.localStorage.getItem('titleListKey') || '[]');
  if (!data.length) return false;
  titleList.value = data;
  initClusterize();
  return true;
}

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
  window.localStorage.setItem('titleListKey', JSON.stringify(titleList.value));
  initClusterize();
}

//初始化列表
async function initClusterize() {
  await nextTick();
  // scroll总高度大于可视区域2倍 初始化Clusterize
  const isInitClusterize = contentRef.value.scrollHeight > containerRef.value.clientHeight * 2;
  if (!isInitClusterize) return;
  new Clusterize({ scrollId: 'scrollArea', contentId: 'contentArea', rows_in_block: 16 });
  //滚动到之前保存的scroll值
  containerRef.value.scrollTop = window.localStorage.getItem('scrollKey');
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
