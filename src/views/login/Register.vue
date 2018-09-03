<template>
	<div class="retrievePW">

		<!--第一步-->
		<div class="forms">
			<div class="warmPrompt">
				<span>温馨提示：</span>如您已是茶易通APP注册用户，请直接登录。
			</div>
			<div class="mb-13"><b>&#xe622;</b><input :class="{telHint:isHint}" type="text" v-model="tel" placeholder="手机号" /></div>
			<div class="verification mb-13"><b>&#xe604;</b><input :class="{warning:isWarning}" type="text" v-model="code" placeholder="验证码" /><span @click="refresh" class="code"><img :src="codeImg"/></span></div>
			<div class="mb-13 smsVerification"><b>&#xe605;</b><input type="text" v-model="message" placeholder="短信验证码" /><button @click="getUserSMS">{{timeOut}}</button></div>
			<div class="mb-13"><b>&#xe60d;</b><input type="password" v-model="pwd" placeholder="请设置6-16位密码" maxlength="16"/></div>
			<div class="checkbox " :class="{checked:isChecked}"><i @click="checked"></i>我已阅读并同意
				<a href="javascript:void(0)">《智慧茶城协议》</a>
			</div>
			<div class="submit disable"><button @click="register" :class="{btnColor:isOrange}">注册</button></div>
			<div class="tipContet" v-if="isShow">{{tipCon}}</div>
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
				code: null,
				message: null,
				isWarning: false,
				isHint: false,
				pwd: null,
				isChecked: false,
				timeOut: "获取验证码",
				wait: 30,
				isShow: false,
				tipCon: null,
				isOrange: false
			}
		},
		computed: {

		},
		created() {
			this.getCodeImg();
		},
		methods: {
			getCodeImg() {
				api.getCodeImg().then((res) => {
					console.log(res.data);
					if(res.data.code == 0) {
						this.codeImg = 'data:image/jpeg;base64,' + res.data.data;
					}

				})
			},
			refresh() {
				this.getCodeImg();
			},
			register() {
				if(this.tel == null || this.tel == ""){
					this.tipSettimeout("手机号码不得为空");
				} else if(this.code == null || this.code == ""){
					this.tipSettimeout("图片验证码输入不正确");
				} else if(this.message == null || this.message == ""){
					this.tipSettimeout("短信验证码输入不正确");
				} else if(this.pwd == null || this.pwd == ""){
					this.tipSettimeout("密码不得为空");
				} else if(this.pwd.length<6){
					this.tipSettimeout("密码长度小于6个字符");
				} else if((this.tel != null) && (this.code != null) && (this.message != null) && (this.pwd != null) && (this.isChecked == true)) {
					var tel = this.tel;
					var code = this.code;
					var msg = this.message;
					var pwd = utils.sha256(this.pwd);
					var sysName = utils.getSysName();
					var data = {
						imgCode: code,
						sysName:sysName,
						smsCode: msg,
						telephone: tel,
						password: pwd,
						sysName:"TEA_B2C"
					}
					api.checkImgCode(this.code).then((res)=>{
						if(res.data.code == 0) {
							api.tmAppRegiste(data).then((res) => {
								console.log(res.data)
								if(res.data.code == '0') {
									this.$router.replace({
										name: 'login'
									})	
								}else if(res.data.code == 100) {
									this.tipSettimeout("该手机号已被注册，请直接登录");
								}
							});
						}else{
							this.tipSettimeout("图片验证码输入错误");
						}
					})
					
				}

			},
			checked() {
				this.isChecked = !this.isChecked
			},
			tipSettimeout(tipWord){
				this.isShow = true;
						this.tipCon = tipWord;
						setTimeout(() => {
							this.isShow = false;
							this.tipCon = null;
				}, 3000)
			},
			time() {
				var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if (this.tel == null || this.tel == "") {
					this.tipSettimeout("手机号码不得为空");
				} else if(!reg.test(this.tel)){
					this.tipSettimeout("手机号码输入不正确");
				} else{
					if(this.wait == 0) {
						this.timeOut = "获取验证码";
						this.wait = 30
					} else {
						this.timeOut = this.wait + "秒后重新发送";
						this.wait--;
						setTimeout(() => {
							this.time()
						}, 1000)
					}
				}
			},
			getUserSMS() {
				if(this.wait == 30) {
					this.time();
					var tel = this.tel;
					var code = this.code;
					var data = {
						phone: tel,
						type: "SMS_TYPE_REG",
						verCode: code
					}
					api.getUserSMS(data).then((res) => {
						if(res.data.code == '0') {
							console.log(res.data);
							this.isWarning = false;
						} else if(res.data.message == 
"手机号码已存在！"){
							this.tipSettimeout("该手机号已被注册，请直接登录")
						} else {
							this.isWarning = true
						}

					});
				}

			},
			isPoneAvailable($poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{0,9}$/;
				if(!myreg.test($poneInput.val())) {
					return false;
				} else {
					return true;
				}
			},
			telCheckout() {
				var reg = /1([3|4|5|7|8|9]\d{0,9})?$/
				if(reg.test(this.tel)) {
					this.isHint = false;
				} else {
					this.isHint = true;
				}
			},
			checkoutRequired(){
				if((this.tel != null) && (this.code != null) && (this.message != null) && (this.pwd != null) && (this.isChecked == true)){
					//设置高亮
					this.isOrange = true;
				}else{
					//设置置灰
					this.isOrange = false;
				}
			}

		},
		watch: {
			$route(to, from) {
				if(to.name == "register") {
					this.step = to.query.step;
				}
			},
			tel(to, from) {
				this.checkoutRequired()
				this.telCheckout();
			},
			code(to, from){
				this.checkoutRequired()
			},
			message(to, from){
				this.checkoutRequired()
			},
			pwd(to, from){
				this.checkoutRequired()
				if(this.pwd.length == 16){
					this.tipSettimeout("密码字符数已达最大值")
				}
			},
			isChecked(to, from){
				this.checkoutRequired()
			}
			

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.warning {
		border: 1px solid red !important;
	}
	
	.btnColor {
		background-color: #f58a00 !important;
	}
	
	.telHint {
		border: 1px solid red !important;
	}
	
	.retrievePW {
		width: 1200px;
		margin: 20px auto 30px;
		.mb-13 {
			margin-bottom: 13px;
		}
		background-color: #fff;
		width: 1200px;
		height: 450px;
		.forms {
			margin: 0 auto;
			width: 300px;
			padding-top: 60px;
			position: relative;
			.warmPrompt{
				position: absolute;
				top: 11px;
				left: 0;
				color:#999;
				span{
					color: #7cb943;
				}
			}
			div {
				width: 300px;
				height: 40px;
				border-radius: 3px;
				position: relative;
				>b {
					position: absolute;
					font-family: "iconfont";
					color: #ccc;
					font-weight: normal;
					font-size: 16px;
					display: inline-block;
					height: 40px;
					line-height: 40px;
					top: 0;
					left: 10px;
				}
				&.highlight {
					input {
						border: 1px solid #ff9d1e !important;
						color: #ff9d1e !important;
					}
					.hint {
						display: inline-block !important;
					}
				}
				.hint {
					position: absolute;
					top: 7px;
					right: -310px;
					line-height: 20px;
					color: #999;
					display: none;
					width: 300px;
					b {
						font-family: 'iconfont';
						display: inline-block;
						font-weight: normal;
						line-height: 20px;
						color: #e33b3b;
						font-size: 16px;
						margin-right: 3px;
					}
				}
				input {
					width: 100%;
					height: 100%;
					line-height: 40px;
					text-indent: 36px;
					border-radius: 3px;
					border: 1px solid #ddd;
				}
			}
			div:first-child {
				line-height: 40px;
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
			.checkbox {
				i {
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 5px;
					background: url(../../assets/unchecked.png) no-repeat;
				}
				a {
					color: #ff9d1e;
				}
			}
			.checkbox.checked {
				i {
					background: url(../../assets/checked.png) no-repeat;
				}
			}
			.smsVerification {
				position: relative;
				input {
					padding-right: 100px;
				}
				button {
					position: absolute;
					top: 0;
					right: 0;
					width: 90px;
					height: 40px;
					background-color: #ddd;
					color: #666;
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
			.submit.disable {
				box-shadow: none;
				button {
					background: #ddd;
				}
			}
			.tipContet{
				margin: 20px auto;
				width: 200px;
				height: 30px;
				background-color: rgba(0,0,0,0.7);
				color: #fff;
				line-height: 30px;
				font-size: 12px;	
				text-align: center;
			}
		}
		
		.succeed {
			width: 200px;
			margin: 0 auto;
			text-align: center;
			padding-top: 80px;
			p {
				&:nth-child(1) {
					font-family: 'iconfont';
					font-size: 60px;
					color: #7abd54;
					margin-bottom: 10px;
				}
				&:nth-child(2) {
					font-size: 14px;
					color: #7abd54;
					font-weight: 600;
					margin-bottom: 5px;
				}
				&:nth-child(3) {
					color: #999;
					a {
						color: #ff9d1e;
						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
	}
</style>