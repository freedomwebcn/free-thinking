<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <!-- <keep-alive :exclude="['MagazineInfo', 'Author']">
        <Suspense>
          <component :is="Component" :key="$route.path" />
        </Suspense>
      </keep-alive> -->

      <template v-if="Component">
        <KeepAlive :exclude="['MagazineInfo', 'Author']">
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component" :key="$route.path" />
          </Suspense>
        </KeepAlive>
      </template>
    </router-view>
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 375px;
  height: 100%;
  max-width: 540px;
  margin: 0 auto;
}
</style>

