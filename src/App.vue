<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :exclude="['MagazineInfo', 'Author']">
        <component :is="Component" :key="$route.name" />
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

