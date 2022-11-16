<template>
  <div class="author-container">
    <!-- <header></header> -->
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

  .content {
    // display: grid;
    height: 100%;
    // padding: 56px 0px 0 0px;
    // grid-auto-rows: min-content;

    h1 {
      text-align: center;
      margin-bottom: 10px;
    }

    ul {
      font-size: 16px;
      height: 100%;

      li {
        padding: 20px 0 20px 5px;
        border-bottom: 1px solid #ebedf1;
        border-radius: 5px;
        padding-left: 15px;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
