<template>
	<div class="fulllist">
		<div class="banner" :class="{ 'bannerStar': isBannerStar, 'bannerBargain': isBannerBargain }"></div>
		<div class="content">
			<ul>
				<ProductBlock v-for="product in productList" :productData="product"></ProductBlock>
			</ul>
			<Pagination :pagination="pagination"></Pagination>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import ProductBlock from './ProductBlock.vue'
import Pagination from '../common/Pagination.vue';
import api from '../../api/index.js'
export default {
	components: {
		ProductBlock,
		Pagination
	},
	data(){
		return {
			currentPage:1,
			productList :[],
			pagination:{},
			isBannerStar:false,
			isBannerBargain:false
		}
	},
	computed:{
		
	},
	created(){
		if(this.$route.name == "stars") {
			this.isBannerStar=true,
			this.isBannerBargain=false
		} else {
			this.isBannerStar=false,
			this.isBannerBargain=true
		};
		var page = this.$route.query.page || 1;
		var type = this.$route.name;
		this.currentPage = page;
		this.getProductList(page,type);
	},
	methods: {
		getProductList(page,type){
			var getDataApi = type=="stars"?api.getStarGoods:api.getSuperValueGoods;
			var poastData = {page:page,pageSize:25}
			getDataApi(poastData).then((res)=>{
		      if(res.data && res.data.code=="200"){
		      	this.pagination = {
		      		count:Math.ceil(res.data.data.count/25),
		      		current:page,
		      		callback:(page)=>{
			  			this.currentPage = page;
			  			this.$router.push({name:type,query:{page:page}});
			  		}
		      	}
		      	this.productList = res.data.data.data || [];
		      }
		    })
		}
	},
	watch:{
		$route (to, from) {
			if(to.name=="bargains" || to.name=="stars"){
				var type = to.name;
				this.currentPage = this.$route.query.page || 1;
				this.getProductList(this.currentPage,type);
			};
			if(this.$route.name == "stars") {
				this.isBannerStar=true,
				this.isBannerBargain=false
			} else {
				this.isBannerStar=false,
				this.isBannerBargain=true
			};
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.fulllist{
	width:100%;
	.banner{
		width:100%;
		min-width:1200px;
		background-color:#5e9f58;
		height:420px;
		/*background-image: url(../../img/banner_green.png);*/
		background-position: center;
		background-size:auto 420px ;
		background-repeat: no-repeat;
	}
	.bannerBargain{
		background-image: url(../../img/bgBargains.jpg);
	}
	.bannerStar{
		background-image: url(../../img/bgStar.jpg);
	}
	.content{
		width:1200px;
		margin:30px auto;
		background-color:#fff;
		>ul{
			overflow: hidden;
			>div{
				float:left;
				margin:8px 8px 0px 8px;
			}
		}
	}
}

</style>