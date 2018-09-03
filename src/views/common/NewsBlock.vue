<template>
	<div class="newsBlock">
		<router-link :to='{name:"newsDetail",params:{subSys:newsData.subSys,id:newsData.newsId}}' >
			<img :src="newsData.titlePic" />
			<div>
				<h5>{{ newsData.title }} </h5>
				<p>{{ newsData.summery }}</p>
			</div>
		</router-link>
	</div>
</template>
<script type="text/ecmascript-6">
import img from '../../img/QRcode.jpg';
export default {
	components: {

	},
	props:{
	    newsData:{
	      type:Object,
	      default:{}
	    }
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.newsBlock {
		width: 285px;
		height: 316px;
		>a {
			display: block;
			width: 100%;
			height: 100%;
			background-color: #fff;
			img {
				width: 285px;
				height: 210px;
			}
			div {
				padding: 0 10px;
				h5 {
					font-size: 16px;
					color: #333;
					font-weight: bold;
					line-height: 22px;
					margin-bottom: 7px;
					margin-top: 10px;
					height: 22px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p {
					line-height: 22px;
					font-size: 12px;
					color: #666666;
					max-height: 45px;
					
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
			}
		}
	}
</style>