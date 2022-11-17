<template>
  <div class="author-container" id="scrollArea">
    <div v-if="titleList && titleList.length" id="contentArea">
      <!-- @cick="$router.push(`/author/12/1`)" -->
      <span v-for="title in titleList" :key="title">{{ title }}</span>
    </div>

    <!-- <empty descriptionText="文章未收录" v-else /> -->
  </div>
</template>

<script setup>
import Clusterize from 'clusterize.js/clusterize.js';

import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import empty from '@/components/empty.vue';
import authorList from '@/assets/author';

const route = useRoute();
const authorId = route.params.id;
const titleList = ref([]);
const { at_title_list } = authorList.find((item) => item.id == authorId);
titleList.value = at_title_list;

onMounted(() => {
  nextTick(() => {
    var clusterize1 = new Clusterize({
      scrollId: 'scrollArea',
      contentId: 'contentArea',
      rows_in_block: 16
    });
  });
});
</script>

<style lang="less">
.author-container {
  height: 100%;
  overflow-y: auto;
  #contentArea {
    font-size: 16px;
    line-height: 1.3;

    span {
      display: block;
      height: 50px;
      padding: 0px 16px 0 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 50px;
      border-bottom: 1px solid #ebedf1;
      border-radius: 5px;
    }
  }
}
</style>
