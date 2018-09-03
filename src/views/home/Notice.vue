<template>
<div class="notice">
  <div>
    <FloorName :floorType="news.type"></FloorName>
    <div class="content">
      <div v-for="newsData in news.data">
        <NewsBlock :newsData="newsData"></NewsBlock>
      </div>
    </div>
  </div> 
</div>
</template>
<script type="text/ecmascript-6">
import FloorName from '../common/FloorName.vue';
import NewsBlock from '../common/NewsBlock.vue';
export default {
  components: { 
    FloorName,
    NewsBlock
  },
  props:{
    news:{
      type:Object,
      default:{}
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.notice{
  width:100%;
  min-width:1200px;
  height:480px;
  >div{
    width:1200px;
    margin:0 auto;
    .content{
      width:1200px;
      height: 316px;
      >div{
        float:left;
        &:nth-child(n+2){
          margin-left:20px;
        }
      }
    }
  }
}
</style>
