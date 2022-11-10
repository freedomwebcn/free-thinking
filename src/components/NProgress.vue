<template>
    <div class="prograss" ref="prograssRef">
        <div class="peg"></div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";


const prograssRef = ref(null)
// 监听滚动
onMounted(() => {
    document.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        const scrollTop = document.documentElement.scrollTop
        prograssRef.value.style.width = +scrollTop / (scrollHeight - clientHeight).toFixed(2) * 100 + "%"
    });
});

</script>

<style lang="less" scoped>
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