<template>
	<div class="list" >
		<div class="content">
			<Breadcrumb :navs="navs"></Breadcrumb>
			<div class="productList">
				<ul class="classify" >
					<li v-if="thirdTypeList">
						<span class="title">品类</span>
						<span class="classes">
							<div v-for="item in thirdTypeList" class="name" >
								<router-link :class="{current:(item.id==thirdTypeId)}" :to='{name:"list",params:{id:item.id}}'> {{item.name}}</router-link>
							</div>
						</span>
					</li>

					<li v-if="brandList">
						<span class="title">品牌</span>
						<span class="classes"  :class="{classesClosed:isClose}" >
							<div v-for="item in brandList" class="name">
								<router-link  :class="{current:item.id==brandId}" :to='{name:"list",params:{id:thirdTypeId},query:{brand:item.id}}'> {{item.name}}</router-link>
							</div>
						</span>	
						<span class="btn" v-if="brandList.length>32" :class="{btnClose:isClose}" @click="closeMore">
							<span>{{isClose?"展开":"关闭"}}</span>
							<span class="em">&#xe662;</span>
						</span>
					</li>

				</ul>
				<ul class="allProduct">
					<ProductBlock v-for="product in productList" :productData="product"></ProductBlock>
				</ul>
				<Pagination :pagination="pagination"></Pagination>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import Breadcrumb from '../common/Breadcrumb.vue';
import ProductBlock from './ProductBlock.vue'
import Pagination from '../common/Pagination.vue';
import api from '../../api/index.js'

export default {
	components: { 
		ProductBlock,
		Pagination,
		Breadcrumb
	},
	data(){
		return {
			navs:[],
			currentPage:1,
			goodsTypeTree:null,
			thirdTypeId:null,
			brandId:null,
			isClose:true,
			thirdTypeList:[],
			brandList:[],
			productList:[],
			pagination:{}
		}
	},
  	created(){
  		api.getGoodsTypeTree().then((res)=>{
			if(res.data && res.data.code=="200"){
				this.goodsTypeTree = res.data.data;
				var page = this.$route.query.page || 1;
				var brandId = this.$route.query.brand || null;
				var thirdType = this.$route.params.id;
				this.currentPage = page;
				this.thirdTypeId = thirdType;
				this.brandId = brandId;
				this.getGoodsList(page,thirdType,brandId);
			}
		});	
	},
	methods: {
		getGoodsList(page,thirdType,brand){
			var poastData = brand?{thirdType:thirdType,page:page,pageSize:25,brand:brand}:{thirdType:thirdType,page:page,pageSize:25}
			api.getGoodsList(poastData).then((res)=>{
		      if(res.data && res.data.code=="200"){
		      	this.pagination = {
		      		count:Math.ceil(res.data.data.count/25),
		      		current:page,
		      		callback:(page)=>{
			  			this.currentPage = page;
			  			this.$router.push({name:"list",query:{page:page,brand:brand},params:{thirdType:thirdType}});
			  		}
		      	}
		      	this.productList = res.data.data.data || [];
		      }
		    })
		},
		closeMore(){
			this.isClose = !this.isClose;
		}
	},
	watch:{
		$route (to, from) {
			if(to.name=="list"){
				var page = to.query.page || 1;
				var brand = to.query.brand;
				var thirdType = to.params.id;
				this.brandId = brand;
				this.thirdTypeId = thirdType;
				this.isClose = true;
				this.getGoodsList(page,thirdType,brand);				
			}	
		},
		thirdTypeId (to, from) {			
			var class0 = this.goodsTypeTree;
			if(class0){
				for(var i =0; i<class0.length;i++){
					var class1 = class0[i];
					for(var j =0; j<class1.children.length;j++){
						var class2 = class1.children[j];
						for(var k =0; k<class2.children.length;k++){
							if(class2.children[k].id==to){
								this.thirdTypeList = class2.children;
								var brandList =  class2.children[k].children;
								brandList = JSON.parse(JSON.stringify(brandList))
								brandList.unshift({name:"全部",id:null});
								this.brandList  = brandList;
								this.navs = [];
								this.navs.push({title:class2.children[k].name,link:{name:"list",query:{page:1},params:{thirdType:class2.children[k].id}}});
								console.log("type to ==brandList==>",brandList);	
							}
						}		
					}
				}
			}
		},
		brandId (to, from) {			
			var class0 = this.goodsTypeTree;
			if(class0){
				for(var i =0; i<class0.length;i++){
					var class1 = class0[i];
					for(var j =0; j<class1.children.length;j++){
						var class2 = class1.children[j];
						for(var k =0; k<class2.children.length;k++){
							var class3 = class2.children[k];
							for(var l =0; l<class3.children.length;l++){

								
								if(class3.children[l].id==to){
									
									this.thirdTypeList = class2.children;
									
									var brandList =  class3.children;
									
									brandList = JSON.parse(JSON.stringify(brandList))
									
									brandList.unshift({name:"全部",id:null});
									
									this.brandList  = brandList;
	
								}	
							}
							
						}		
					}
				}
			}
		},
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.list{
	width:100%;
	margin: 0 0 40px 0;
	.content{
		width:1200px;
		margin:0 auto;
		.productList{	
			.classify{
				margin:0px 0 10px 0;
				padding:0 20px;
				background-color:#fff;
				>li{	
					line-height:32px;
					font-size:14px;
					overflow:hidden;
					padding:14px 0;
					&:not(:first-child){
						border-top:1px dashed #dddddd;
					}
					span{
						display:inline-block;
						float:left;
					}
					.title{
						width:72px;
						color:#666666;
					}
					.classesClosed{
						height:60px;
					}
					.btn{
						float:right;
						text-align:left;
						color:#ff0437;
						.em{
							font-family: "iconfont";
							transition: all .5s;
							margin-left:2px;
						}
					}
					.btnClose{
						color:#ff0437;
						.em{
							transform: rotate(-180deg);
						}			
					}
					.classes{
						width:1000px;
						overflow:hidden;
						position: relative;
						.name{
							display:inline-block;
							margin-right:30px;

							&:hover{
								color:#ff0437;
							}
						}
						.current{
							color:#ff0437;
						}
					}
				}
			}			
			.allProduct{
				overflow: hidden;
				background-color:#fff;
				>div{
					float:left;
					margin:8px 8px 0px 8px;
				}
			}
		}
		.pagination{
			background-color:#fff;
		}
	}
}

</style>