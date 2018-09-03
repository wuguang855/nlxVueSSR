<template>
  <div class="error-500">
    <Error msg="很遗憾，您访问的页面出错，请刷新重试！" errorType="serverError"></Error>
  </div>
</template>

<script type="text/ecmascript-6">
import Error from '../tip/Error.vue';

export default {
	components: { 
  	Error
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
$basic: 72;
.error-500 {
	margin-top: 20%;
}
</style>
