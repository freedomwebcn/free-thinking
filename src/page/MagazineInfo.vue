<template>
  <div class="container">
    <template v-if="directoryList.length">
      <h1>本期目录</h1>
      <div class="directory-container" v-if="directoryList && directoryList.length">
        <ul>
          <li v-for="directoryItem in directoryList" :key="directoryItem.title">
            <div class="title van-hairline--bottom">
              <h2>{{ directoryItem.title }}</h2>
            </div>
            <div class="van-hairline--bottom common dir-name" v-for="content in directoryItem.directoryContent">
              {{ content.dir_name }}
            </div>
          </li>
        </ul>
      </div>
    </template>

    <div class="loading" v-if="!directoryList.length && satatus == null">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <empty descriptionText="本期目录还未录入" v-if="!directoryList.length && satatus != null" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import empty from '@/components/empty.vue';
import { reqMagazineDirData } from '@/api';
import { ref, watch } from 'vue';

let directoryList = ref([]);
const route = useRoute();
const [year, issue] = route.params.pubid.slice(0, -1).split('年');
const satatus = ref(null);

watch(
  () => route.params,
  async () => {
    if (!route.params.pubid) return;
    getDirData();
  },
  {
    immediate: true
  }
);

async function getDirData() {
  //获取到的是该年份发行的所有期刊
  const dirData = await reqMagazineDirData({ year });
  // 遍历所有期刊，找出与当前要查看的期刊 对应的那一项数据
  satatus.value = dirData.some((item) => {
    if (issue == item.issue.slice(0, -1)) {
      const { directory } = item;
      directoryList.value = directory;
      return true;
    }
  });
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: scroll;
  //   chrome去除滚动条样式
  &::-webkit-scrollbar {
    display: none;
  }
  //   兼容火狐
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  //   兼容IE10+
  -ms-overflow-style: none;
  h1 {
    height: 61px;
    line-height: 65px;
    text-align: center;
    background: url('../assets/w-mdicon4.gif') no-repeat center;
    background-size: auto 61px;
    font-size: 16px;
  }
  .directory-container {
    padding: 0 16px;
    ul {
      font-size: 15px;
      li {
        .title {
          padding: 10px 0;
          h2 {
            display: flex;
            align-items: center;
            margin: 0;
            font-size: 16px;
            &::before {
              content: '';
              width: 4px;
              height: 18px;
              background-color: red;
              margin-right: 8px;
            }
          }
        }
        .dir-name {
          display: flex;
          align-items: center;
          padding: 10px 0 10px 10px;
          letter-spacing: 1px;
          line-height: 1.25;
          color: #333333;
          &::before {
            content: '';
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: rgb(191, 191, 191);
            margin-right: 8px;
          }
        }
      }
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
