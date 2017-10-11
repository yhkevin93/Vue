var found = new Vue({
	el: '#App',
	data: {
		title: '下拉刷新',
		articles: []
	},
	computed: {
		//计算属性,返回计算后的值;
	},
	watch: {
		//观察属性，根据data改变做出相应的方法
	},
	mounted: function() {
		//开始下拉刷新（刷新方法）
			kv.pullRefresh(this.get_news)
	},
	created: function() {

	},
	methods: {
		
		//下拉刷新事件(获取数据)
		get_news: function() {
			kv.ajaxData({

			}, '/topics', 'GET', function(data) {

				found.articles = data.data

				kv.endRefresh()
			})
		},
		go_article: function(id) {
			kv.openWindow('article/article.html', {
				articleid: id
			})
		},
		//打开窗口，直接填写目标地址id名就好
		openWindow: function(id) {
			kv.newWindow(id);
		}
		
	}
})