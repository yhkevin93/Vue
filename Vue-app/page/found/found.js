var found = new Vue({
	el: '#App',
	data: {
		title:'发现',
		articles: []
	},
	mounted: function() {
		kv.pullRefresh(this.get_news)
	},
	created: function() {

	},
	methods: {
		get_news: function() {
			kv.ajaxData({

			}, '/topics', 'GET', function(data) {

				found.articles = data.data

				kv.endRefresh()
			})
		},
		go_article:function(id){
			kv.openWindow('article/article.html',{
				articleid:id
			})
		}
	}
})