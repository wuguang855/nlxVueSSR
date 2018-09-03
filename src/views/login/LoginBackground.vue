<template>
	<div class="loginBg">
		<div class="w">
			<div class="fr">
				<Login></Login>
			</div>
			
		</div>
		
	</div>
	
</template>
<script type="text/ecmascript-6">
	import Login from './Login.vue'
	export default {
		components: {
			Login
		},
		props: [

		],
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.loginBg{
		height: 500px;
		min-width: 1200px;
		background-color: #999;
		background-image: url(../../img/loginBg.png);
		background-position: top center;
		background-size: auto 100%;
		background-repeat: no-repeat;
		.w{
			width: 1200px;
			margin: 0 auto;
			.fr{
				padding-top: 62px;
			}
		}
	}
</style>