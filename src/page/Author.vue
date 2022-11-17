<template>
  <div class="author-container" id="scrollArea">
    <ul v-if="titleList && titleList.length" id="contentArea">
      <!-- @cick="$router.push(`/author/12/1`)" -->
      <li v-for="title in titleList" :key="title">{{ title }}</li>
    </ul>

    <!-- <div class="art_title-container">
      <nut-list :height="50" :listData="titleList" @scroll-bottom="handleScroll">
        <template v-slot="{ item }">
          <div class="list-item">
            {{ item }}
          </div>
        </template>
      </nut-list>
    </div> -->
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

const handleScroll = () => {
  console.log(66);
};
onMounted(() => {
  nextTick(() => {
    var clusterize1 = new Clusterize({
      scrollId: 'scrollArea',
      contentId: 'contentArea',
      rows_in_block: 20
    });
  });
});
</script>

<style lang="less">
.author-container {
  height: 100%;
  overflow-y: auto;
  ul {
    font-size: 15px;
    line-height: 1.3;
    li {
      height: 30px;
      padding: 0px 16px 0 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 30px;
    }
  }
}
</style>
