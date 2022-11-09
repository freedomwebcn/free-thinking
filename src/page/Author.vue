<template>
    <div class="author-container">
        <header></header>
        <div class="content">
            <h1>陈寅恪</h1>
            <ul>
                <li>庄子的名学与人生哲学</li>
                <li>第二十一篇　明之拟宋市人小说及后来选本</li>
                <li>第二十一篇　明之拟宋市人小说及后来选本</li>
                <li>随感录六十二：恨恨而死</li>
                <li>魏晋风度及文章与药及酒之关系</li>
                <li>论独立之精神与自由之思想</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id);  
</script>

<style lang="less" scoped>
.author-container {
    height: 100%;

    header {
        width: 375px;
        height: 56px;
        position: fixed;
        // background-color: red;
    }

    .content {
        // display: grid;
        height: 100%;
        padding: 56px 15px 0 15px;
        // grid-auto-rows: min-content;

        h1 {
            text-align: center;
            margin-bottom: 10px;
        }

        ul {
            font-size: 16px;

            li {
                padding: 20px 0 20px 5px;
                border-bottom: 1px solid #ebedf1;
                border-radius: 5px;
                padding-left: 15px;
            }
        }
    }
}
</style>