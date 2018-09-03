<template>
	<div class="centerAffiche">
		<div class="title">
			<span>中心公告</span>
		</div>
		<ul>
			<li v-for="news in listData ">
				<router-link class='aLink' :to='{name:"newsDetail",params:{subSys:news.subSys,id:news.newsId}}' >
					<span>{{news.title}}</span> <b>{{news.releaseTime | trasformDate}}</b>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	props:{
		listData:{
		  type:Array,
		  default:[{}]
		}
	},
	filters: {
		trasformDate: function (value) {
			if (!value) return '';
			value = value.substring(5,10);
			return value;
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.centerAffiche{
		width: 328px;
		min-height: 275px;
		padding: 20px;
		padding-bottom: 0;
		background-color: #fff;
		.title{
			border-bottom: 1px solid #ddd;
			span{
				display: inline-block;
				line-height: 22px;
				font-size: 16px;
				font-weight: bold;
				padding-bottom: 6px;
				border-bottom: 2px solid #ff9d1e;
			}
		}
		ul{
			padding-top: 20px;
			li{
				font-size: 14px;
				line-height: 20px;
				margin-bottom: 16px;
				
				&:nth-child(1),&:nth-child(2),&:nth-child(3){
					color: #d0021b;
					b{
						color: #d0021b;
					}
				}
				span{
					display: inline-block;
				    width: 240px;
				    height: 20px;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
				b{
					float: right;
					font-size: 14px;
					line-height: 20px;
				}
				.aLink {
					display: block;
					&:hover{
						span{
							color: #77ac39;
						}
					}
				}
			}
		}
		
	}
</style>