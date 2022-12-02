<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive :exclude="['MagazineDir', 'Title', 'Content']">
          <Suspense>
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

