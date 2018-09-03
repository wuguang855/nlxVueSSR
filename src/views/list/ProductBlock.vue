<template>
	<div class="productBlock">
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
			productData: {
				type: Object,
				default: {}
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
	.productBlock {
		position: relative;
		width: 224px;
		height: 300px;
		background-color: #fff;
		text-align: center;
		a {
			padding: 10px 10px 0 10px;
			border: 2px solid transparent;
			&:hover {
				border: 2px solid #ff9d1e;
			}
			display: block;
			width: 100%;
			height: 100%;
			color: #333;
			img {
				width: 200px;
				height: 200px;
			}
			>p {
				text-align: left;
			}
			>p:nth-child(2) {
				font-size: 18px;
				color: #ff0000;
				line-height: 25px;
				margin-top: 4px;
				height: 25px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			>p:nth-child(3) {
				font-size: 12px;
				color: #333333;
				line-height: 16px;
				height: 32px;
				display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
			}
		}
	}
</style>