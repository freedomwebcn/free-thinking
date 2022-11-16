<template>
  <div class="author-container">
    <!-- <ul v-if="titleList && titleList.length"> -->
    <!-- @cick="$router.push(`/author/12/1`)" -->
    <!-- <li v-for="title in titleList" :key="title">{{ title }}</li> -->
    <!-- </ul> -->

    <div class="art_title-container">
      <nut-list :height="50" :listData="titleList" @scroll-bottom="handleScroll">
        <template v-slot="{ item }">
          <div class="list-item">
            {{ item }}
          </div>
        </template>
      </nut-list>
    </div>
    <!-- <empty descriptionText="文章未收录" v-else /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
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
</script>

<style lang="less" scoped>
.author-container {
  height: 100%;

  .art_title-container {
    font-size: 16px;
    line-height: 1.3;
    :deep(.nut-list-container) {
      .nut-list-item {
        margin: 0;
      }
    }
    .list-item {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0px 16px;
      border-bottom: 1px solid #ebedf1;
    }
  }
}
</style>
