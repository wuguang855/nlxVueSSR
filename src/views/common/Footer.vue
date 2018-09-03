<template>
	<div class="footer">
		<div class="w">
			<div class="topIcon">
				<div>
					<span>&#xe60e;</span>
					<span>
  						<b>产地直供</b>
  						<p>原产地直供 无中间环节</p>
  					</span>
				</div>
				<div>
					<span>&#xe60a;</span>
					<span>
  						<b>溯源追踪</b>
  						<p>全程溯源追踪 保证茶叶安全</p>
  					</span>
				</div>
				<div>
					<span>&#xe60b;</span>
					<span>
  						<b>专业评分</b>
  						<p>专业测评把关 品鉴全国好茶</p>
  					</span>
				</div>
				<div>
					<span>&#xe609;</span>
					<span>
  						<b>交易保障</b>
  						<p>国资背景 安全保证 服务保障</p>
  					</span>
				</div>
			</div>
			<div class="myLinks clearfix">
				<dl>
					<dt><a href="#">购物指南</a></dt>
					<dd>
						<a href="#">会员注册</a>
					</dd>
					<dd>
						<a href="#">购物流程</a>
					</dd>
					<dd>
						<a href="#">订单查询</a>
					</dd>
					<dd>
						<a href="#">积分商城</a>
					</dd>
				</dl>
				<dl>
					<dt><a href="#">支付与配送</a></dt>
					<dd>
						<a href="#">在线支付</a>
					</dd>
					<dd>
						<a href="#">茶茶通</a>
					</dd>
					<dd>
						<a href="#">优惠券</a>
					</dd>
					<dd>
						<a href="#">配送方式</a>
					</dd>
				</dl>
				<dl>
					<dt><a href="#">售后服务</a></dt>
					<dd>
						<a href="#">售后承诺</a>
					</dd>
					<dd>
						<a href="#">溯源追踪</a>
					</dd>
					<dd>
						<a href="#">退换货政策</a>
					</dd>
				</dl>
				<dl>
					<dt><a href="#">常见问题</a></dt>
					<dd>
						<a href="#">售后问题</a>
					</dd>
					<dd>
						<a href="#">售前问题</a>
					</dd>
				</dl>
				<dl>
					<dt><a href="#">关于我们</a></dt>
					<dd>
						<a href="#">关于我们</a>
					</dd>
					<dd>
						<a href="#">联系我们</a>
					</dd>
				</dl>
				<span class="phone">
					<p>025-1234567</p>
					<p>周一至周日08:00-22:00</p>
					<a href="#">在线客服</a>
				</span>
				<span class="QRcode">
					<span :style="style1"></span>
					<p>公司微信公众号</p>
				</span>
			</div>
		</div>
		<div class="version">
			Copyright© 2018&nbsp;贵州遵义茶叶交易中心
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import img from '../../img/QRcode.jpg';
	export default {
		components: {

		},
		props: [

		],
		data() {
			return {
				style1:{
					"background-image":"url("+img+")"
				},
				header: {

				}
			}
		},
		methods: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.footer {
		min-height: 420px;
		background-color: #fff;
		width:100%;
		min-width:1200px;
		.w {
			width: 1200px;
			margin: 0 auto;
		}
		.version {
			height: 40px;
			line-height: 40px;
			text-align: center;
			background: #f6f6f6;
			font-size: 12px;
			color: #999999;
		}
		.topIcon {
			height: 140px;
			border-bottom: 1px solid #ddd;
			/*display: flex;
			justify-content: space-between;
			align-items: center;*/
			padding-top: 40px;
			>div {
				display: inline-block;
				float: left;
				width: 25%;
				height: 60px;
				border-right: 1px solid #ddd;
				padding-left: 26px;
				&:last-child {
					border-right: none;
				}
				span {
					float: left;
					&:first-child {
						font-family: "iconfont" !important;
						background: #f58a00;
						width: 60px;
						height: 60px;
						border-radius: 100%;
						font-size: 28px;
						text-align: center;
						line-height: 60px;
						color: #fff;
						font-weight: normal;
					}
					&:last-child {
						padding-top: 8px;
						padding-left: 12px;
						b {
							font-size: 16px;
							line-height: 22px;
						}
						p {
							font-size: 14px;
							line-height: 22px;
							color: #999;
						}
					}
				}
			}
		}
		.myLinks {
			padding-top: 29px;
			height: 240px;
			dl {
				float: left;
				width: 150px;
				a:hover {
					text-decoration: underline;
				}
				dt {
					a {
						font-size: 16px;
						line-height: 22px;
						color: #333333;
						font-weight: 900;
					}
					margin-bottom: 17px;
				}
				dd {
					a {
						line-height: 36px;
						font-size: 14px;
						color: #666;
					}
				}
			}
			>span {
				float: left;
			}
			>.phone {
				text-align: center;
				padding-top: 22px;
				p {
					&:first-child {
						font-size: 24px;
						color: #333333;
						line-height: 33px;
					}
					&:nth-child(2) {
						opacity: 0.4;
						font-size: 12px;
						color: #666666;
						line-height: 17px;
						margin-bottom: 19px;
					}
				}
				a {
					display: block;
					border: 1px solid #f58a00;
					width: 130px;
					height: 38px;
					line-height: 38px;
					font-size: 16px;
					color: #f58a00;
					margin: 0 auto;
					text-align: center;
					transition: all 0.1s;
					&:hover {
						background-color: #f58a00;
						color: #fff;
					}
				}
			}
			>.QRcode {
				margin-left: 120px;
				padding-top: 10px;
				span {
					display: block;
					width: 120px;
					height: 120px;
					background-repeat: no-repeat;
					background-size: 100% 100%;
					/*background-image: url(../../img/QRcode.jpg);*/
				}
				p{
					text-align: center;
					font-size:14px;
					color:#333333;
					margin-top: 10px;
					font-weight: 800;
				}
			}
		}
	}
</style>