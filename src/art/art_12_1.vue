<template>
  <NProgress>
    <div class="article">
      <h1>{{ contentData.title }}</h1>
      <span>{{ contentData.author }}</span>
      <p v-for="text in contentData.text_data">
        {{ text }}
      </p>
    </div>
  </NProgress>
</template>
<script setup>
import NProgress from '@/components/NProgress.vue';
import { reqContent } from '@/api';

const data = await reqContent();
const contentData = JSON.parse(data[0].content);
console.log(contentData);
</script>
<style lang="less" scoped>
@import 'lxgw-wenkai-screen-webfont/style.css';
.article {
  font-family: 'LXGW WenKai Screen', sans-serif;
  h1 {
    text-align: center;
    font-size: 22px;
    margin: 25px 0;
  }

  span {
    display: block;
    text-align: center;
    font-size: 16px;
  }

  p {
    line-height: 30px;
    font-size: 18px;
    text-indent: 2em;
    letter-spacing: 2px;
    text-align: justify;
    text-justify: inter-ideograph;
    &:last-child {
      text-align: right;
    }
  }
}
</style>
