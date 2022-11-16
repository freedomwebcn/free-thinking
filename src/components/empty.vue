<template>
  <div class="empty">
    <van-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80" :description="descriptionText" />
  </div>
</template>

<script setup>
defineProps({
  descriptionText: String
});
</script>

<style lang="less" scoped>
.empty {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
