<template>
	<div class="priceInfo">
		<div class="tabs">
			<span>商品详情</span>
		</div>
		<div class="parameter clearfix">
			<div class="fl">
				<div><span>商品名称：</span><span>{{productData.pName}}</span></div>
				<div><span>规格： </span><span>{{productData.spec}}</span></div>
				<div><span>等级： </span><span>{{productData.grade}}</span></div>
				<div><span>产地： </span><span>{{productData.area}}</span></div>
				<div><span>保质期： </span><span>{{productData.qualguaPeriod}}</span></div>
			</div>
			<div class="fr">
				<div><span>食品生产许可证：</span><span>{{productData.goodsProlicence}}</span></div>
				<div><span>采摘季节： </span><span>{{productData.pickSeason}}</span></div>
				<div><span>储藏方式： </span><span>{{productData.storageType}}</span></div>
				<div><span>包装： </span><span>{{productData.pack}}</span></div>
			</div>
		</div>
		<ul class="description">
			<li v-for="banner in banners" ><img :src="banner"/></li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		components: {

		},
		props: {
			productData:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {

			}
		},
		methods: {

		},
		computed: {
			banners(){
				var banner = [];
				this.productData.pic && banner.push(this.productData.pic);
				this.productData.pic1 && banner.push(this.productData.pic1);
				this.productData.pic2 && banner.push(this.productData.pic2);
				this.productData.pic3 && banner.push(this.productData.pic3);
				this.productData.pic4 && banner.push(this.productData.pic4);
				this.productData.pic5 && banner.push(this.productData.pic5);
				return banner;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.priceInfo {
			font-size: 16px;
			width: 936px;
			background-color: #fff;
			padding: 0 20px;
		.tabs{
			height: 50px;
			padding-top: 10px;
			border-bottom:1px solid #dddddd;
			>span{
				display: block;
				height: 39px;
				width: 88px;
				color: #fff;
				font-size: 16px;
				line-height: 40px;
				text-align: center;
				background:#ff9d1e;
			}
		}
		.parameter {
			>div {
				float: left;
				width: 50%;
				height: 192px;
				padding-top: 15px;
				span{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.fl {
				span {
					display: inline-block;
					line-height: 30px;
					overflow: hidden;
					&:first-child {
						width: 100px;
						text-align: right;
						color: #666;
					}
					&:last-child {
						width: 340px;
						text-indent: 10px;
						color: #333;
					}
				}
			}
			.fr {
				span {
					display: inline-block;
					line-height: 30px;
					overflow: hidden;
					&:first-child {
						width: 180px;
						text-align: right;
						color: #666;
					}
					&:last-child {
						width: 260px;
						text-indent: 10px;
						color: #333;
					}
				}
			}
		}
		.description{
			padding-bottom: 10px;
			li{
				margin-bottom: 10px;
				img{
					width: 100%;
					height:auto;
				}
			}
		}
	}
</style>