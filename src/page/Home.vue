<template>
  <div class="home-container">
    <h1>
      独立之精神 自由之思想
      <span class="iconfont icon-bi icon"></span>
    </h1>

    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="item.pic" @click="getDirData({ id: item.id, isMgz: item.isMgz })" :class="{ 'change-style': item.isMgz || (index == data.length - 2 && isAddClass) }">
        <div class="content">
          <img :src="item.pic" alt="" />
          <div>
            <span class="author">{{ item.name }}</span>
            <span class="article-total">
              <template v-if="item.isMgz"
                >共<i>{{ item.total }}</i
                >期
              </template>
              <template v-else
                >共<i> {{ item.total >= 999 ? '999+' : item.total }} </i>篇文章
              </template>
            </span>
          </div>
        </div>
      </li>
    </ul>

    <div class="loading" v-else>
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onActivated } from 'vue';
import { useRouter } from 'vue-router';
// import authorList from '@/assets/author';
import { reqHomeData } from '@/api';

const data = ref([]);
onActivated(() => {
  if (data.value.length) {
    return;
  }
  setTimeout(async () => {
    data.value = await reqHomeData();
  }, 300);
});

const router = useRouter();
const isAddClass = computed(() => ((data.length - 1) % 2 != 0 ? true : false));
const getDirData = ({ id, isMgz }) => {
  isMgz ? router.push(`/magazine/${id}`) : router.push(`/author/${id}`);
};
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  padding: 0 16px;
  overflow-y: auto;
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
    position: relative;
    font-size: 30px;
    padding: 22px 0 10px 0;
    text-align: center;
    border-bottom: 3px solid rgb(15, 15, 15);
    font-family: 'Zhi Mang Xing', cursive;
    font-weight: normal;
    .icon {
      position: absolute;
      right: 0;
      bottom: -4px;
      font-size: 28px;
    }
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-content: center;
    padding: 15px 0;

    li {
      display: flex;
      border-radius: 10px;
      height: 85px;
      align-items: center;
      background-color: rgb(244, 245, 247);
      padding: 0 10px;
      .content {
        display: flex;
        height: 70px;
        img {
          height: 100%;
          width: 56px;
          vertical-align: bottom;
          object-fit: cover;
          margin-right: 10px;
          flex: none;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        }
        div {
          display: flex;
          flex-wrap: wrap;
          padding: 12px 0;
          align-items: center;
          .author {
            flex: 100%;
            font-size: 16px;
            font-family: 'Noto Serif SC', serif;
          }
          .article-total {
            flex: 100%;
            color: rgb(173, 180, 190);
            font-size: 13px;
            i {
              font-family: din-medium;
              margin: 0 3px;
            }
          }
        }
      }
      &.change-style {
        grid-column: 1 / span 2;
        .content {
          div {
            padding: 0;
          }
        }
      }
    }
  }

  .loading {
    display: flex;
    height: calc(100% - 70px);
    align-items: center;
    justify-content: center;
  }
}
</style>
