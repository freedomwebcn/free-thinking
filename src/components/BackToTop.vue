<template>
  <div class="floatMenu-box">
    <button class="floatMenu-toTop" :class="{ show: isShowMenu }" @click="$emit('backToTop')">回到顶部</button>
  </div>
</template>
<script setup>
defineProps({
  isShowMenu: Boolean
});
</script>

<style lang="less" scoped>
.floatMenu-box {
  position: fixed;
  right: 14px;
  bottom: 76px;
  z-index: 999;
  .floatMenu-toTop {
    border: none;
    width: 40px;
    height: 40px;
    background: hsla(0, 0%, 100%, 0.95) url(https://static.ws.126.net/163/wap/f2e/ssr/static/media/menu-toTop.fe4b74d7c16e0758813b.png) 50% no-repeat;
    background-size: 20px 20px;
    border-radius: 50%;
    box-shadow: 0 0 0.10667rem 0 rgba(0, 0, 0, 0.12);
    font-size: 0;
    opacity: 0;

    &.show {
      opacity: 1;
      transition: opacity 0.3s linear;
    }
  }
}
</style>
