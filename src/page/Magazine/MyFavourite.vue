<template>
  <div class="favourite" ref="favouriteRef">
    <ul class="test_ul">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.favourite {
  width: 375px;
  padding-top: 112px;
  padding-left: 10px;
  padding-right: 10px;

  .test_ul {
    li {
      height: 500px;
      font-size: 50px;
      text-align: center;
    }
  }
}

@media screen and (min-width: 540px) {
  .favourite {
    padding-top: 99px;
  }
}
</style>
