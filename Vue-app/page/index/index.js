var index = new Vue({
	el: '#App',
	data: {
		articles: [],
		name:'颜浩'
	},

	methods: {
		check: function() {
			index.name != "颜浩" ?index.name = '颜浩':index.name = '其他'
		}
	},
	mounted: function() {
        kv.beginScroll()
	},
	created: function() {

	},
})