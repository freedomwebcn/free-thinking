<template>
	<div class="container">
		<h1>本期目录</h1>
		<div class="dec-content">
			<ul>
				<li v-for="item in decList" :key="item.title">
					<div class="title van-hairline--bottom">
						<h2>{{ item.title }}</h2>
					</div>
					<div class="van-hairline--bottom common dec-name" v-for="content in item.dec_content">
						{{ content.dec_name }}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

import mgz_dec from "@/assets/magazine_test_dec.json";
const route = useRoute();
const ids = route.params.pubid.slice(0, -1).split("年");
const year = ids[0];
const issue = ids[1];

let decList = ref([]);

mgz_dec[year].some(item => {
	if (item.issue.slice(0, -1) == issue) {
		decList.value = item.dec;
		return true;
	}
});
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
			font-size: 15px;
			li {
				.title {
					padding: 10px 0;
					h2 {
						display: flex;
						align-items: center;
						margin: 0;
						font-size: 16px;
						&::before {
							content: "";
							width: 4px;
							height: 18px;
							background-color: red;
							margin-right: 8px;
						}
					}
				}
				.dec-name {
					display: flex;
					align-items: center;
					padding: 10px 0 10px 10px;
					letter-spacing: 1px;
					line-height: 1.25;
					color: #333333;
					&::before {
						content: "";
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
