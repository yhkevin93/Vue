//带返回按键的header
Vue.component('header-back', {
	props: ['title'],
	template: '<header class="mui-bar mui-bar-nav">\
			    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>\
			    <h1 class="mui-title">{{title}}</h1>\
			</header>'
})

//不带返回按键的header
Vue.component('header-none', {
	props: ['title'],
	template: '<header class="mui-bar mui-bar-nav">\
			    <h1 class="mui-title">{{title}}</h1>\
			    <slot></slot>\
			</header>'
})

//滚动区域,以及下拉刷新上拉加载区域
/*
 如果是主区域则加上class='mui-content'即可,如果滚动则需要启动kv.beginScroll,如果是下拉刷新要配置kv.pullRefresh(funtion)
 */
Vue.component('scroll', {
	props: ['title'],
	template: '<div class="mui-scroll-wrapper" id="scroll">\
	<div class = "mui-scroll" >\
	 <slot></slot>\
	</div>\
	</div>\
	'
})