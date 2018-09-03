import axios from 'axios';
import cookie from '../util/cookie.js'
import utils from '../util/index.js'
import config from '../../buildProdConfig.json'


var baseUrl = config.webBasePath;
var api = {};

axios.interceptors.response.use((response) => {

	console.log("axios.interceptors.response",response);
	return response;
});


api.initHeader = function(context) {
	axios.defaults.headers.common['device_id'] = utils.getDeviceId(context);
	axios.defaults.headers.common['platform'] = utils.platform();
	axios.defaults.headers.common['channel_code'] = utils.channel_code();
	var userToken = utils.getCookie(context,"userToken");
	if(userToken){
		axios.defaults.headers.common['token'] = userToken;
	}
};

// 登录启动\

api.login = function() {
	var url = "/api/"
	return axios.get(url);

};

//获取短信验证码
api.getUserSMS = function(data) {
	var url = baseUrl+"/loginApi/user/sms/c";
	return axios.post(url, data);
}

//茶城注册
api.tmAppRegiste = function(data) {
	var url = baseUrl+"/loginApi/user/tmAppRegiste";
	return axios.post(url, data);
}
//短信验证码验证 
api.checkSmsCode = function(data) {
	var url = baseUrl+"/loginApi/user/checkSmsCode";
	return axios.post(url, data);
}
//重置账户密码
api.tmAppResetPwd = function(data) {
	var url = baseUrl+"/loginApi/user/tmAppResetPwd";
	return axios.post(url, data);
}
//根据token获取用户信息
api.getUserInfo = function(data) {
	var url = baseUrl+"/loginApi/user/teaMarketUserInfo";
	return axios.post(url, data);
};

//登录
api.teaMarketLogin = function(data) {
	var url = baseUrl+"/loginApi/login/teaMarketLogin";
	return axios.post(url, data);
};
//获取图片验证码
api.getCodeImg = function() {
	var url = baseUrl+"/loginApi/user/img/c";
	return axios.get(url);
};
//图片验证码验证

api.checkImgCode = function(code) {
	var code = code;
	axios.defaults.headers.common['imgCode'] = code;
	var url = baseUrl+"/loginApi/user/checkImgCode";
	return axios.post(url, {});
};
//获取商品分类树 
api.getGoodsTypeTree = function() {
	var url = baseUrl+"/api/teaMall/getGoodsTypeTree"
	return axios.get(url);
};
//获取茶城首页数据
api.getIndexData = function() {
	var url = baseUrl+"/api/teaMall/getIndexData"
	return axios.get(url);
};
//根据商品三级分类以及品牌获取商品列表
//?page=1&pageSize=10&thirdType=17&brand=13，
//thirdType是商品三级分类的ID，brand是商品品牌ID，如果不传品牌获取的是所有三级分类对应的商品。
api.getGoodsList = function(data) {
	var url = baseUrl+"/api/teaMall/getGoodsList"
	return axios.get(url, {
		params: data
	});
};
//分页获取超值消费商品列表?page=1&pageSize=10
api.getSuperValueGoods = function(data) {
	var url = baseUrl+"/api/teaMall/getSuperValueGoods"
	return axios.get(url, {
		params: data
	});
};
//分页获取星级商品列表（按照星级倒序）?page=1&pageSize=10
api.getStarGoods = function(data) {
	var url = baseUrl+"/api/teaMall/getStarGoods"
	return axios.get(url, {
		params: data
	});
};
//获取商品详情和推荐商品列表 ?goodsId=21&goodsTypeId=17，goodsId是商品的ID，goodsTypeId是商品所属的三级分类的ID
api.getGoodsDetail = function(data) {
	var url = baseUrl+"/api/teaMall/getGoodsDetail"
	return axios.get(url, {
		params: data
	});
};
//分页获取资讯列表 ?page=1&pageSize=10
api.getNewsList = function(data) {
	var url = baseUrl+"/api/teaMall/getNewsList"
	return axios.get(url, {
		params: data
	});
};
//根据资讯ID和资讯类型获取资讯详情 ?newsId=221&newsType=HYXW
api.getNewsDetail = function(data) {
	var url = baseUrl+"/api/teaMall/getNewsDetail"
	return axios.get(url, {
		params: data
	});
};
//根据中心动态和公告
api.getDynamicNotification = function(data) {
	var url = baseUrl+"/api/teaMall/getDynamicNotification"
	return axios.get(url, {
		params: data
	});
};

//获取搜索内容 teaMall/queryGoods ///?page=1&pageSize=10&query=sdf
api.getQueryGoods = function(data) {
	var url = baseUrl+"/api/teaMall/queryGoods";
	return axios.get(url, {
		params: data
	});
};

export default api;