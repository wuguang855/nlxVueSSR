<template>
	<div class="pagination">
		<div class="content">
			<span v-if="data.current>1" class="btn" @click="last"><<上一页</span>
			<span class="btn num" :class="{current:(data.current==1)}" @click="goto(1)">1</span>
			<span v-if="data.count>1" class="btn num" :class="{current:(data.current==2)}" @click="goto(2)" >2</span>
			<span v-if="data.count>3 && data.current>5" >...</span>
			<span v-if="data.current>=5" class="btn num" @click="goto(data.current-2)" >{{data.current-2}}</span>
			<span v-if="data.current>=4" class="btn num" @click="goto(data.current-1)">{{data.current-1}}</span>
			<span v-if="data.current>=3" class="btn num current">{{data.current}}</span>
			<span v-if="data.count>=data.current+1 && data.current>=2" class="btn num" @click="goto(data.current+1)">{{data.current+1}}</span>
			<span v-if="data.count>=data.current+2" class="btn num" @click="goto(data.current+2)" >{{data.current+2}}</span>
			<span v-if="data.count>=data.current+3 && data.current<=2" class="btn num" @click="goto(data.current+3)">{{data.current+3}}</span>
			<span v-if="data.count>=data.current+4 && data.current<=1" class="btn num" @click="goto(data.current+4)">{{data.current+4}}</span>
			<span v-if="data.count>=data.current+3 && data.count>5" >...</span>
			<span v-if="data.count>=data.current+1" class="btn" @click="next">下一页>></span>
			<span>共{{data.count}}页，到第</span>
			<span class="btn"><input type="text" v-model="inputPage" /></span>
			<span>页</span>
			<span class="btn submit" @click="goto(inputPage)" >确定</span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
export default {
	data(){
		return {
			inputPage:1
		}
	},
	props:{
		pagination:{
			  type:Object,
			  default:function(){
			  	return {
			  		current:1,
			  		count:9,
			  		callback:function(page) {}
			  	};
			  }
		}
	},
	computed:{
		data:function(){
			this.pagination.current = this.pagination.current * 1;
			return this.pagination ;
		}
	},
	methods: {
		last(){
			this.pagination.current = this.pagination.current-1;
			this.pagination.callback(this.pagination.current);
		},
		next(){
			this.pagination.current = this.pagination.current+1;
			this.pagination.callback(this.pagination.current);
		},
		goto(page){
			page = page - 0 || 1;
			if(page>this.pagination.count){
				page = this.pagination.count;
			}
			if(page<1){
				page = 1;
			}
			this.pagination.current = page;
			this.pagination.callback(this.pagination.current);		

		}
	},
	watch: {
        data:{
			handler: function (val, oldVal){},
			deep: true
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.pagination {
	width: 100%;
	height: 72px;
	padding: 20px;
	text-align: center;
	.content{
		height:32px;
		line-height:32px;
		font-size:12px;
		color:#666666;
		text-align:center;
		>span{
			padding:8px;
			border:1px solid rgba(0,0,0,0);
		}
		.btn{
			border:1px solid #dddddd;
			&:not(.num):hover{
				color:#ff9d1e;
			}
			>input{
				width:24px;
				text-align:center;
			}
		}
		.num{
			padding:8px 12px;
		}

		.current{
			background-color:#ff9d1e;
			color:#ffffff;
		}
		.submit{
			border:1px solid #ff9d1e;
			color:#ff9d1e;
		}
	}	
}
</style>