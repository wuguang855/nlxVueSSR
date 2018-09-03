<template>
  <div>
    <TitleBar></TitleBar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script type="text/ecmascript-6">


import TitleBar from './TitleBar.vue';

import Footer from '../common/Footer.vue';

export default {
  components: { 
    TitleBar,
      Footer
  },
  data(){
    return {
      
    }
  },
  created(){
    console.log(TitleBar,"TitleBarTitleBarTitleBar==>")
  },
  methods:{
    
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  
</style>
