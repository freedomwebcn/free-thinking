<template>
  <div class="container">
    <h1>本期目录</h1>
    <div class="directory-container" v-if="directoryList && directoryList.length">
      <ul>
        <li v-for="directoryItem in directoryList" :key="directoryItem.title">
          <div class="title van-hairline--bottom">
            <h2>{{ directoryItem.title }}</h2>
          </div>
          <div class="van-hairline--bottom common dec-name" v-for="content in directoryItem.directoryContent">
            {{ content.dct_name }}
          </div>
        </li>
      </ul>
    </div>

    <div class="tips" v-else>
      <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" description="本期目录还未录入" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import magazineDirectoryList from '@/assets/magazine_test_dec.json';

const directoryList = ref([]);
const route = useRoute();
const [year, issue] = route.params.pubid.slice(0, -1).split('年');
try {
  directoryList.value = [];
  const { directory } = magazineDirectoryList[year].find((directoryItem) => directoryItem.issue.slice(0, -1) == issue);
  directoryList.value = directory;
} catch (error) {
  console.log('本期目录未录入');
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
        .dec-name {
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
  .tips {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
