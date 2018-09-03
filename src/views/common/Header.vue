<template>
	<div class="header">
		<div class="content">
			<span class="fl">
        <span class="welcome">{{user?user.name:""}}您好，欢迎您访问贵州遵义茶叶交易中心！</span>
			<router-link v-if="!user" class="link" :to="{name:'login'}">请登录</router-link>
			<router-link v-if="!user" class="link" :to="{name:'register'}">免费注册</router-link>
			<a v-if="!!user" href="javascript:void(0);" class="link" @click="loginOut">退出登录</a>

			</span>
			<span class="fr">
        <router-link class="link" :to="{name:'home'}">返回首页</router-link>
        <span class="link" @click="setHome"><a href="javascript:void(0);">设为首页</a></span>
			<span class="link" @click="addFavorite"><a href="javascript:void(0);">加入收藏</a></span>
			<span class="hotline">热线电话：<span>4008-766-977</span> </span>
			</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { mapState } from 'vuex';
	import utils from '../../util/index.js'
	export default {
		components: {

		},
		props: [

		],
		data() {
			return {
				header: {

				}
			}
		},
		computed: {
			...mapState([
				'user'
			]),
		},
		methods: {
			addFavorite() {
				var url = window.location;
				var title = document.title;
				var ua = navigator.userAgent.toLowerCase();
				if(ua.indexOf("360se") > -1) {
					alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
				} else if(ua.indexOf("msie 8") > -1) {
					window.external.AddToFavoritesBar(url, title); //IE8
				} else if(document.all) {
					try {
						window.external.addFavorite(url, title);
					} catch(e) {
						alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
					}
				} else if(window.sidebar) {
					window.sidebar.addPanel(title, url, "");
				} else {
					alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
				}
			},
			setHome(event) {
				var obj = event.currentTarget;
				var vrl = window.location;
				var tip = '您的浏览器不支持此操作\n请使用浏览器的“选项”或“设置”等功能设置首页';
				if(/360se/i.test(window.navigator.userAgent)) {
					alert(tip);
				}
				var url = vrl.href;
				try {
					obj.style.behavior = 'url(#default#homepage)';
					obj.setHomePage(url);
				} catch(e) {
					alert(tip);
				}
			},
			loginOut() {
				utils.delCookie(this, 'userToken');
				this.$store.commit('SETUSERINFO', null);
			}
		},
		watch: {
			$store(newData, oldDate) {
				console.log(newData);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.header {
		background: #dddddd;
		width: 100%;
		min-width: 1200px;
		height: 32px;
		line-height: 32px;
		font-family: SourceHanSansCN-Normal;
		font-size: 14px;
		color: #333333;
		letter-spacing: -0.29px;
		text-align: center;
		.content {
			width: 1200px;
			margin: auto;
			.fr {
				float: right;
				.link:not(:first-child):before {
					content: '|';
					margin: 0 5px;
				}
				.link {
					a{
						cursor: hand;
					}
				}
				.hotline {
					margin-left: 36px;
					span {
						color: #E78D06;
					}
				}
			}
			.fl {
				float: left;
				font-size: 14px;
				.link {
					font-size: 10px;
					margin-left: 10px;
					cursor: hand;
					color: #77ac39;
				}
			}
		}
	}
</style>