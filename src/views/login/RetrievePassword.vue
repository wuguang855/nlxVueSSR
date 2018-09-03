<template>
	<div class="retrievePW">
		<!--firstStep  secondStep  thirdStep-->
		<div class="clearfix step firstStep" :class="{firstStep:isfirstStep,secondStep:issecondStep,thirdStep:isthirdStep}">
			<div><span>1</span><span>验收身份</span></div>
			<div><span>2</span><span>设置新密码</span></div>
			<div><span>3</span><span>完成</span></div>
		</div>
		<!--第一步-->
		<div v-if="step == 1" class="forms">
			<div class="mb-13"><input :class="{telHint:isHint}" type="text" v-model="tel" placeholder="手机号" /></div>
			<div class="verification mb-13"><input :class="{warning:isWarning}" type="text" v-model="code" placeholder="验证码" /><span @click="refresh" class="code"><img :src="codeImg"/></span></div>
			<div class="smsVerification"><input type="text" v-model="message" placeholder="短信验证码" /><button @click="getUserSMS">{{timeOut}}</button></div>
			<div></div>
			<div class="submit disable"><button :class="{btnColor:isOrange1}" @click="secondStep"> 下一步 </button></div>
		</div>
		
		<!--第二步-->
		<div v-if="step == 2" class="forms">
			<!--<div class="atPresent mb-13">当前用户手机：153****3856</div>-->
			<div class="mb-13 " :class="{highlight:isOK1}"><input type="password" v-model="newPw" placeholder="新密码" /><span class="hint"><b>&#xe6ca;</b>密码设置6-20位字母和数字的组合</span></div>
			<div :class="{highlight:isOK2}"><input type="password" v-model="confirmPw" placeholder="确认新密码" /><span class="hint"><b>&#xe6ca;</b>您输入的密码与确认密码不一致</span></div>
			<div></div>
			<div class="submit disable"><button :class="{btnColor:isOrange2}" @click="lastStep">下一步</button></div>
		</div>
		
		<!--第三步-->
		<div v-if="step == 3" class="succeed">
			<p>&#xe601;</p>
			<p>新密码设置成功！</p>
			<p>请牢记您新设置的密码。
				<a href="/">返回首页</a>
			</p>
		</div>

		<div class="tipContet" v-if="isShow">{{tipCon}}</div>
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
				step: null,
				isWarning: false,
				isOrange1: false,
				isOrange2: false,
				newPw: null,
				confirmPw: null,
				isOK1: false,
				isOK2: false,
				isHint: false,
				isfirstStep: true,
				issecondStep: false,
				isthirdStep: false,
				wait: 30,
				timeOut: "获取验证码",
				tipCon: null,
				isShow: false
			}
		},
		computed: {

		},
		created() {
			this.getCodeImg();

			this.step = this.$route.query.step || 1;

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
			submit() {

			},
			time() {
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
			},
			getUserSMS() {
				var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				if(this.tel == null || this.tel == "") {
					this.tipSettimeout("手机号码不得为空");
				} else if(!reg.test(this.tel)) {
					this.tipSettimeout("手机号码输入不正确");
				} else if(this.code == null || this.code == "") {
					this.tipSettimeout("图片验证码输入错误");
				} else if(this.wait == 30) {
					this.time();
					var tel = this.tel;
					var code = this.code;
					var data = {
						phone: tel,
						type: "SMS_TYPE_RESETPWD",
						verCode: code
					}
					api.getUserSMS(data).then((res) => {
						if(res.data.code == '0') {
							console.log(res.data);
							this.isWarning = false

						} else {
							this.isWarning = true
						}

					});
				}
			},
			nextStep() {
				var step = (this.step || 1) * 1 + 1;
				this.$router.push({
					name: "password",
					query: {
						step: step
					}
				});
			},
			secondStep() {
				api.checkImgCode(this.code).then((res) => {
					if (res.data.code == '0') {
						var postdata = {
							smsCode: this.message,
							phone: this.tel
						}
						api.checkSmsCode(postdata).then((res) => {
							console.log('checkSmsCode', res.data);
							if(res.data.code == '0') {
								this.nextStep();
							}else{
								//提示验证码错误 
								this.tipSettimeout("验证码输入错误");
							}
		
						})		
					} else {
						this.tipSettimeout("图片验证码输入错误");
					}
				})
			},
			tipSettimeout(tipWord){
				this.isShow = true;
						this.tipCon = tipWord;
						setTimeout(() => {
							this.isShow = false;
							this.tipCon = null;
				}, 3000)
			},
			lastStep() {
				var pw = utils.sha256(this.confirmPw);
				var data = {
					password: pw,
					smsCode: this.message,
					telephone: this.tel
				}
				api.tmAppResetPwd(data).then((res) => {
					console.log("yyy===>", res.data);
					if(res.data.code == '0') {
						this.nextStep();
					}
				});	
			},
			isPoneAvailable($poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{0,9}$/;
				if(!myreg.test($poneInput.val())) {
					return false;
				} else {
					return true;
				}
			},
			checkPassword() {
				if(this.newPw != this.confirmPw && this.confirmPw != null) {
					this.isOK2 = true;
				} else {
					this.isOK2 = false;
				}
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
			$route(to, from) {
				if(to.name == "password") {
					this.step = to.query.step;
				}
			},
			tel(to, from) {
				this.telCheckout();
			},
			message(to, from) {
				if(to.length == 4 && this.code.length == 4 && this.isHint == false) {
					this.isOrange1 = true
				} else {
					this.isOrange1 = false
				}
			},
			newPw(to, from) {
				this.checkPassword();
				if(!this.isOK2) {
					this.isOrange2 = true
				} else {
					this.isOrange2 = false
				}
			},
			confirmPw(to, from) {
				this.checkPassword();
				if(!this.isOK2) {
					this.isOrange2 = true
				} else {
					this.isOrange2 = false
				}
			},
			step(to, from) {
				console.log(to - 0);
				switch(to - 0) {

					case 1:
						this.isfirstStep = true,
							this.issecondStep = false,
							this.isthirdStep = false
						break;
					case 2:
						this.isfirstStep = false,
							this.issecondStep = true,
							this.isthirdStep = false
						break;
					case 3:
						this.isfirstStep = false,
							this.issecondStep = false,
							this.isthirdStep = true
						break;
					default:
						break;
				}
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
		position: relative;
		.tipContet {
			position: absolute;
			left: 500px;
			top: 390px;
			width: 200px;
			height: 30px;
			background-color: rgba(0, 0, 0, 0.7);
			color: #fff;
			line-height: 30px;
			font-size: 12px;
			text-align: center;
			border-radius: 4px;
		}
		.mb-13 {
			margin-bottom: 13px;
		}
		background-color: #fff;
		width: 1200px;
		height: 450px;
		.step {
			width: 420px;
			padding-top: 50px;
			margin: 0 auto;
			div {
				float: left;
				&:nth-child(2),
				&:nth-child(3) {
					margin-left: -3px;
				}
				span {
					display: block;
					text-align: center;
					&:first-child {
						width: 140px;
						height: 20px;
						line-height: 20px;
						color: #fff;
						background: url(../../img/state-gray.png) no-repeat;
					}
					&:last-child {
						color: #666;
						margin-top: 10px;
					}
				}
			}
		}
		.step.firstStep {
			div {
				&:nth-child(1) {
					span {
						&:first-child {
							background: url(../../img/state-light.png) no-repeat;
						}
						&:last-child {
							color: #7abd54;
						}
					}
				}
			}
		}
		.step.secondStep {
			div {
				&:nth-child(1),
				&:nth-child(2) {
					span {
						&:first-child {
							background: url(../../img/state-light.png) no-repeat;
						}
						&:last-child {
							color: #7abd54;
						}
					}
				}
			}
		}
		.step.thirdStep {
			div {
				&:nth-child(1),
				&:nth-child(2),
				&:nth-child(3) {
					span {
						&:first-child {
							background: url(../../img/state-light.png) no-repeat;
						}
						&:last-child {
							color: #7abd54;
						}
					}
				}
			}
		}
		.forms {
			margin: 0 auto;
			width: 300px;
			padding-top: 60px;
			div {
				width: 300px;
				height: 40px;
				border-radius: 3px;
				position: relative;
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
					text-indent: 10px;
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