<template>
	<div class="list">
		<div class="content">
			<Breadcrumb :navs="navs"></Breadcrumb>
			<div class="productList">
				<ul class="allProduct">
					<ProductBlock v-for="product in productList" :productData="product"></ProductBlock>
				</ul>
				<Pagination :pagination="pagination"></Pagination>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Breadcrumb from '../common/Breadcrumb.vue';
	import ProductBlock from './ProductBlock.vue'
	import Pagination from '../common/Pagination.vue';
	import api from '../../api/index.js'

	export default {
		components: {
			ProductBlock,
			Pagination,
			Breadcrumb
		},
		data() {
			var page = this.$route.query.page || 1;
			var keywords = this.$route.query.keyword || "";
			return {
				navs: [{
					title: "搜索结果",
					link: {
						name: 'search',
						params: {},
						query: {
							page:1,
							keyword:keywords
						}
					}
				},
				],
				currentPage: 1,
				productList: [],
				pagination: {}
			}
		},
		created() {
			var page = this.$route.query.page || 1;
			var keywords = this.$route.query.keyword || "";
			this.getQueryGoods(page, keywords);
		},
		methods: {
			getQueryGoods(page, keywords) {
				var poastData = {
					query: keywords,
					page: page,
					pageSize: 10
				}
				api.getQueryGoods(poastData).then((res) => {
					if(res.data && res.data.code == "200") {
						this.pagination = {
							count: Math.ceil(res.data.data.count / 10),
							current: page,
							callback: (page) => {
								this.currentPage = page;
								this.$router.push({
									name: "search",
									query: {
										page: page,
										keyword: keywords
									}
								});
							}
						}
						this.productList = res.data.data.data || [];
					}
				})
			}
		},
		watch: {
			$route(to, from) {
				if(to.name == "search") {
					var page = to.query.page || 1;
					var keywords = to.query.keyword || "";
					this.getQueryGoods(page, keywords);
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.list {
		width: 100%;
		margin: 0 0 40px 0;
		.content {
			width: 1200px;
			margin: 0 auto;
			.productList {
				.allProduct {
					overflow: hidden;
					background-color: #fff;
					>div {
						float: left;
						margin: 8px 8px 0px 8px;
					}
				}
			}
			.pagination {
				background-color: #fff;
			}
		}
	}
</style>