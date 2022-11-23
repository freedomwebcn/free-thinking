<template>
  <div class="author-container" id="scrollArea">
    <div v-if="titleList && titleList.length" id="contentArea">
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
import { ref, watchEffect, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import empty from '@/components/empty.vue';
import { reqAuthorDirData } from '@/api';

const route = useRoute();
let titleList = ref([]);
let data;
let status = ref(null);
// 导航完成后获取数据 --如果直接请求数据 会在上级路由组件中停留到该组件数据全部请求完成后才会渲染该组件
watchEffect(async () => {
  if (route.params.id) {
    data = await reqAuthorDirData({ id: route.params.id });
    data.forEach((item) => (item.title_list ? (titleList.value = item.title_list.split('||')) : (status.value = false)));

    nextTick(() => {
      titleList.value.length > 0 &&
        new Clusterize({
          scrollId: 'scrollArea',
          contentId: 'contentArea',
          rows_in_block: 16
        });
    });
  }
});
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
