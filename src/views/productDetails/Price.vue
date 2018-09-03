<template>
	<div class="price clearfix">
		<div class="fl">
			<div class="swiperFloor">
				<div v-swiper:mySwiper="swiperOption">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="banner in banners" :style="banner | transfrom">
						</div>
					</div>
				</div>
				<div class="swiper-pagination swiper-pagination-bullets"></div>
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</div>
		</div>
		<div class="fr">
			<h3>{{productData.pName}}</h3>
			<ul>
				<li>
					<span>市场价</span>
					<span class="marketPrice">¥{{productData.marketPrice}}/盒</span>
				</li>
				<li>
					<span>特卖价</span>
					<span class="specialPrice">¥{{productData.price}}<b>/盒</b>&nbsp;<b>（降价通知）</b></span>
				</li>
				<li>
					<span class="fl productInfo">商家信息</span>
					<span class="info">
						<div><span>企业名称</span><span>{{productData.shopName}}</span></div>
		<div><span>联系人</span><span>{{productData.userName}}</span></div>
		<div><span>固定电话</span><span>{{productData.phone?productData.phone:'暂无'}}</span></div>
		<div><span>手机号码</span><span>{{productData.telephone}}</span></div>
		<div><span>企业地址</span><span>{{productData.shopArea}}</span></div>
		</span>
		</li>
		<li>
			<span>已销售</span>
			<span class="fontSize14">{{productData.sallAmount?productData.sallAmount:0}}盒</span>
		</li>
		<li>
			<span>库存量</span>
			<span class="fontSize14">{{productData.amount}}盒</span>
		</li>
		<li>
			<span>运费额</span>
			<span class="fontSize14">全场在线支付满{{productData.freight? productData.freight:0}}元，免运费（不含货到付款）</span>
		</li>
		<li class="number clearfix">
			<span>数    量</span>
			<span><button @click="numAdd">-</button> <input type="text" :value="productNum" /> <button @click="productNum++">+</button></span>
		</li>
		<li>
			<button class="pay">立即购买</button>
		</li>
		</ul>

	</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import 'swiper/dist/css/swiper.css'
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
			var self =this;
			return {
				"swiperOption": {
					autoplay: true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function(index, className) {
							return '<span class="' + className + '" style="width: 78px;height: 78px;margin:0 2px;" >'+
										'<image style="width: 78px;height: 78px;" src="' + self.banners[index] + '">'+
									'</span>';
						}
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					
				},
				productNum:1
			}
		},
		computed: {
			banners(){
				var banner = [];
				//this.productData.pic && banner.push(this.productData.pic);
				this.productData.pic1 && banner.push(this.productData.pic1);
				this.productData.pic2 && banner.push(this.productData.pic2);
				this.productData.pic3 && banner.push(this.productData.pic3);
				this.productData.pic4 && banner.push(this.productData.pic4);
				this.productData.pic5 && banner.push(this.productData.pic5);
				return banner;
			}
		},
		methods: {
			numAdd(){
				if((--this.productNum)<1){
					this.productNum = 1
				}
			}
		},
		filters: {
			transfrom(url) {
				return "background-image: url(" + url + ")";
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.productInfo{
										height: 160px !important;
										line-height: 160px !important;
									}
	.thumb {
		width: 78px;
		height: 78px;
		img {
			width: 78px;
			height: 78px;
		}
	}
	.price {
		background-color: #fff;
		width: 1200px;
		height: 580px;
		padding: 20px;
		>.fl {
			width: 450px;
			height: 100%;
			background-color: #fff;
			position: relative;
			.swiperFloor {
				width: 450px;
				height: 448px;
				.swiper-container {
					width: 450px;
					margin: 0 auto;
					height: 100%;
				}
				.swiper-slide {
					height: 100%;
					background-repeat: no-repeat;
					background-size: 450px 100%;
					background-position: top center;
				}
				.swiper-pagination{
					width:410px;
					height:78px;
					overflow:hidden;
					bottom:5px;
					left:20px;
				}
				.swiper-button-next{
					border:1px solid #dddddd;
					background-color:#ffffff;
					width:15px;
					height:76px;
					bottom:0px;
					right:0px !important;
					top:480px !important;
					background-size:15px 15px !important;
					background-position:center center !important;
				}
				.swiper-button-prev{
					border:1px solid #dddddd;
					background-color:#ffffff;
					width:15px;
					height:76px;
					bottom:0px;
					left:0px !important;
					top:480px !important;
					background-size:15px 15px !important;
					background-position:center center !important;
				}
			}
		}
		.fr {
			width: 680px;
			height: 100%;
			h3 {
				font-size: 24px;
				color: #333;
				line-height: 33px;
				padding-bottom: 19px;
				border-bottom: 1px dashed #ddd;
			}
			>ul {
				padding-left: 20px;
				padding-top: 10px;
				li {
					>span:first-child {
						display: inline-block;
						width: 76px;
						height: 39px;
						line-height: 36px;
						color: #666;
						font-size: 12px;
						/*background-color: #999;*/
					}
					>span:last-child {
						display: inline-block;
						/*background-color: red;*/
					}
					
					.info {
						margin-bottom: 5px;
						div {
							height: 33px;
							line-height: 33px;
							&:first-child {
								border-top: 1px solid #f5f5f5;
							}
							border-bottom: 1px solid #f5f5f5;
							span {
								border-right: 1px solid #f5f5f5;
								font-size: 14px;
								&:first-child {
									display: inline-block;
									width: 100px;
									height: 100%;
									background-color: #FDFDFD;
									border-left: 1px solid #f5f5f5;
									text-align: center;
									color: #666;
									
								}
								
								&:last-child {
									display: inline-block;
									width: 230px;
									height: 100%;
									text-indent: 20px;
									color: #333;
								}
							}
						}
					}
					.marketPrice {
						color: #999;
						font-size: 12px;
					}
					.specialPrice {
						font-size: 24px;
						color: #CE0016;
						b {
							font-weight: normal;
							&:first-child {
								font-size: 16px;
								color: #333;
							}
							&:last-child {
								font-size: 12px;
								color: #1a69a6;
							}
						}
					}
					.fontSize14 {
						font-size: 14px;
					}
					.pay {
						background: #ff9d1e;
						border-radius: 4px;
						width: 184px;
						height: 46px;
						font-size: 18px;
						color: #ffffff;
						margin-top: 20px;
					}
					&.number {
						>span {
							float: left;
							&:last-child {
								button {
									width: 32px;
									height: 32px;
									border: 1px solid #ddd;
									color: #bcbcbc;
									line-height: 30px;
									font-size: 16px;
									float: left;
								}
								input[type=text] {
									border: 1px solid #ddd;
									width: 62px;
									height: 32px;
									margin: 0 5px;
									text-align: center;
									float: left;
								}
							}
						}
					}
				}
			}
		}
	}
</style>