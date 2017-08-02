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