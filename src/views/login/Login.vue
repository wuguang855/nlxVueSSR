<template>
	<div class="login">
		<div class="header">
			<span>账户登录</span><span>还没有账户,<a href="javascript:void(0);" @click="gotoReg">立即注册</a></span>

		</div>
		<div class="form">
			<div class="mb-13"><span class="loginIcon">&#xe622;</span><input :class="{hint:isHint}" v-model="tel" type="text" placeholder="手机号" /></div>
			<div class="mb-13"><span class="loginIcon">&#xe60d;</span><input v-model="pw" type="password" placeholder="密码" maxlength="16"/></div>
			<div class="verification"><span class="loginIcon">&#xe604;</span><input v-model="code" type="text" placeholder="验证码" /><span @click="refresh" class="code"><img :src="codeImg"/></span></div>
			<div class="tipContet" v-if="isShow">{{tipCon}}</div>
			<div class="forgetThePW">
				<a href="javascript:void(0);"  @click="gotoRP" >忘记密码？</a>
			</div>
			<div @click="submit" class="submit"><button>登录</button></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import api from '../../api/index.js';
	import utils from '../../util/index.js';
	export default {
		components: {

		},
		props: [

		],
		data() {
			return {
				codeImg: null,
				tel: null,
				pw: '',
				code: null,
				isHint: false,
				isShow:false,
				tipCon:null
			}
		},
		created() {
			this.getCodeImg();
		},
		methods: {
			//跳转注册页
			gotoReg(){
				this.$router.push({name:"register"});
			},
			//跳转忘记密码页
			gotoRP(){
				this.$router.push({name:"password"});
			},
			getCodeImg() {
				api.getCodeImg().then((res) => {
					if(res.data.code == 0) {
						this.codeImg = 'data:image/jpeg;base64,' + res.data.data;
						console.log(this.codeImg);
					}
				})
			},
			refresh() {
				this.getCodeImg();
			},
			submit() {
				var uname = this.tel;
				var pw = utils.sha256(this.pw);
				var data = {
					"mobileNo": uname,
					"password": pw,
					"sysName":"TEA_B2C"
				};
				if(this.tel == null || this.tel == "" || this.pw == null || this.pw == ""){
					this.tipSettimeout("手机号或密码不得为空");
				}else if(this.code == null || this.code == ""){
					this.tipSettimeout("验证码不得为空");
				}else{
					api.checkImgCode(this.code).then((res)=>{
						console.log("aaaaaaa",res.data.code);
						if(res.data.code == 0){
							api.teaMarketLogin(data).then((res) => {
								if(res.data.code == 0) {
									var token = res.data.data;
									utils.setCookie(this,"userToken", token);
									api.initHeader(this);
									api.getUserInfo().then((res) => {
										if(res.data.code == 0) {
											console.log(res.data.data);
											var user = res.data.data.user;
											this.$store.commit('SETUSERINFO', user);
											this.$router.replace({
												name: 'home'
											})
										}
									})
								}else{
									this.tipSettimeout("手机号或密码错误");
								}
							});
							this.$route.name		
						}else{
							this.tipSettimeout("验证码输入错误");
						}
					})
						
				}
			},
			tipSettimeout(tipWord){
				this.isShow = true;
						this.tipCon = tipWord;
						setTimeout(() => {
							this.isShow = false;
							this.tipCon = null;
				}, 3000)
			},
			telCheckout() {			
				var reg = /1([3|4|5|7|8|9]\d{0,9})?$/
				if(reg.test(this.tel)) {
					this.isHint = false;
				} else {
					this.isHint = true;
				}
			}
		},
		watch: {
			tel(to, from) {
				this.telCheckout();
			},
			pw(to, from){
				if(this.pw.length == 16){
					this.tipSettimeout("密码字符数已达最大值")
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	a{
		cursor: hand;
	}
	.hint {
		border: 1px solid red !important;
	}
	
	.login {
		.mb-13 {
			margin-bottom: 13px;
		}
		width: 360px;
		height: 370px;
		background-color: #fff;
		border-radius:6px;
		.header {
			height: 63px;
			background-color: #fbfbfb;
			border: 1px solid transparent;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			span {
				&:nth-child(1) {
					float: left;
					font-size: 18px;
					color: #666;
					line-height: 25px;
					font-weight: bold;
					margin-top: 20px;
					margin-left: 30px;
				}
				&:nth-child(2) {
					float: right;
					line-height: 17px;
					font-size: 12px;
					color: #999;
					margin-top: 26px;
					margin-right: 29px;
					a {
						color: #ff9d1e;
						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
		.form {
			padding: 30px 30px 0 30px;
			position: relative;
			div {
				width: 300px;
				height: 40px;
				border-radius: 3px;
				position: relative;
				input {
					width: 100%;
					height: 100%;
					line-height: 40px;
					text-indent: 35px;
					border-radius: 3px;
					border: 1px solid #ddd;
				}
				.loginIcon {
					position: absolute;
					top: 11px;
					left: 11px;
					display: inline-block;
					font-family: 'iconfont' !important;
					font-size: 16px;
					color: #ccc;
				}
			}
			.verification {
				input {
					width: 185px;
				}
				.code {
					display: inline-block;
					float: right;
					width: 105px;
					height: 40px;
					background-color: #ddd;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
			.tipContet{
				position: absolute;
				left: 76px;
				top: 181px;
				height: 30px;
				width: 140px;
				background-color: rgba(0,0,0,0.7);
				color: #fff;
				line-height: 30px;
				font-size: 12px;	
				text-align: center;
			}
			.forgetThePW {
				border: none;
				padding-top: 15px;
				a {
					display: inline-block;
					float: right;
					color: #666666;
					&:hover {
						text-decoration: underline;
					}
				}
			}
			.submit {
				box-shadow: 0 2px 9px 0 rgba(255, 157, 30, 0.4);
				button {
					width: 100%;
					height: 100%;
					background: #ff9d1e;
					border-radius: 4px;
					font-size: 18px;
					color: #fff;
					&:active {
						opacity: 0.8;
					}
				}
			}
		}
	}
</style>