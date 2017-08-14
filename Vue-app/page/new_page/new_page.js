var new_page = new Vue({
	el: '#App',
	data: {
		//页面属性
		title:'静态页面'
	},
	mounted: function() {
		//生命周期mounted,页面渲染后执行的方法
		mui.plusReady(function() {
			//h5plus准备好时执行的方法
		})

	},
	computed: {
		//计算属性,返回计算后的值;
	},
	watch: {
		//观察属性，根据data改变做出相应的方法
	},
	methods: {
		//页面方法
	},
})