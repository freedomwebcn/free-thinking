<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.app {
  width: 375px;
  height: 100%;
  max-width: 540px;
  margin: 0 auto;
}
</style>

