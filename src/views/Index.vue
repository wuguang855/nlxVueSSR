<template>
  <div>
    <Header></Header>
    <TitleBar></TitleBar>
    <NavBar :goodsTypeTree="goodsTypeTree"></NavBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script type="text/ecmascript-6">
  import Header from './common/Header.vue';
  import TitleBar from './common/TitleBar.vue';
  import NavBar from './common/NavBar.vue';
  import Footer from './common/Footer.vue';

  import api from '../api/index.js';

  export default {
    components: { 
      Header,
      TitleBar,
      NavBar,
      Footer
    },
    data(){
      return{
        goodsTypeTree:null
      }
    },
    created: function () { 
      api.getGoodsTypeTree().then((res)=>{
        if(res.data && res.data.code=="200"){
          this.goodsTypeTree = res.data.data;
        }
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
