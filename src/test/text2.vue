<template>
  <div class="outer-box" ref="outerBoxRef">
    <div class="innder-box" ref="innerBoxRef">
      <ul class="ul-node">
        <li v-for="item in list">{{ item }}</li>
      </ul>
    </div>
    <span class="loading">
      <van-loading type="spinner" v-if="isShow" vertical>加载中</van-loading>
      <i v-else>{{ text }}</i>
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const outerBoxRef = ref(null);
const innerBoxRef = ref(null);
const list = ref([1, 2, 3, 4, 5, 6]);
let flag = false;
const isShow = ref(false);
const text = ref('');
let stopLoad = ref(false);
onMounted(() => {
  outerBoxRef.value.addEventListener('scroll', () => {
    if (stopLoad.value) {
      return;
    }
    const scrollHeight = innerBoxRef.value.scrollHeight; //获取文档总高度
    const clientHeight = outerBoxRef.value.clientHeight; //获取可视区域高度
    const scrollTop = outerBoxRef.value.scrollTop; //获取滚动距离
    if (flag) {
      return;
    }
    if (scrollTop >= scrollHeight - clientHeight) {
      isShow.value = true;
      flag = true;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          list.value.push(list.value.length + 1);
        }

        isShow.value = false;
        flag = false;
        console.log('加载完成');
        if (list.value.length > 18) {
          stopLoad.value = true;
          text.value = '没有更多了';
        }
      }, 1000);
      console.log('触底了');
    }
  });
});
</script>

<style lang="less" scoped>
.outer-box {
  height: 100%;
  overflow-y: scroll;
  .innder-box {
    ul {
      width: 100%;
      display: grid;
      grid-template-columns: 100%;
      justify-content: center;
      font-size: 25px;
      li {
        height: 200px;
        text-align: center;
        list-style: none;
      }
    }
  }
  .loading {
    display: block;
    width: 100%;
    text-align: center;
    padding: 15px 10px;
    color: #646566;

    i {
      font-size: 16px;
    }
  }
}
</style>
