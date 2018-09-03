<template>
	<div class="newsList">
		<Breadcrumb :navs="navs"></Breadcrumb>
		<div class="title">
			<div><span>茶道资讯</span></div>
		</div>
		<div class="allNews">
			<NewsBlock v-for="(newsData,index) in newslist" :newsData="newsData"></NewsBlock>
			<Pagination :pagination="pagination"></Pagination>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import NewsBlock from './NewsBlock.vue'
import Breadcrumb from '../common/Breadcrumb.vue';
import Pagination from '../common/Pagination.vue';

import api from '../../api/index.js'

export default {
	components: {
		NewsBlock,
    	Breadcrumb,
    	Pagination
	},
	data() {
		return {
			navs:[{
					title:"茶道资讯",
					link:{ name:'newsList', params: {},query:{}}
				}],
			newslist:[],
			pagination:{}
		}
	},
	created: function () {		
		var page = this.$route.query.page || 1;
		this.getNewsList(page);
	},
	methods: {
		getNewsList(page){
			var data = {page:page,pageSize:4}
			api.getNewsList(data).then((res)=>{
		      if(res.data && res.data.code=="200"){
		      	this.pagination = {
		      		count:Math.ceil(res.data.data.count/4),
		      		current:page,
		      		callback:(page)=>{
			  			this.currentPage = page;
			  			this.$router.push({name:"newsList",query:{page:page}});
			  		}
		      	}
		      	this.newslist = res.data.data.data || [];
		      }
		    })
		}
	},
	watch:{
		$route (to, from) {
			if(to.name=="newsList"){
				this.getNewsList(this.currentPage);
			}	
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.newsList {
		height: 167px;
		width: 850px;
		.allNews{
			background-color: #ffffff;
			padding-top: 25px;
		}
		.title{
			background-color: #ffffff;
			padding:20px 20px 0 20px;
			>div{
				border-bottom: 1px solid #ddd;
				>span{
					display: inline-block;
					line-height: 22px;
					font-size: 16px;
					font-weight: bold;
					padding-bottom: 6px;
					border-bottom: 2px solid #ff9d1e;;
				}
			}
		}
	}
</style>