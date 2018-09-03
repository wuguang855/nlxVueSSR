<template>
  <div class="news">
    <div>
      <div class="content">
        <router-view></router-view>
      </div>
      <div class="floatBlock">
        <CenterAffiche :listData="affiche"></CenterAffiche>
        <NewsCenter :listData="news"></NewsCenter>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

import CenterAffiche from './CenterAffiche.vue';
import NewsCenter from './NewsCenter.vue';
import api from '../../api/index.js';

export default {
  components: { 
    CenterAffiche,
    NewsCenter
  },
  data(){
    return {
      news:[],
      affiche:[]
    }
  },
  created: function () {    
    api.getDynamicNotification().then((res)=>{
      if(res.data && res.data.code=="200"){
          this.news = res.data.data.ZXDT || [];
          this.affiche = res.data.data.ZXGG || [];
      }
    })
  },
  methods:{

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.news{
  width:100%;
  min-width:1200px;
  min-height:820px;
  >div{
    width:1200px;
    margin:0 auto;
    min-height:820px;
    overflow:hidden;
    padding-bottom: 30px;
    .content{
      width:860px;
      min-height:820px;
      float:left;
    }
    .floatBlock{
      margin-top:40px;
      width:328px;
      height:820px;
      float:right;
    }
  }
}
</style>
