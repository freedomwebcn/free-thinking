<template>
  <div class="mysqlnote-container">
    <h1>Mysql笔记</h1>
    <div class="grammar-content">
      <h3>创建数据库</h3>
      <p class="create-database">create database</p>
      <h3>选择某个要操作的数据库</h3>
      <p class="create-database">use 数据库名称</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {});
</script>

<style lang="less" scoped>
.mysqlnote-container {
  .grammar-content {
    padding: 16px;
    h3 {
      margin: 5px 0;
    }
    .create-database {
      font-size: 15px;
      color: #89ddff;
      padding-left: 5px;
      margin: 5px 0;
      background-color: #292d3e;
    }
  }
}
</style>
