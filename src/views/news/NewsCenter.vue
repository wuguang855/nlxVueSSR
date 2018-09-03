<template>
	<div class="newsCenter">
		<div class="title">
			<span>中心动态</span>
		</div>
		<div class="main" v-if="!!listData[0]">
			<router-link :to='{name:"newsDetail",params:{subSys:listData[0].subSys,id:listData[0].newsId}}' >
			<img :src="listData[0].titlePic" alt="" />
			
			</router-link>
			<span>{{ listData[0].title }}</span>
		</div>
		<ul>
			<li v-for="news in listData " class="clearfix">
				<router-link :to='{name:"newsDetail",params:{subSys:news.subSys,id:news.newsId}}' >
					<span class="fl"><img :src="news.titlePic"/></span>
					<span class="fr">
						<p>{{news.title}}</p>
						<p>{{news.releaseTime | trasformDate}}</p>
					</span>
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
			value = value.substring(0,10);
			return value;
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.newsCenter{
		width: 328px;
		height: 527px;
		padding: 20px;
		background-color: #fff;
		overflow: hidden;
		.title{
			border-bottom: 1px solid #ddd;
			span{
				display: inline-block;
				line-height: 22px;
				font-size: 16px;
				font-weight: bold;
				padding-bottom: 6px;
				border-bottom: 2px solid #ff9d1e;;
			}
		}
		.main{
			position: relative;
			display: inline-block;
			margin-top: 20px;
			margin-bottom: 18px;
				width: 288px;
				height: 167px;
			img{
				width: 100%;
				height: 100%;
			}
			>span{
				position: absolute;
				left: 0;
				bottom: 0;
				display: inline-block;
				height: 40px;
				width: 100%;
				background-color:rgba(0,0,0,0.4);
				color: #fff;
				font-size: 14px;
				text-indent: 10px;
				line-height: 40px;
			}
		}
		ul{
			li{
				margin-bottom: 18px;
				&:hover{
					background-color: #f1f1f1;
				}
				.fl{
					img{
						width: 120px;
						height: 70px;
					}
				}
				.fr{
					width: 160px;
					p:first-child{
						font-size: 14px;
						color: #333;
						line-height: 24px;
						font-weight: bold;
						    height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
					}
					p:last-child{
						font-size: 12px;
						color: #999;
						margin-top: 8px;
					}
				}
			}
		}
	}
</style>