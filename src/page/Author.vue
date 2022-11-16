<template>
  <div class="author-container">
    <div class="content">
      <ul v-if="titleList && titleList.length">
        <!-- @cick="$router.push(`/author/12/1`)" -->
        <li v-for="title in titleList" :key="title">{{ title }}</li>
      </ul>

      <empty descriptionText="文章未收录" v-else />
    </div>
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
</script>

<style lang="less" scoped>
.author-container {
  height: 100%;
  overflow-y: scroll;
  .content {
    ul {
      font-size: 16px;
      line-height: 1.5;

      li {
        padding: 10px 16px;
        border-bottom: 1px solid #ebedf1;
      }
    }
  }
}
</style>
