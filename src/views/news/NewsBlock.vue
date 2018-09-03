<template>
	<div class="newsBlock">
		<router-link :to='{name:"newsDetail",params:{subSys:newsData.subSys,id:newsData.newsId}}'>
			<span>
				<img :src="newsData.titlePic" />
			</span>
			<span class="fr">
				<h4>{{ newsData.title }}</h4>
				<p class="abstract">{{ newsData.summery }}</p>
				<p>{{ newsData.releaseTime | trasformDate}}</p>
			</span>
		</router-link>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		components: {

		},
		props: {
			newsData: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {

		},
		filters: {
			trasformDate: function(value) {
				if(!value) return '';
				value = value.substring(0, 10);
				return value;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.newsBlock {
		height: 167px;
		width: 850px;
		a {
			padding: 10px 20px;
			display: inline-block;
			width: 100%;
			height: 100%;
			background-color: #fff;
			transition: all 0.2s;
			&:hover {
				background: #f5f5f5;
			}
			span {
				&:first-child {
					display: inline-block;
					width: 240px;
					height: 147px;
					img {
						width: 100%;
						height: 100%;
					}
				}
				&:last-child {
					display: inline-block;
					width: 550px;
					margin-left: 20px;
					&:last-child {
						h4 {
							font-size: 16px;
							color: #333333;
							font-weight: bold;
							padding-top: 15px;
							line-height: 22px;
							margin-bottom: 13px;
							height: 36px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.abstract {
							line-height: 26px;
							font-size: 14px;
							color: #666666;
							margin-bottom: 16px;
							height: 52px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						line-height: 25px;
						font-size:12px;
						color:#999999;
					}
				}
			}
		}
	}
</style>