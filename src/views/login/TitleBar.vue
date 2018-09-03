<template>
  <div class="titleBar">
    <div class="content">
      <span class="logo"></span>
      <span class="title">{{wellcome}}</span>
      <span class="leftBtns">
        <span><a href="/teamall/">网站首页</a></span>   
        <span @click="goToRegister"><a href="javascript:void(0)">注册</a></span>
        <span @click="goToLogin"><a href="javascript:void(0)">登录</a></span>
      </span>
    </div>  
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  components: { 
   
  },
  data(){
    return {
      wellcome:"欢迎登录"
    }
  },
  created(){
		this.setWellcome();
  },
  methods:{
  	setWellcome(){
  		var wellcomeWords ={
				register:"欢迎注册",
				login:"欢迎登录",
				password:"修改密码"
			};
			this.wellcome=wellcomeWords[this.$route.name];
  	},
    myConfirm1(data) {
     console.log(this.$store.state);
      //this.options.visible =false;
    },
    goToLogin(){
				this.$router.push({name:"login"});
		},
		goToRegister(){
				this.$router.push({name:"register"});
		},
  },
  watch:{
  	$route(to,from){
  		this.setWellcome();
  	}
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

.titleBar{
  background: #fff;
  height: 108px;
  width: 100%;
  .content{
    position:relative;
    width:1200px;
    height: 108px;
    margin:0 auto;
    overflow:hidden;
    >span{
      display:block;
      float:left;
      height: 108px;
      line-height: 108px;
    }
    .logo{
      width: 210px;
      background-image: url('../../img/logo-teaCity.png');
      background-repeat: no-repeat;
      background-position: left center;
    }
    .title{
      margin-left:20px;
      font-size:26px;  
    }
    .leftBtns{
      float:right;
      font-size:16px;
      color:#333333;
      padding:34px 0;
      padding-right:20px;
      line-height:40px;
      >span{
        margin:0 10px;
        float:right;
        
        &:hover{
        	a{
        		cursor: hand;
        		color:#ff9d1e;
        	}
        	
        }
      }
    }
  }
}
</style>
