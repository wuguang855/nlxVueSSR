<template>
<div class="floor">
  <div >
    <FloorName :floorType="floorData.type"></FloorName>
    <div class="content">
      <div class ="cover" >
        <img :src="floorData.type=='hotGoods'?hotProductCover:latestProductCover">
      </div>
      <div  class ="productList">
        <div v-for = "product in floorData.data">
          <component :is="floorData.type=='hotGoods'?'HotProduct':'LatestProduct'" :productData="product" ></component> 
        </div> 
      </div>
    </div>
  </div> 
</div>
</template>
<script type="text/ecmascript-6">

import FloorName from '../common/FloorName.vue';
import HotProduct from '../common/HotProduct.vue';
import LatestProduct from '../common/LatestProduct.vue';

import hotProductCover from '../../img/cover_1.png';
import latestProductCover from '../../img/cover_2.png';

export default {
  components: { 
    FloorName,
    HotProduct,
    LatestProduct
  },
  props:{
    floorData:{
      type:Object,
      default:{}
    }
  },
  data(){
    return {
      hotProductCover,
      latestProductCover
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.floor{
  width:100%;
  min-width:1200px;
  height:565px;
  >div{
    width:1200px;
    margin:0 auto;
    .content{
      width:1200px;
      height:470px;
      .cover{
        width:200px;
        height:470px;
        float:left;
        >img{
          width:100%;
          height:100%;
        }
      }
      .productList{
        float:right;
         width:990px;
        height:470px;
        overflow:hidden;
        >div{
          width:240px;
          height:230px;
          float:left;
          margin-left:0px;
          &:not(:nth-child(4n+1)){
            margin-left:10px;
          }
          &:nth-child(n+5){
            margin-top:10px;
          }
        }
      }
    }
  }
}
</style>
