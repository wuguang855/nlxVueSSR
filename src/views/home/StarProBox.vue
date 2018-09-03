<template>
  <div class="starProBox">
    <div class="title" @click="test">明星产品</div>
    <div class="proBox">
      <div v-for='goods in starGoods'>
        <router-link  :to="{name:'product',params:{gid:goods.id,tid:goods.goodsTypeId}}" ><img :src="goods.pic1" /></router-link>
        <div>{{ goods.pName }}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: { 
   
  },
  props:{
    starGoods:{
      type:Array,
      default:[]
    }
  },
  methods:{
    test(){
      console.log(this.starGoods);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.starProBox{
  background:#ffffff;
  width:169px;
  height:132px;
  padding:12px;
  .title{
    width:145px;
    height:28px;
    line-height:28px;
  }
  .proBox{
    width:145px;
    height:80px;
    >div{
      float:left;
      img{
        width:68px;
        height:52px;
      }
      >div{
        width:68px;
        height:22px;
        line-height:22px;
        text-align:center;
        font-size:12px;
        color:#666666;
        overflow: hidden; 
        text-overflow: ellipsis;
    		white-space: nowrap;
      }
    }
    >div:first-child{
      margin-right:9px;
    }
  }


}
</style>
