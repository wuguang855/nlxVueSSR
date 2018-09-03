<template>
	<div class="breadcrumbNav-wrap">
		<div class="content">
			<div class="breadcrumbNav">
				<router-link :to="{name:'home'}" class="fl"></router-link>
				<ul class="fl">
					<li v-for="nav in navs"><router-link :to="nav.link">{{nav.title}}</router-link></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {	
  props:{
    navs:{
      type:Array,
      default:[{
      	title:"首页",
      	link:{ name: 'home', params: {},query:{}}
      }]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.breadcrumbNav {
	height: 40px;
	line-height: 40px;
	padding-top: 13px;
	>a {
		display: inline-block;
		width: 14px;
		height: 13px;
		background: url('../../img/icon-home.png') no-repeat;
	}
	ul {
		li {
			font-size: 12px;
			line-height: 16px;
			padding: 0 8px;
			float: left;
			position: relative;
			&:before {
				content: '';
				position: absolute;
				top: 6px;
				right: -3px;
				width: 0;
				height: 0;
				border: 3px solid transparent;
				border-left: 3px solid #666;
			}
			&:hover{
				&:before {
					border-left: 3px solid #e78a2e;
				}
			}
			&:last-child {
				&:before{
					border-left: 3px solid transparent;
				}
			}
			a {
				color: #666;
				&:hover {
					color: #e78a2e;
				}
			}

		}	
	}
}
</style>






