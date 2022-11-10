<template>
  <div class="home-container">
    <h1>
      独立之精神 自由之思想
      <span class="iconfont icon-bi icon"></span>
    </h1>
    <ul>
      <li v-for="(item, index) in authorList" :key="item.pic" @click="$router.push(`/author/${index + 1}`)">
        <div class="content">
          <img :src="item.pic" alt="" />
          <div>
            <span class="author">{{ item.author }}</span>
            <span class="article-total">
              <i>{{ item.art_total >= 999 ? "999+" : item.art_total }}</i>篇文章
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import authorList from "@/assets/author.json";
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
  padding: 0 16px;
  // overflow-y: auto;

  //   chrome去除滚动条样式
  &::-webkit-scrollbar {
    display: none;
  }

  //   兼容火狐
  &.scw {
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  }

  //   兼容IE10+
  &.msscw {
    -ms-overflow-style: none;
  }

  h1 {
    position: relative;
    font-size: 30px;
    padding: 22px 0 10px 0;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 3px solid rgb(15, 15, 15);
    font-family: 'Zhi Mang Xing', cursive;
    font-weight: normal;

    .icon {
      position: absolute;
      right: 0;
      bottom: -4px;
      font-size: 28px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    align-content: center;
    margin-bottom: 10px;

    li {
      display: flex;
      border-radius: 10px;
      height: 85px;
      align-items: center;
      background-color: rgb(244, 245, 247);
      padding: 0 10px;

      .content {
        display: flex;
        height: 70px;

        img {
          height: 100%;
          width: 56px;
          vertical-align: bottom;
          object-fit: cover;
          margin-right: 12px;
          flex: none;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
        }

        div {
          display: flex;
          flex-wrap: wrap;
          padding: 12px 0;
          align-items: center;

          .author {
            flex: 100%;
            font-size: 16px;
            font-family: 'Noto Serif SC', serif;
          }

          .article-total {
            flex: 100%;
            color: rgb(173, 180, 190);
            font-size: 13px;

            i {
              font-family: din-medium;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
