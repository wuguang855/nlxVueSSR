<template>
  <div class="leftBar">
  	<div class="step1" :class="{hidden:(!isHome&&!isShow&&activity)}">
  		<div v-for="(teaType,index) in  goodsTypeTree" @mouseleave="mouseleave" @mouseenter="mouseenter(index)" >
  			<div>
	  			<span>{{teaType.name}}</span>
	  			<span>
	  				<span class="demo" v-if="!!teaType.children && !!teaType.children[0]">{{ teaType.children[0].name }}</span>
	  				<!--<span v-if="teaType.children[1]" >|</span>
	  				<span v-if="teaType.children[1]" class="demo">{{teaType.children[1].name}}</span>	-->
	  			</span>
  			</div>
  		</div>
  	</div>
  	<div class="step2" :class="{hidden:activity}" @mouseenter="mouseenter"  @mouseleave="mouseleave">
  		<div v-for="subClass in subClassTree">
  			<span class="area">
  				{{subClass.name}}>	
  			</span>
  			<ul>
  				<li v-for="tea in subClass.children"><a href="javaScript:void()" @click="pageTo('list',tea.id)">{{tea.name}}</a></li>
  			</ul>
  		</div>
  	</div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {

  data(){
    return {
      activity:true,
      subClassTree:[]
    }
  },
  props:{
    isHome:{
      type:Boolean,
      default:false
    },
    isShow:{
      type:Boolean,
      default:false
    },
    goodsTypeTree:{
      type:Array,
      default:[]
    }
  },
  methods:{
    mouseleave(){
      this.activity = true;
    },
    mouseenter(index){
      this.activity = false;
      if(typeof(index) =="number"){
        this.subClassTree = this.goodsTypeTree[index].children;
      }
    },
    pageTo(name,id){
    	this.activity = true;
    	//alert(1);
    	this.$router.push({name:name,params:{id:id}});
    
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.leftBar{
		position: absolute;
		background:#8fd9b7;
		z-index:2;
    .hidden{
      display:none
    }
		.step1{
			position: absolute;
			width:200px;
			height:420px;
			background-color: rgba(0,0,0,.6);
			>div{
				width:200px;
				height:40px;
				line-height:40px;
				padding:0 20px;
				font-size:12px;
        background-color:rgba(0,0,0,0);
        color:#ffffff;
        >div{
          border-bottom:1px dashed rgba(255,255,255,.1);
        } 
        &:hover{
          background-color:#fff;
          color:#333333;
          >div{
            border-bottom:1px solid rgba(255,255,255,0);
          }   
        }
				>div{
					>span{				
						&:first-child{
							display: inline-block; 
							font-family:PingFangSC-Medium;
							width: 100px;
							height: 40px;
							font-size:16px;
							letter-spacing:0;
							text-align:left;
							font-weight:700;
						}
						&:not(:first-child){
							font-family:PingFangSC-Regular;
							letter-spacing:0;
							>span{
								display: inline-block;
								font-size:12px;		
							}
							.demo{				 
								width:56px;
								padding:0 4px;
								height:12px;
								line-height:12px;
								overflow:hidden;
								text-align: right;
							}
						}
					}
				}
			}
		}
		.step2{
			position:absolute;
			top:0;
			left:200px;
			background-color:#fff;
			width:490px;
			min-height:420px;
			overflow:hidden;
      font-size:12px;
      color:#333333;
			>div{
				width:490px;
				overflow:hidden;
				>span{
					width:118px;
					height:40px;
					line-height:40px;
					padding-left:30px;
					float:left;
				}
				>ul{
					width:340px;
					overflow:hidden;
					float:left;
					line-height:40px;
					border-bottom:1px solid rgba(200,200,200,.5);
					li{
						float:left;
						margin-right:16px;
					}
				}
			}
			>div:last-child ul{
				border-bottom:0px solid rgba(200,200,200,.5);
			}
		}
	}
</style>
