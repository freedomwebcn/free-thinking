<template>
    <van-config-provider :theme-vars="themeVars" style="height: 100%">
        <div class="container">
            <div class="search-box">
                <van-search placeholder="请输入期刊号" @focus="focus" @blur="blur" />
                <div class="tip-box " v-show="isShow">
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

            <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                :immediate-check="false" offset="50">
                <ul>
                    <li v-for="item in result[0]" :key="item.publishDate">
                        <div class="book-cover">
                            <img v-lazy="item.img" alt="">
                            <span class="bookCover_gradientDecor"></span>
                        </div>
                        <span class="issue">{{ item.publishDate }}</span>
                    </li>
                </ul>
            </van-list>
        </div>

        <transition name="van-fade">
            <div class="page-cover" v-show="isShow"></div>
        </transition>
    </van-config-provider>
</template>

<script setup>
import { ref } from "vue"
import { chunk } from 'lodash';
import magazineList from "@/assets/magazine.json"

const loading = ref(false);
const finished = ref(false);
const formatData = []
const result = ref([])
const isShow = ref(false)


magazineList.forEach(item => {
    item.pubIssue.forEach(issueObj => {
        const { pubYear } = item
        const { issue, img } = issueObj
        formatData.push({ publishDate: pubYear + issue, img })
    })
})
result.value = chunk(formatData, 18)

let index = 0
const onLoad = () => {
    //模拟下拉加载
    setTimeout(() => {
        index += 1
        result.value[0].push(...result.value[index])
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (result.value[0].length >= formatData.length) {
            finished.value = true;
        }
    }, 500);
};

const themeVars = ref({
    "searchInputHeight": '40px',
    "searchBackgroundColor": '#fff'
})

const focus = () => {
    isShow.value = true
    themeVars.value.searchBackgroundColor = 'none'
}

const blur = () => {
    isShow.value = false
    themeVars.value.searchBackgroundColor = '#fff'
}

</script>

<style lang="less" scoped>
.page-cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .8);
}

.container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

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
                top: 37px
            }
        }
    }


    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        justify-items: center;
        padding: 60px 10px 0 10px;

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
                    background-image: linear-gradient(90deg, hsla(0, 0%, 63.1%, .25), rgba(21, 21, 20, .1) 1%, hsla(0, 0%, 100%, .15) 4%, hsla(0, 0%, 58%, .1) 8%, hsla(0, 0%, 89%, 0) 57%, rgba(223, 218, 218, .03) 91%, rgba(223, 218, 218, .05) 98%, hsla(0, 0%, 100%, .1));
                    box-shadow: inset 0 0 0 0 rgba(0, 0, 0, .1);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
                    background: #d8d8d8;
                }
            }

            .issue {
                display: block;
                margin: 6px 0;
                font-size: 15px;
                text-align: center;
                // color: #5d646e;
                color: #0d141e;
            }
        }
    }

    @media screen and (min-width: 540px) {
        ul {
            padding-top: 50px
        }
    }
}
</style>