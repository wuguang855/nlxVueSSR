<template>
  <div class="titleBar">
    <div class="content">
      <span class="logo"></span>
      <div class="searchBar">
        <input type="text" class="text" v-model="keyword" placeholder="输入您要搜索的商品关键词" />
        <div class="btn" @click="search">搜索</div> 
      </div>  
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data(){
    return {
     keyword:""
    }
  },
  methods:{
    search() {
      this.$router.push({
        path:"/search",
        query:{keyword:this.keyword}
      });
    },
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
    .logo{
      position:absolute;
      top:0;
      left:0;
      display: inline-block;
      height: 108px;
      width: 210px;
      background-image: url('../../img/logo-teaCity.png');
      background-repeat: no-repeat;
      background-position: left center;
    }
    .searchBar{
      position: absolute;
      left:386px;
      top:32px;
      border:2px solid #77ac39;
      width:574px;
      .text{
        width:465px;
        height:36px;
        line-height:36px;
        padding:0 10px 0 10px;
        color:#cccccc;
        margin:0;
        font-size: 12px;
        background-color: rgba(255,255,0,0);
      }
      .btn{
        line-height: 100%;
        height:38px;
        width: 100px;
        line-height:38px;
        color: #ffffff;
        background: #77ac39;
        margin: 0;
        margin-top:-2px;
        text-align:center;
        font-size:16px;
        float: right;
      }
    }
  }
}

#searchBartext{
  line-height: 100%;
  height: 100%;
  width: 465px;
  padding: 0 10px;
  color:#cccccc;
  margin: 0;
  font-size: 12px;
  background-color: rgba(255,255,255,0);
}
#searchBarBtn{
  line-height: 100%;
  height: 100%;
  width: 100px;
  color: #ffffff;
  background: #e59635;
  margin: 0;
  float: right;
}
</style>
