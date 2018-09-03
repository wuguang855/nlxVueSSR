<template>
	<div class="newsDetails">
		<Breadcrumb :navs="navs"></Breadcrumb>
		<div class="info">
			<div class="title">
				<h3>{{newsData.title}}</h3>
				<div><span class="uesr">发布者:遵义茶叶交易中心</span><span class="date">发稿时间：{{newsData.releaseTime | trasformDate}}</span></div>
			</div>
			<div class="content" v-html="newsData.content"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Breadcrumb from '../common/Breadcrumb.vue';
	import api from '../../api/index.js'
	export default {
		components: {
			Breadcrumb
		},
		data() {
			return {
				navs:[{
						title:"茶道资讯",
						link:{ name:'newsList', params: {},query:{}}
					}],
				newsData:{}
			}
		},
		created: function () {		
			var subSys = this.$route.params.subSys;
			var id = this.$route.params.id;
			this.getNewsDetail(id,subSys);
		},
		filters: {
			trasformDate: function (value) {
				if (!value) return '';
				value = value.substring(0,10);
				return value;
			}
		},
		methods: {
			getNewsDetail(id,subSys){
				var postData = {
					newsId:id,
					newsType:subSys
				}
				api.getNewsDetail(postData).then((res)=>{
			      if(res.data && res.data.code=="200"){	      	
			      		var newsData = res.data.data;
			      		this.newsData = newsData;
			      		this.navs = [this.navs[0]];
			      		this.navs.push({
							title:newsData.title,
							link:{ name:'newsDetail', params: {subSys:newsData.subSys,id:newsData.newsId},query:{}}
						});
			      }
			    });
			}
		},
		watch:{
			$route (to, from) {
				if(to.name=="newsDetail"){
					var subSys = to.params.subSys;
					var id = to.params.id;
					this.getNewsDetail(id,subSys);
				}	
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.newsDetails{

		.info{
			background-color: #fff;
			width: 850px;
			padding: 0 40px;
			.title{
				padding: 18px 0;
				border-bottom: 1px dashed #ddd;
				h3{
					font-size:22px;
					color:#333333;
					line-height: 30px;
					margin-bottom: 10px;
				}
				div{
					span{
						font-size: 12px;
						color: #999;
						line-height: 17px;
					}
					
					.date{
						margin-left: 20px;
					}
				}
			}
			.content{
				padding: 25px 0;
				font-size: 16px;
				line-height: 32px;
			}
		}
	}
</style>