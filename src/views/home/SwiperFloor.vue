<template>
	<div class="swiperFloor">
		<div v-swiper:mySwiper="swiperOption">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="banner in banners" :style="banner.url | transfrom">				
				</div>
			</div>
			<div class="swiper-pagination swiper-pagination-bullets"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
import 'swiper/dist/css/swiper.css'
import banner from '../../img/banner_1.png'
export default {
	props:{
		banners:{
			type:Array,
			default:[]
		}
	},
	data(){
		return {
			swiperOption:{
				loop: true,
				autoplay:{
					delay:5000
				},
				effect:"fade",
				
				pagination:{
					el: '.swiper-pagination',
					clickable: true
				}
			}
		}
	},
	methods:{
	},
	filters:{
		transfrom(url){
			return "background-image: url("+url+")";
		}
	}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.swiperFloor{
		width:100%;
		min-width:1200px;
		background-color:#8fd9b7;
		height:420px;
		.swiper-container{
			width:100%;
			margin:0 auto;
			height:420px;
		}
		.swiper-slide{
			height:420px;
			background-repeat: no-repeat;
			background-size:auto 420px;
			background-position: top center;
		}
	}
</style>
