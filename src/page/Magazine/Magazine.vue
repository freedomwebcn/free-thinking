<template>
  <van-config-provider :theme-vars="themeVars" style="height: 100%">
    <div class="container" ref="containerRef" id="scrollAr" @scroll="saveScrollVal">
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
        <div class="tab-item">
          <span :class="{ active: currentTab == 'MagazineList' }" @click="currentTab = 'MagazineList'">期刊</span>
          <span :class="{ active: currentTab == 'MyFavourite' }" @click="currentTab = 'MyFavourite'">我的收藏</span>
        </div>
      </div>

      <KeepAlive>
        <component :is="tabs[currentTab]"></component>
      </KeepAlive>
    </div>

    <transition name="van-fade">
      <div class="overlay" v-if="isShow" :class="{ 'z-index': isShow }"></div>
    </transition>
    <BackToTop :isShowMenu="isShowFloatMenu" @backToTop="backToTop" />
  </van-config-provider>
</template>

<script setup>
import { ref, computed, watch, nextTick, onActivated } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import MagazineList from './MagazineList.vue';
import MyFavourite from './MyFavourite.vue';
import localStorage from './localStorage';

const containerRef = ref(null);
const isShow = ref(false);
const shape = ref('round');
let scrollVal = ref();
const currentTab = ref('MagazineList');
const tabs = {
  MagazineList,
  MyFavourite
};
let magazineListScrollVal = 0;
let myFavouriteScrollVal = 0;

const { setItem, getItem } = localStorage();

onActivated(() => scrollPage());

onBeforeRouteLeave((to) => {
  if (to.name != 'MagazineDir') {
    scrollVal.value = 0;
  }
});

watch(currentTab, () => scrollPage());

async function scrollPage() {
  await nextTick();
  getLoaclStorageData();
  containerRef.value.scrollTop = currentTab.value == 'MagazineList' ? magazineListScrollVal : myFavouriteScrollVal;
}

function getLoaclStorageData() {
  magazineListScrollVal = getItem('magazineListScrollVal');
  myFavouriteScrollVal = getItem('myFavouriteScrollVal');
}

function saveScrollVal(e) {
  if (currentTab.value == 'MagazineList') {
    setItem('magazineListScrollVal', e.target.scrollTop);
  } else {
    setItem('myFavouriteScrollVal', e.target.scrollTop);
  }
  scrollVal.value = e.target.scrollTop;
}

const isShowFloatMenu = computed(() => (scrollVal.value >= 1000 ? true : false));
const backToTop = () => containerRef.value.scrollTo({ top: 0, behavior: 'smooth' });

// ui框架配置
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
    .tab-item {
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
  @media screen and (min-width: 540px) {
    .tab-box {
      padding-top: 52px;
    }
  }
}
</style>
