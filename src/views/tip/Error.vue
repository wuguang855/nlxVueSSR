<template>
  <div class="error-global">
    <img :src="src"/>
    <p>{{msg}}</p>
    <p v-if="errorType!='noData'">请点击<a href="javascript:;" @click="refresh">回到首页</a></p>
  </div>
</template>

<script type="text/ecmascript-6">
import api from '../../api'
import errorpic from '../../assets/error.png'

export default {
  props: {
    msg: {
      type: String,
      default: '很遗憾，您访问的页面出错，请刷新重试'
    },
    errorType: {
      type: String,
      default: 'noData'
    }
  },
  created(){
    api.loginProvider({});
  },
  data() {
    return {
      src: errorpic,
    }
  },
  methods: {
    refresh() {
      this.$router.push({name: 'indexPage'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.error-global {
  padding: 50px 0;
  text-align: center;
  img {
    margin-bottom: .1rem;
    width:5rem;
  }
}

.error-global p {
  font-size: 16px;
  color: #888;
  line-height: 1.5;
}
</style>
