 var App = new Vue({
 	el: '#App',
 	data: {
 		title: '首页',
 		activeTab: 'index',
 		tabBar: [{
 			active: 'mui-active mui-tab-item',
 			id: "index",
 			icon: "mui-icon mui-icon-home",
 			title: "首页",
 			style: {
 				top: '0px',
 				bottom: '51px',
 				titleNView: {
 					'backgroundColor': '#f7f7f7', //导航栏背景色
 					'titleText': '首页', //导航栏标题
 					'titleColor': '#000000', //文字颜色
 					type: 'transparent', //透明渐变样式
 					splitLine: { //底部分割线
 						color: '#cccccc'
 					}
 				}
 			},
 		}, {
 			"id": "found",
 			"icon": "mui-icon mui-icon-location",
 			"title": "发现",
 			style: {
 				top: '0', //mui标题栏默认高度为45px；
 				bottom: '51px', //默认为0px，可不定义；
 				statusbar: {
 					background: '#f7f7f7'
 				},
 			}
 		}, {
 			"id": "my",
 			"icon": "mui-icon mui-icon-person",
 			"title": "我的",
 			style: {
 				top: '0', //mui标题栏默认高度为45px；
 				bottom: '51px', //默认为0px，可不定义；
 				statusbar: {
 					background: '#f7f7f7'
 				},
 			}
 		}]
 	},
 	methods: {
 		//页面跳转
 		changeView: function changeView(targetTab, title, style) {

 			if(targetTab == App.activeTab) return;

 			var url = '../' + targetTab + '/' + targetTab + '.html'

 			var id = targetTab

 			App.title = title;

 			App.activeTab = targetTab;

 			mui.openWindow({
 				url: url,
 				id: id,
 				show: {
 					aniShow: 'none',
 				},
 				styles: style,
 				waiting: {
 					autoShow: false
 				},
 			})

 			kv.log('打开页面:' + title)

 		}
 	},
 	mounted: function() {
 		kv.init()
 	
 		mui.openWindow({
 			url: '../index/index.html',
 			id: 'index',
 			show: {
 				aniShow: 'none',
 			},
 			styles: this.tabBar[0].style,
 			waiting: {
 				autoShow: false
 			},
 		})

 	},

 })