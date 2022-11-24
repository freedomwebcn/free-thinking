<template>
  <div class="author-container" id="scrollArea" ref="containerRef">
    <div id="contentArea" ref="contentRef">
      <!-- @cick="$router.push(`/author/12/1`)" -->
      <span v-for="title in titleList" :key="title">{{ title }}</span>
    </div>
    <div class="loading" v-if="!titleList.length && status == null">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <empty descriptionText="文章还未收录" v-if="status != null" />
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import empty from '@/components/empty.vue';
import { reqTitleData } from '@/api';

const route = useRoute();
let titleList = ref([]);
let status = ref(null);
const containerRef = ref(null);
const contentRef = ref(null);
let data;

// 导航完成后获取数据
//--如果直接请求数据 会在上级路由组件中停留至该组件数据全部请求完成后才会渲染组件
watch(
  () => route.params,
  async () => {
    const id = route.params.id;
    if (id) {
      data = await reqTitleData({ id });
      data.forEach((item) => (item.title_list ? (titleList.value = item.title_list.split('||')) : (status.value = false)));
      await nextTick();
      // scroll总高度大于可视区域2倍 初始化Clusterize
      const isInitClusterize = contentRef.value.scrollHeight > containerRef.value.clientHeight * 2;
      isInitClusterize && new Clusterize({ scrollId: 'scrollArea', contentId: 'contentArea', rows_in_block: 16 });
    }
  },
  { immediate: true }
);
</script>

<style lang="less">
.author-container {
  height: 100%;
  overflow-y: auto;
  --animate-duration: 0.5s;
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
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
