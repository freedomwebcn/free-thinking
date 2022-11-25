<template>
  <NProgress>
    <div class="article">
      <h1>{{ contentData.title }}</h1>
      <span>{{ contentData.author }}</span>
      <p v-for="text in contentData.text_data">
        {{ text }}
      </p>
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
  async () => {
    if (!route.params.author_id) return;
    const { author_id, title_id } = route.params;
    const resData = await reqContent({ author_id, title_id });
    resData.data ? (contentData.value = JSON.parse(resData.data)) : (status.value = false);
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
    } //ismgz
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
