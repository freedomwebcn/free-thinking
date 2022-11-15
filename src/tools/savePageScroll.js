import { ref, onMounted, onActivated } from 'vue';

export function savePageScroll(pageRef) {
  const scrollVal = ref(0);
  onMounted(() => {
    pageRef.value.addEventListener('scroll', (e) => {
      scrollVal.value = e.target.scrollTop;
    });
  });
  onActivated(() => {
    // 调用时机为首次挂载
    // 以及每次从缓存中被重新插入时
    pageRef.value.scrollTop = scrollVal.value;
    console.log('进入组件');
  });
}
