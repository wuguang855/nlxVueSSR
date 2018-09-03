<template>
	<div class="hotProduct">
		<router-link :to="{name:'product',params:{gid:productData.id,tid:productData.goodsTypeId}}">
			<img :src="productData.pic1" alt="" />
			<p>¥{{productData.price}}</p>
			<p>{{productData.pName}}</p>	
		</router-link>
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

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.hotProduct {
		position: relative;
		width: 240px;
		height: 230px;
		background-color: #fff;
		
		text-align: center;
		a {
			padding: 10px 10px 0 10px;
			border:2px solid transparent;
			&:hover{
				border:2px solid #ff9d1e;
			}
			display: block;
			width: 100%;
			height: 100%;
			color: #333;
			img {
				width: 146px;
				height: 146px;
			}
			>p{
				text-align: left;
				
			}
			>p:nth-child(2) {
				font-size:18px;
				color:#ff0000;
				line-height: 25px;
				margin-top: 16px;
				
			}
			>p:nth-child(3) {
				font-size:14px;
				color:#333333;
				line-height: 20px;
				height: 20px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			}
		}
	}
</style>