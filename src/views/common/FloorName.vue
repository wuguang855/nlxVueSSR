<template>
	<div class="floorName clearfix">
		<div class="fl">
			<span>{{nameData.name}}</span>
			<span>{{nameData.summary}}</span>
		</div>
		<router-link class="fr" :to='{name:nameData.linkName}'>查看更多>></router-link>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		components: {

		},
		props: ['floorType'],
		computed:{
			nameData(){
				var data = {};
				switch(this.floorType){
					case "hotGoods":
					data = {
						name:"热品推荐",
						summary:"推荐您最需要的好茶",
						linkName:"stars"
					}
					break;
					case "latestGoods":
					data = {
						name:"最新茶品",
						summary:"最新的茶品供您选择",
						linkName:"bargains"
					}
					break;
					case "news":
					data = {
						name:"资讯公告",
						summary:"带您了解实时茶叶资讯",
						linkName:"newsList"
					}
					break;					
					default:
					data = {
						name:"最新茶品",
						summary:"最新的茶品供您选择",
						linkName:"bargains"
					}					
				}
				return data;
			}
		},
		methods: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.floorName {
		width: 1200px;
		height: 80px;
		padding-top: 29px;
		>div{
			>span{
				&:first-child{
					font-size: 24px;
					font-weight: bold;
					line-height: 33px;
					color: #333;
				}
				&:nth-child(2){
					font-size:14px;
					color:#999999;
					padding-left: 9px;
					margin-left: 19px;
					border-left: 1px solid #ddd;
					
				}
			}
		}
		>a{
			display: inline-block;
			line-height: 40px;
			font-size:14px;
			color:#999999;
		}
	}
</style>