<template>
  <van-config-provider :theme-vars="themeVars" style="height: 100%">
    <div class="container" ref="containerRef">
      <div class="search-box">
        <van-search placeholder="请输入期刊号" @focus="focus" @blur="blur" :shape="shape" />
        <div class="tip-box" v-show="isShow">
          <div class="query-mode">
            <h3 class="tip-box-title">
              <span class="line"></span>
              期刊号输入格式
            </h3>
            <div class="fuzzy-query van-hairline--bottom">
              <h3>
                <span class="line"></span>
                模糊查询:
              </h3>
              <span>只需输入杂志的发行年份，可查询到该年份发行的所有期刊。</span>
            </div>
            <div class="exact-query">
              <h3>
                <span class="line"></span>
                精确查询:
              </h3>
              <span>输入发行年份+期号，例如:要查询1991年发行的01期期刊，只需输入199101即可查询到。</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-box" :class="{ bgc: !isShow, 'border-bottom': !isShow }">
        <div class="top-box">
          <span :class="{ active: toggle }" @click="changeToggleStatus(true)">期刊</span>
          <span :class="{ active: !toggle }" @click="changeToggleStatus(false)">我的收藏</span>
        </div>
      </div>
      <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false" offset="50" v-show="toggle">
        <ul class="magazine-list-content">
          <li v-for="item in result[0]" :key="item.publishDate" @click="$router.push(`/magazineInfo/${item.publishDate}`)">
            <div class="book-cover">
              <img v-lazy="item.img" alt="" />
              <span class="bookCover_gradientDecor"></span>
            </div>
            <span class="issue">{{ item.publishDate }}</span>
          </li>
        </ul>
      </van-list>
      <div class="favourite" ref="favouriteRef" v-show="!toggle">
        <ul class="test_ul">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
        </ul>
      </div>
    </div>

    <transition name="van-fade">
      <div class="overlay" v-if="isShow" :class="{ 'z-index': isShow }"></div>
    </transition>

    <BackToTop :isShowMenu="ishowFloatMenu" @backToTop="backToTop" />
  </van-config-provider>
</template>

<script setup>
import { ref, onMounted, onActivated, nextTick, computed } from 'vue';
import { chunk, random } from 'lodash';
import BackToTop from '../components/BackToTop.vue';
import { reqMagazineData } from '@/api';

const magazineData = await reqMagazineData();
const containerRef = ref(null);
const loading = ref(false);
const finished = ref(false);
const formatData = [];
const result = ref([]);
const isShow = ref(false);
const shape = ref('round');
const toggle = ref(true);
let scrollPre = ref();
let scrollNet = ref();

onActivated(() => scrollPage());

onMounted(() => {
  containerRef.value.addEventListener('scroll', (e) => (toggle.value ? (scrollPre.value = e.target.scrollTop) : (scrollNet.value = e.target.scrollTop)));
});

const ishowFloatMenu = computed(() => (scrollPre.value >= 1000 && toggle.value ? true : false));

const backToTop = () => containerRef.value.scrollTo({ top: 0, behavior: 'smooth' });

let changeToggleStatus = (val) => {
  toggle.value = val;
  nextTick(() => scrollPage());
};

const scrollPage = () => (toggle.value ? (containerRef.value.scrollTop = scrollPre.value) : (containerRef.value.scrollTop = scrollNet.value));

// 格式化json数据
magazineData.forEach((item) => {
  item.pub_issue = JSON.parse(item.pub_issue);
  const { pub_year } = item;
  item.pub_issue.forEach((issueObj) => {
    const { issue, img } = issueObj;
    formatData.push({ publishDate: pub_year + '年' + issue, img });
  });
});
console.log(formatData);
result.value = chunk(formatData, 18);

let index = 0;
const onLoad = () => {
  //模拟下拉加载
  const randomNum = random(500, 1000);
  setTimeout(() => {
    index += 1;
    result.value[0].push(...result.value[index]);
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (result.value[0].length >= formatData.length) {
      finished.value = true;
    }
  }, randomNum);
};
const themeVars = ref({
  searchInputHeight: '40px',
  searchBackgroundColor: 'rgb(244, 245, 247)',
  searchContentBackgroundColor: '#fff',
  searchLeftIconColor: 'rgb(111, 120, 129)'
});

const focus = () => {
  isShow.value = true;
  shape.value = 'square';
  themeVars.value.searchBackgroundColor = 'none';
};

const blur = () => {
  isShow.value = false;
  shape.value = 'round';
};
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  &.z-index {
    z-index: 999;
  }
}

.container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background-color: rgb(244, 245, 247);
  //   chrome去除滚动条样式
  &::-webkit-scrollbar {
    display: none;
  }
  //   兼容火狐
  scrollbar-width: none;
  overflow: -moz-scrollbars-none;
  //   兼容IE10+
  -ms-overflow-style: none;
  .search-box {
    position: fixed;
    width: 375px;
    z-index: 9999;

    :deep(.van-search) {
      .van-field__body {
        input::placeholder {
          color: rgb(111, 120, 129);
        }
      }
    }
    .tip-box {
      position: absolute;
      z-index: 999;
      top: 45px;
      padding-left: 12px;
      padding-right: 12px;
      h3 {
        display: flex;
        align-items: center;
        font-weight: normal;
        font-size: 15px;
        color: #353c46;
        .line {
          width: 5px;
          height: 18px;
          background-color: red;
          margin-right: 5px;
        }
      }
      .query-mode {
        display: grid;
        row-gap: 10px;
        background-color: white;
        padding: 15px 10px;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;

        h3 {
          margin-top: 0px;
          margin-bottom: 5px;
          color: #0d141e;
        }

        span {
          display: block;
          line-height: 1.5em;
          color: #858c96;
          font-size: 14px;
        }

        .fuzzy-query {
          padding-bottom: 10px;

          h3 {
            .line {
              background-color: #353c46;
            }
          }
        }

        .exact-query {
          h3 {
            .line {
              background-color: #086cf8;
            }
          }
        }
      }
    }
    @media screen and (min-width: 540px) {
      .tip-box {
        top: 37px;
      }
    }
  }
  .tab-box {
    display: grid;
    position: fixed;
    width: 375px;
    padding-top: 65px;
    padding-bottom: 15px;
    // padding-left: 15px;
    font-size: 15px;
    color: rgb(133, 140, 150);
    z-index: 999;
    &.bgc {
      background-color: #f4f5f7;
    }
    &.border-bottom {
      border-bottom: 1px solid rgb(235, 234, 234);
    }
    .top-box {
      padding-left: 15px;
      :nth-child(1) {
        margin-right: 25px;
      }
      span {
        &.active {
          color: rgb(25, 136, 236);
        }
      }
    }
  }

  .magazine-list-content {
    width: 375px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    justify-items: center;
    padding: 112px 10px 0 10px;
    li {
      width: 105px;
      border-radius: 5px;
      .book-cover {
        position: relative;
        height: 146px;
        .bookCover_gradientDecor {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
            90deg,
            hsla(0, 0%, 63.1%, 0.25),
            rgba(21, 21, 20, 0.1) 1%,
            hsla(0, 0%, 100%, 0.15) 4%,
            hsla(0, 0%, 58%, 0.1) 8%,
            hsla(0, 0%, 89%, 0) 57%,
            rgba(223, 218, 218, 0.03) 91%,
            rgba(223, 218, 218, 0.05) 98%,
            hsla(0, 0%, 100%, 0.1)
          );
          box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.1);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          background: #d8d8d8;
        }
      }
      .issue {
        display: block;
        margin: 6px 0;
        font-size: 15px;
        text-align: center;
        // color: #5d646e;
        color: rgb(33, 40, 50);
      }
    }
  }

  .favourite {
    width: 375px;
    padding-top: 112px;
    padding-left: 10px;
    padding-right: 10px;
    .test_ul {
      li {
        height: 500px;
      }
    }
  }

  @media screen and (min-width: 540px) {
    .tab-box {
      padding-top: 52px;
    }
    .magazine-list-content,
    .favourite {
      padding-top: 99px;
    }
  }
}
</style>
