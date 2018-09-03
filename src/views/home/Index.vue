<template>
<div >
  <SwiperFloor :banners="banners"></SwiperFloor>
  <div class="login-box">
    <div>
      <div class="login">
        <LoginBox :news="news.data"></LoginBox>
      </div>
      <div class="star">
        <StarProBox :starGoods="starGoods"></StarProBox>
      </div>
    </div>
  </div>
  <Floor :floorData="hotGoods" ></Floor>
  <Floor :floorData="latestGoods" ></Floor>
  <AdFloor></AdFloor>
  <Notice :news="news"></Notice>
</div>
</template>
<script type="text/ecmascript-6">

import SwiperFloor from './SwiperFloor.vue';
import LoginBox from './LoginBox.vue';
import StarProBox from './StarProBox.vue';
import Floor from './Floor.vue';
import AdFloor from './AdFloor.vue';
import Notice from './Notice.vue';
import api from '../../api/index.js';

export default {
  components: {
    SwiperFloor,
    LoginBox,
    StarProBox,
    Floor,
    AdFloor,
    Notice
  },
  data(){
    return {
      banners:[],
      hotGoods:{
        type:"hotGoods",
        data:[]
      },
      latestGoods:{
        type:"latestGoods",
        data:[]
      },
      news:{
        type:"news",
        data:[]
      },
      starGoods:[]
    }
  },
  created(){
    api.getIndexData().then((res)=>{  
      var data = res.data;
      if(data.code=="200"){
        this.banners = data.data.CC_BANNER;
        this.hotGoods.data = data.data.CC_HOTGOODS;
        this.latestGoods.data = data.data.CC_NEWGOODS;
        this.news.data = data.data.CC_NEWS;
        this.starGoods = data.data.CC_STARGOODS;
      }
    });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.login{
  position:absolute;
  left:50%;
  top:180px;
  z-index:900;
  margin-left:428px;
}
.star{
  position:absolute;
  left:50%;
  top:460px;
  z-index:900;
  margin-left:428px;
}
</style>
