<template>
  <div class="error-404">
    <div class="error-box">
    	
    </div>
    <p class="text">别着急，点击<router-link :to="{name:'indexPage'}" class="link">这里</router-link >就可以回到首页啦！</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
$basic: 72;
.error-404 {
	.error-box {
		position: relative;
		margin: 300rem/$basic auto 0;
		width: 600rem/$basic;
		height: 410rem/$basic;
		background: url("../../assets/404.png") center no-repeat;
		background-size: 5rem auto;
		.text {
			position: absolute;
			right: 60rem/$basic;
			bottom: 80rem/$basic;
			color: #666;
			font-size: 18rem/$basic;
			.link {
				color: #d03d44;
				font-size: 24rem/$basic;
			}
		}
	}
	.text{
		text-align:center;
	}
}
</style>
