 var currentWebview;

 var App = new Vue({
 	el: '#App',
 	data: {
 		title: '首页',
 		activeTab: 'index',
 		styles: {
 			top: '45px',
 			bottom: '51px',
 			background:'transparent'
 		},
 		tabBar: [{
 			"active": 'mui-active mui-tab-item',
 			"id": "index",
 			"icon": "mui-icon mui-icon-home",
 			"title": "首页"
 		}, {
 			"id": "found",
 			"icon": "mui-icon mui-icon-location",
 			"title": "发现"
 		}, {
 			"id": "my",
 			"icon": "mui-icon mui-icon-person",
 			"title": "我的"
 		}]
 	},
 	methods: {
 		//页面跳转
 		changeView: function changeView(targetTab, title) {
 			
 			if(targetTab == App.activeTab) return;
 			App.createView(targetTab);
 			plus.webview.hide(App.activeTab);
 			App.title = title;
 			App.activeTab = targetTab;
 			kv.log('跳转页面到:' + title)
 		},
 		//创建页面
 		createView: function(targetTab) {
 			targetUrl = '../' + targetTab + '/' + targetTab + '.html';
 			var targetWebview = plus.webview.getWebviewById(targetTab);
 			if(!targetWebview) {
 				targetWebview = plus.webview.create(targetUrl, targetTab, this.styles);
 				currentWebview.append(targetWebview);
 			}
 			targetWebview.show("none", 300);
 		}
 	},
 	mounted: function() {
 	  kv.init()

 		mui.plusReady(function() {
 			currentWebview = plus.webview.getLaunchWebview();
 			App.createView(App.activeTab)
 		})

 	},

 })