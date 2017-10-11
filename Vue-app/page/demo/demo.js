var found = new Vue({
	el: '#App',
	data: {
		title: '常用样式demo',
		pic_lis:[{
			src:'../../img/icon_my_on@3x.png',
			title:'个人设置'
		}],
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