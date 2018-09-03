<template>
	<div class="loginBox">
		<div class="top">
			<div class="userInfo" :class='user?"hasUser":"noUser"'>
				<div class="userPhoto">
					<img :src="(user&&user.logo)?user.logo:defaultHeadPhotoAfter" />
				</div>
				<div class="userName " :class='{gray:!user}'>{{user?user.userName:"Hi ,欢迎来到遵义茶城" }}</div>
			</div>
			<div class="btns" v-if="!user">
				<div class="login" @click="toLogin">登录</div>
				<div class="register" @click="toRegister">注册</div>
			</div>
		</div>
		<div class="bottom">
			<div class="title">
				<span class="name" @click="aaa">资讯</span>
				<span class="more"><router-link :to='{name:"newsList"}' >更多></router-link></span>
			</div>
			<ul>
				<li v-for="newsDetail in news">
					<router-link :to='{name:"newsDetail",params:{subSys:newsDetail.subSys,id:newsDetail.newsId}}'>{{ newsDetail.title }} </router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import defaultHeadPhoto from '../../img/login-before.png';
	import defaultHeadPhotoAfter from '../../img/login-after.png';
	
	
	
	import api from '../../api/index.js';
	import { mapState } from 'vuex';
	export default {
		components: {

		},
		props: {
			news: {
				type: Array,
				default: []
			}
		},

		data() {
			return {
				defaultHeadPhoto,
				defaultHeadPhotoAfter
			}
		},
		computed: {
			...mapState([
				'user',
				'cookies'
			]),
		},
		created() {
			if(!this.user && this.cookies.userToken) {
				var token = this.cookies.userToken;
				api.initHeader(this);
				api.getUserInfo().then((res) => {
					if(res.data.code == 0) {
						console.log(res.data.data);
						var user = res.data.data.user;
						this.$store.commit('SETUSERINFO', user);
					}
				})
			}
		},
		methods: {
			toLogin() {
				this.$router.push({
					name: 'login'
				});
			},
			toRegister() {
				this.$router.push({
					name: 'register'
				});
			},
			aaa() {
				console.log(JSON.stringify(this.cookies));
			}

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.loginBox {
		background: #ffffff;
		margin-top: 20px;
		width: 169px;
		height: 250px;
		padding: 10px;
		position: relative;
		color: #666666;
		.top {
			border-bottom: 1px dashed #dddddd;
			width: 149px;
			height: 117px;
			position: absolute;
			top: 0;
			.userInfo {
				width: 149px;
				height: 84px;
				position: absolute;
				.userPhoto {
					position: absolute;
					/*background:#f5f5f5;
        box-shadow:0 2px 4px 0 rgba(0,0,0,0.17);*/
					overflow: hidden;
					width: 54px;
					height: 54px;
					padding: 0;
					border-radius: 100%;
					top: 0;
					left: 46px;
					>img {
						width: 54px;
						height: 54px;
						margin: 0;
						border-radius: 100%;
					}
				}
				.userName {
					position: absolute;
					width: 100%;
					height: 28px;
					line-height: 28px;
					font-family: PingFangSC-Regular;
					font-size: 10px;
					letter-spacing: 0;
					text-align: center;
					top: 56px;
				}
			}
			.btns {
				width: 149px;
				height: 24px;
				position: absolute;
				bottom: 14px;
				>div {
					border: 1px solid #ff9d1e;
					border-radius: 100px;
					width: 52px;
					height: 22px;
					line-height: 22px;
					text-align: center;
					/*box-shadow:0 2px 4px 0 rgba(255,157,30,0.35), inset 0 -1px 0 0 #e78a2e;*/
				}
				.login {
					background: #ff9d1e;
					color: #fff;
					float: left;
					cursor: pointer;
					line-height: 18px;
				}
				.register {
					color: #ff9d1e;
					float: right;
					cursor: pointer;
					line-height: 18px;
				}
			}
			.noUser {
				top: -10px;
			}
			.hasUser {
				top: 20px;
			}
			.gray {
				color: #999999;
			}
		}
		.bottom {
			width: 149px;
			height: 130px;
			position: absolute;
			top: 120px;
			.title {
				width: 149px;
				height: 22px;
				line-height: 22px;
				margin-bottom: 2px;
				.name {
					display: inline-block;
					float: left;
					padding: 0 2px;
					border-bottom: 2px solid #ff9d1e;
				}
				.more {
					display: inline-block;
					float: right;
				}
			}
			>ul {
				height: 100px;
				width: 149px;
				>li {
					width: 100%;
					height: 25px;
					line-height: 25px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>