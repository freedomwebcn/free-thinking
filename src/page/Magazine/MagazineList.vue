<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50" v-if="result.length">
    <ul class="magazine-list-content">
      <li v-for="item in result" :key="item.publishDate" @click="$router.push(`/magazineInfo/${item.publishDate}`)">
        <div class="book-cover">
          <img v-lazy="item.img" alt="" />
          <span class="bookCover_gradientDecor"></span>
        </div>
        <span class="issue">{{ item.publishDate }}</span>
      </li>
    </ul>
  </van-list>

  <div class="loading" v-else>
    <van-loading size="24px" vertical>加载中...</van-loading>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
import { reqMagazineData } from '@/api';
import { chunk } from 'lodash';
import localStorage from './localStorage';

const loading = ref(false);
const finished = ref(false);
const result = ref([]);
const route = useRoute();
const { setItem, getItem } = localStorage();

const formatData = [];
let chunkData = JSON.parse(getItem('data') || '[]');

onBeforeRouteLeave((to) => {
  // 根据跳转的路由 决定是否要清除数据
  if (to.name != 'MagazineInfo') {
    //缓存路由跳转后，数据还存在，当跳转到Home路由，再跳进来时用的数据还是之前请求的。
    result.value = [];
  }
});

watch(
  () => route.params,
  async () => {
    if (!route.params.id) return;
    result.value.length || getMagazineListData();
  },
  { immediate: true }
);

async function getMagazineListData() {
  const listData = await reqMagazineData();
  // 格式化json数据
  listData.forEach((item) => {
    item.pub_issue = JSON.parse(item.pub_issue);
    const { pub_year } = item;
    item.pub_issue.forEach((issueObj) => {
      const { issue, img } = issueObj;
      formatData.push({ publishDate: pub_year + '年' + issue, img });
    });
  });
  setTimeout(() => {
    chunkData = chunk(formatData, 15);
    result.value = chunkData[0];
    setItem('data', { result: chunkData }, true);
  }, 300);
}

let index = 0;
const onLoad = () => {
  //模拟下拉加载
  setTimeout(() => {
    index += 1;
    result.value.push(...chunkData[index]);
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (result.value.length >= 297) {
      finished.value = true;
    }
  }, 500);
};
</script>
<style lang="less" scoped>
.magazine-list-content {
  width: 375px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
  padding: 110px 10px 0 10px;
  li {
    width: 105px;
    border-radius: 5px;
    .book-cover {
      position: relative;
      height: 146px;
      .bookCover_gradientDecor {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: linear-gradient(
          90deg,
          hsla(0, 0%, 63.1%, 0.25),
          rgba(21, 21, 20, 0.1) 1%,
          hsla(0, 0%, 100%, 0.15) 4%,
          hsla(0, 0%, 58%, 0.1) 8%,
          hsla(0, 0%, 89%, 0) 57%,
          rgba(223, 218, 218, 0.03) 91%,
          rgba(223, 218, 218, 0.05) 98%,
          hsla(0, 0%, 100%, 0.1)
        );
        box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.1);
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
        background: #d8d8d8;
      }
    }
    .issue {
      display: block;
      margin: 6px 0;
      font-size: 15px;
      text-align: center;
      // color: #5d646e;
      color: rgb(33, 40, 50);
    }
  }
}

.loading {
  width: 375px;
  height: calc(100% - 99px);
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 540px) {
  .magazine-list-content {
    padding-top: 99px;
  }
}
</style>
