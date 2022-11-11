import { ref, onMounted } from "vue";

export function getNProgressW(containerRef, contentRef) {

    let scrollHeight = ref(0)
    let clientHeight = ref(0)
    let scrollTop = ref(0)
    let w = ref('') //记录实时阅读的进度条宽度
    onMounted(() => {
        containerRef.value.addEventListener("scroll", () => {
            scrollHeight.value = contentRef.value.scrollHeight //获取文档总高度
            clientHeight.value = containerRef.value.clientHeight //获取可视区域高度
            scrollTop.value = containerRef.value.scrollTop //获取滚动距离
            // console.log(scrollHeight, clientHeight, scrollTop);
            // prograssRef.value.style.width = 
            w.value = +scrollTop.value / (scrollHeight.value - clientHeight.value).toFixed(2) * 100 + "%"
        });
    });
    return {
        w
    }

}