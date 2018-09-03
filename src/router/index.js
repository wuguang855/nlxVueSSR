import Vue from 'vue'
import Router from 'vue-router'
import buildProdConfig from "../../buildProdConfig.json";
Vue.use(Router)
if(process.browser) {
	const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
	Vue.use(VueAwesomeSwiper)
}
//公用页面 tips
const ERR404 = resolve => require(['@views/tip/404.vue'], resolve)
const ERR500 = resolve => require(['@views/tip/500.vue'], resolve)

//页面信息
const index = resolve => require(['@views/Index.vue'], resolve)
const home = resolve => require(['@views/home/Index.vue'], resolve)
//信息资讯
const news = resolve => require(['@views/news/Index.vue'], resolve)
const newsList = resolve => require(['@views/news/NewsList.vue'], resolve)
const newsDetail = resolve => require(['@views/news/NewsDetails.vue'], resolve)
//商品相关
//特殊列表页面（星级茶品、超级消费）fulllist
const fulllist = resolve => require(['@views/list/FullList.vue'], resolve)
//三级分类和品牌对应列表 list
const list = resolve => require(['@views/list/List.vue'], resolve)
//搜索  ==》search
const searchlist = resolve => require(['@views/list/SearchList.vue'], resolve)
//商品详情 product
const product = resolve => require(['@views/productDetails/Product.vue'], resolve)

const login = resolve => require(['@views/login/Index.vue'], resolve)
const user = resolve => require(['@views/login/LoginBackground.vue'], resolve)
const retrievePassword = resolve => require(['@views/login/RetrievePassword.vue'], resolve)
const register = resolve => require(['@views/login/Register.vue'], resolve)

const routes = [{
		path: '/',
		component: index,
		children: [{
				path: '/',
				name: 'home',
				component: home
			},
			{
				path: '/stars',
				name: 'stars',
				component: fulllist
			},
			{
				path: '/bargains',
				name: 'bargains',
				component: fulllist
			},
			{
				path: '/search',
				name: 'search',
				component: searchlist
			},
			{
				path: '/list/:id',
				name: 'list',
				component: list
			},
			{
				path: '/product/:tid/:gid',
				name: 'product',
				component: product
			},
			{
				path: '/news',
				component: news,
				children: [{
						path: '/news/:subSys/:id',
						name: 'newsDetail',
						component: newsDetail
					},
					{
						path: '/news/list',
						name: 'newsList',
						component: newsList
					},
					{
						path: '/',
						redirect: {
							name: "newsList"
						}
					}
				]
			},
			{
				path: '/list/:subsys',
				component: news
			}
		]
	},
	{
		path: '/user',
		component: login,
		children: [{
				path: '/',
				redirect: {
					name: "login"
				}
			},
			{
				path: '/user/login',
				name: 'login',
				component: user
			},
			{
				path: '/user/password',
				name: 'password',
				component: retrievePassword
			},
			{
				path: '/user/register',
				name: 'register',
				component: register
			}
		]
	},
	/*500*/
	{
		path: '/500',
		component: ERR500
	},
	/*404*/
	{
		path: '*',
		component: ERR404
	}
];

export function createRouter() {
	var ROUTER = new Router({
		mode: 'history',
		base: buildProdConfig.webBasePath+'/',
		scrollBehavior: (to, from, savedPosition) => {
			if(savedPosition) {
				return savedPosition
			} else {
				return {
					x: 0,
					y: 0
				}
			}

		},
		routes: routes
	});
	//需要全局处理的事件
	ROUTER.beforeEach((to, from, next) => {
		var isHome = to.name == "home" || to.name == "stars" || to.name == "bargains"
		ROUTER.app.$store.commit('ISHOME', isHome)
		next();
	});
	return ROUTER;
}