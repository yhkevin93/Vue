var found = new Vue({
	el: '#App',
	data: {
		title: '滚动页面',
		articles: []
	},
	mounted: function() {
		//开启页面滚动
		kv.beginScroll()
	},
	created: function() {

	},
	methods: {

	}
})