<template>
    <div class="author-container">
        <header></header>
        <div class="content">
            <ul>
                <li @click="$router.push(`/author/1/1`)">“花生夜间开花”谎言破产记</li>
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
        padding: 56px 0px 0 0px;
        // grid-auto-rows: min-content;

        h1 {
            text-align: center;
            margin-bottom: 10px;
        }

        ul {
            font-size: 16px;
            height: 100%;

            li {
                padding: 20px 0 20px 5px;
                border-bottom: 1px solid #ebedf1;
                border-radius: 5px;
                padding-left: 15px;

                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>