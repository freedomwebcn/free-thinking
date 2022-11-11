<template>
    <div class="mgz-container">
        <ul>
            <template v-for="(item, i) in magazineList">
                <li v-for="issueObj in item.pubIssue" :key="issueObj.issue">
                    <div class="book-cover">
                        <img :src="issueObj.img" alt="">
                        <span class="bookCover_gradientDecor"></span>
                    </div>
                    <span class="issue">{{ item.pubYear + issueObj.issue}}</span>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import magazineList from "@/assets/magazine.json"

</script>

<style lang="less" scoped>
.mgz-container {
    height: 100%;
    padding: 15px 10px 0 10px;
    overflow-y: scroll;

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        justify-items: center;

        li {
            width: 105px;
            border-radius: 5px;

            .book-cover {
                position: relative;

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
                    height: 146px;
                    object-fit: cover;
                    box-shadow: 0 2px 16px rgba(0, 0, 0, .08);
                    background: #d8d8d8;
                }
            }

            .issue {
                display: block;
                margin: 6px 0;
                font-size: 13px;
                text-align: center;
                color: #5d646e;
            }
        }
    }
}
</style>