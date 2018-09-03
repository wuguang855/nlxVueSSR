<template>
<div class="ad">
  <div>
    <img src="../../img/ad.png">
  </div> 
</div>
</template>
<script type="text/ecmascript-6">


import latestProductCover from '../../img/cover_2.png';

export default {
  components: { 
   
  },
  props: [],
  data(){
    return {
      
    }
  },
  methods:{

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.ad{
  width:100%;
  min-width:1200px;
  height:254px;
  >div{
    width:1200px;
    padding:10px;
    margin:0 auto;
    >img{
      width:1180px;
      height:234px;
    }
  }
}
</style>
