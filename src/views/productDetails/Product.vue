<template>
	<div class="productWrap">
		<div class="product">
			<Breadcrumb :navs='navs'></Breadcrumb>
			<div class="priceBlock">
				<Price :productData="productData"></Price>
			</div>
			<div class="clearfix recmm">
				<div class="fl">
					<div class="recommend"><span>相关推荐</span></div>
					<ProductBlock v-for="product in productList" :productData="product"></ProductBlock>
				</div>
				<div class="fr">
					<PriceInfo :productData="productData"></PriceInfo>
				</div>
			</div>
		</div>

	</div>
</template>
<script type="text/ecmascript-6">
	import Breadcrumb from '../common/Breadcrumb.vue';
	import Price from './Price.vue';
	import ProductBlock from '../list/ProductBlock.vue';
	import PriceInfo from './PriceInfo.vue';
	import api from '../../api/index.js';
	export default {
		components: {
			Breadcrumb,
			Price,
			PriceInfo,
			ProductBlock
		},
		data() {
			return {
				navs: [],
				productData: {},
				productList: []
			}
		},
		created() {
			var tId = this.$route.params.tid;
			var gId = this.$route.params.gid;
			this.getGoodsDetail(gId, tId);
		},
		methods: {
			getGoodsDetail(gId, tId) {
				var postData = {
					goodsId: gId,
					goodsTypeId: tId
				}
				console.log('tid', tId, 'gid', gId)
				api.getGoodsDetail(postData).then((res) => {
					console.log(res);
					var data = res.data.data.detail;
					var recommend = res.data.data.recommend;
					this.navs = [];
					var nav = {
						title: data.goodsTypeName,
						link: {
							name: 'list',
							params: {
								id: data.goodsTypeId
							},
							query: {}
						}
					}
					this.navs.push(nav);
					var nav = {
						title: data.pName,
						link: {
							name: 'product',
							params: {
								tid: tId,
								gid: gId
							},
							query: {}
						}
					}
					this.navs.push(nav);
					this.productData = data;
					this.productList = recommend;

				})
			}
		},
		watch: {
			$route(to, from) {
				if(to.name == "product") {
					var tId = to.params.tid;
					var gId = to.params.gid;
					this.getGoodsDetail(gId, tId);
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.productWrap {
		.product {
			width: 1200px;
			margin: 0 auto;
			.priceBlock {
				margin-bottom: 20px;
			}
			.clearfix.recmm {
				padding-bottom: 40px;
				.fl {
					padding-bottom: 10px;
					.recommend {
						padding-top: 20px;
						padding-left: 10px;
						padding-bottom: 10px;
						span {
							display: block;
							height: 16px;
							line-height: 16px;
							font-size: 16px;
							text-indent: 10px;
							font-weight: bold;
							border-left: 2px solid #ff9d1e;
						}
					}
					width: 244px;
					background-color: #fff;
					padding-left: 10px;
				}
			}
		}
	}
</style>