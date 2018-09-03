<template>
  <div class="navBar">
    <div class="content">
      <span class="active" @mouseleave="mouseleave" @mouseenter="mouseenter">全部茶品分类</span>
      <LeftNav :isHome="isHome" :isShow="isShow" :goodsTypeTree="goodsTypeTree" ></LeftNav>
      <router-link :to='{name:"home"}'><span>茶城首页</span></router-link>
      <router-link :to='{name:"bargains"}'><span :class="{actived:routerName=='bargains'}" >超值消费</span></router-link>
      <router-link :to='{name:"stars"}'><span :class="{actived:routerName=='stars'}">星级茶品</span></router-link>
      <router-link :to='{name:"newsList"}'><span  :class="{actived:routerName=='newsList'}" >茶道资讯</span></router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import LeftNav from './LeftNav.vue';
import {mapState} from 'vuex';

export default {
  components: { 
       LeftNav
  },
  props:{
    goodsTypeTree:{
      type:Array,
      default:[]
    }
  },
  data(){
    return {
      isShow:false,
      routerName:""
    }
  },
  computed:{
    ...mapState([
        'isHome'
    ]),
  },
  created: function () {
     this.isShow = this.isHome;
     this.routerName = this.$route.name;
  },
  methods:{
    showLeftNav(){
      if(!this.isHome){
        this.isShow = !this.isShow;
      }
    },
    mouseleave(){
      this.isShow = false;
    },
    mouseenter(index){
      this.isShow = true;
    }
  },
  watch:{
    $route (to, from) {
      this.routerName = to.name;
      this.isShow = this.isHome;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.navBar{
  width: 100%;
  min-width: 1200px;
  background-color: #77ac39;
  height:42px;
  line-height:42px;
  font-size:16px;
  color:#ffffff;
  letter-spacing:0;
  .content{
    width:1200px;
    margin:0 auto;
    .active{
       background-color: #477e03;
    }
    >span{
        display:inline-block;
        padding:0 20px;
        width:200px;
        text-align:left;
        position: relative;
        &:after{
          font-family:"iconfont" !important;
          content: "\e608";
          position: absolute;
          right:20px;
          font-size:12px;
        }
    }
    >a{
      >span{
        display:inline-block;
        padding:0 20px;
        width:124px;
        color:#fff;
        text-align:center;
        &:hover{
          background-color: #97cc5a;
        }
      }
    }
    .actived{
       background-color: #97cc5a;
    } 
  }
}

</style>
