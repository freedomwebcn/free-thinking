<template>
  <NProgress>
    <div class="article">
      <h1>{{ contentData.title }}</h1>
      <span class="author">{{ contentData.author }}</span>
      <p v-for="text in contentData.text_data">
        {{ text }}
      </p>

      <van-divider v-if="contentData.title" />
      <div class="source">
        <span v-for="(sourceText, index) in contentData.source">{{ [index + 1] }}：{{ sourceText }}</span>
      </div>
    </div>
    <div class="loading" v-if="!contentData.title && status == null">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <empty descriptionText="内容未添加" v-if="status != null" />
  </NProgress>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import NProgress from '@/components/NProgress.vue';
import { reqContent } from '@/api';

const route = useRoute();
const contentData = ref({});
let status = ref(null);

watch(
  () => route.params,
  () => {
    if (!route.params.author_id) return;
    const { author_id, title_id } = route.params;
    // 如果网太快 loading会产生闪烁 加个300ms延迟
    setTimeout(async () => {
      const resData = await reqContent({ author_id, title_id });
      resData.data ? (contentData.value = JSON.parse(resData.data)) : (status.value = false);
      console.log(contentData.value);
    }, 300);
  },
  { immediate: true }
);
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

  .author {
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

    // &:last-child {
    //   text-align: right;
    // } //ismgz
  }

  .source {
    font-size: 15px;
    padding: 0px 0 16px 0;
    line-height: 1.5em;
    color: rgb(165, 165, 165);
    letter-spacing: 1.5px;

    span {
      display: block;
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
</style>
