<template>
  <div class="author-container" id="scrollArea">
    <div v-if="titleList && titleList.length" id="contentArea">
      <!-- @cick="$router.push(`/author/12/1`)" -->
      <span v-for="title in titleList" :key="title">{{ title }}</span>
    </div>

    <empty descriptionText="文章还未收录" v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import empty from '@/components/empty.vue';
// import authorList from '@/assets/author';
import { reqAuthorDirData } from '@/api';

const route = useRoute();
const authorId = route.params.id;
let titleList = [];

const dirData = await reqAuthorDirData({ id: authorId });

dirData.forEach((item) => item.title_list && (titleList = item.title_list.split('||')));
onMounted(() => {
  titleList.length > 0 &&
    new Clusterize({
      scrollId: 'scrollArea',
      contentId: 'contentArea',
      rows_in_block: 16
    });
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
}
</style>
