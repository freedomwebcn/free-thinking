<template>
    <div class="container">
        <h1>本期目录</h1>
        <div class="dec-content">
            <ul>
                <li v-for="item in decList" :key="item.illustrate">
                    <div class="title van-hairline--bottom">
                        <h2>{{ item.illustrate }}</h2>
                    </div>
                    <div class="van-hairline--bottom common dec-item" v-for="content in item.dec_content">
                        {{ content.title }}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import mgz_dec from "@/assets/magazine_test_dec.json"
const route = useRoute()
const ids = route.params.pubid.slice(0, -1).split('年')
const year = ids[0]
const issueNum = ids[1]

let decList = ref([])

mgz_dec[year].some((item) => {
    if (item.issue.slice(0, -1) == issueNum) {
        decList.value = item.dec
        return true
    }

})
console.log(mgz_dec[year]);

</script>

<style lang="less" scoped>
.container {
    height: 100%;
    overflow-y: scroll;

    h1 {
        height: 61px;
        line-height: 65px;
        text-align: center;
        background: url("../assets/w-mdicon4.gif") no-repeat center;
        background-size: auto 61px;
        font-size: 16px;
    }

    .dec-content {
        padding: 0 16px;

        ul {
            display: grid;
            row-gap: 15px;
            font-size: 15px;

            li {

                .title {
                    padding-bottom: 10px;

                    h2 {
                        margin: 0;
                        font-size: 16px;
                        display: flex;
                        align-items: center;

                        &::before {
                            content: '';
                            width: 4px;
                            height: 18px;
                            background-color: red;
                            margin-right: 8px;

                        }
                    }
                }

                .dec-item {
                    padding: 10px 0 10px 10px;
                    display: flex;
                    align-items: center;
                    color: #333333;
                    letter-spacing: 1px;
                    line-height: 1.25;

                    &::before {
                        content: '';
                        width: 3px;
                        height: 3px;
                        border-radius: 50%;
                        background-color: rgb(191, 191, 191);
                        margin-right: 8px;

                    }
                }
            }
        }
    }

}
</style>