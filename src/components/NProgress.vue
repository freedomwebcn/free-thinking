<template>
    <div class="container" ref="containerRef">
        <div class="content" ref="contentRef">
            <slot></slot>
        </div>
    </div>
    <div class="prograss" ref="prograssRef" :style="{ 'width': w }">
        <div class="peg"></div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { getNProgressW } from "@/components/nprogress"

const containerRef = ref(null)
const contentRef = ref(null)
const { w } = getNProgressW(containerRef, contentRef)
</script>

<style lang="less" scoped>
.container {
    height: 100%;
    overflow-y: scroll;
    font-family: 'Noto Serif SC', serif;

    //   chrome去除滚动条样式
    &::-webkit-scrollbar {
        display: none;
    }

    //   兼容火狐
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
    //   兼容IE10+
    -ms-overflow-style: none;

    .content {
        padding: 0 25px;
    }
}

.prograss {
    background: #29d;
    position: fixed;
    z-index: 1031;
    bottom: 0;
    left: 0;
    height: 2px;

    .peg {
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px #29d, 0 0 5px #29d;
        opacity: 1.0;
        transform: rotate(-3deg) translate(0px, 3px);
    }
}
</style>