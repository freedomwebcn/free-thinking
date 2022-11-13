<template>
    <h1>{{ `${ids[0]}------${ids[1]}` }}</h1>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import mgz_dec from "@/assets/magazine_test_dec.json"
const route = useRoute()
const ids = route.params.pubid.slice(0, -1).split('年')
const year = ids[0]
const issueNum = ids[1]

let decList = ref()

mgz_dec[year].some((item) => {
    if (item.issue.slice(0, -1) == issueNum) {
        decList.value = item.dec
        return true
    }

})
console.log(mgz_dec[year]);

</script>