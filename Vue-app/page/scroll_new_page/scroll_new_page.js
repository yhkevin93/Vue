var found = new Vue({
	el: '#App',
	data: {
		title: '滚动页面',
		articles: []
	},
	computed: {
		//计算属性,返回计算后的值;
	},
	watch: {
		//观察属性，根据data改变做出相应的方法
	},
	mounted: function() {
		//开启页面滚动
		mui.plusReady(function() {

			kv.beginScroll()

		})

	},
	methods: {

	}
})