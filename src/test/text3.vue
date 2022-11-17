<template>
  <div id="scrollArea" class="clusterize-scroll">
    <ul id="contentArea" class="clusterize-content">
      <li class="item">1</li>
      <li class="item">2</li>
      <li class="item">3</li>
      <li class="item">4</li>
      <li class="item">5</li>
      <li class="item">6</li>
      <li class="item">7</li>
      <li class="item">8</li>
      <li class="item">9</li>
      <li class="item">10</li>
      <li class="item">11</li>
      <li class="item">12</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {
  var clusterize = new Clusterize({
    scrollId: 'scrollArea',
    contentId: 'contentArea'
  });
});
</script>

<style lang="less" scoped></style>
