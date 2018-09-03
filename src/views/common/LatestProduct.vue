<template>
	<div class="latestProduct">
		<router-link :to="{name:'product',params:{gid:productData.id,tid:productData.goodsTypeId}}">
			<img :src="productData.pic1"  alt="" />
			<p>{{productData.pName}}</p>
			<p>{{productData.content}}</p>
			<span>
				<p>新品</p>
				<p>首发</p>
			</span>
		</router-link>
	</div>
</template>
<script type="text/ecmascript-6">
	import img from '../../img/QRcode.jpg';
	export default {
		components: {

		},
		props:{	
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

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.latestProduct {
		position: relative;
		width: 240px;
		height: 230px;
		background-color: #fff;
		text-align: center;
		padding-top: 10px;
		a {
			display: block;
			width: 100%;
			height: 100%;
			color: #333;
			img {
				width: 160px;
				height: 160px;
			}
			>p:nth-child(2) {
				padding: 0 20px;
				font-size: 16px;
				font-weight: 700;
				line-height: 22px;
				height: 22px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
			>p:nth-child(3) {
				padding: 0 20px;
				font-size: 12px;
				color: #666666;
				line-height: 22px;
				height: 22px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
			span {
				position: absolute;
				top: 0;
				right: 10px;
				width: 40px;
				height: 50px;
				background: url(../../img/icon-mark.png) no-repeat;
				padding-top: 8px;
				p {
					font-size: 12px;
					font-weight: normal;
					color: #ffffff;
					line-height: 14px;
					color: #fff;
				}
			}
		}
	}
</style>