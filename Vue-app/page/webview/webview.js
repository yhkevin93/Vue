  var App = new Vue({
  	el: '#App',
  	data: {
  		title: '首页',
  		activeTab: 'new_page',
  		style: {
  			top: '0px',
  			bottom: '51px',
  		},
  		tabBar: [{
  				active: 'mui-active mui-tab-item',
  				id: "new_page",
  				icon: "mui-icon mui-icon-paperplane",
  				title: "静态页面",
  				style: { //预留一个，如果顶部通透真机打包状态栏还是不和标题栏一个颜色，则还是每个页面分开别style，单独设置状态栏颜色
  					top: '0px',
  					bottom: '51px',
  					statusbar: {
  						background: '#f7f7f7'
  					},
  				},
  			},
  			{
  				"id": "scroll_new_page",
  				"icon": "mui-icon mui-icon-spinner mui-spin",
  				"title": "滚动页面"
  			},
  			{
  				"id": "refresh_new_page",
  				"icon": "mui-icon mui-icon-refresh",
  				"title": "下拉刷新"
  			},
  			{
  				"id": "my",
  				"icon": "mui-icon mui-icon-person",
  				"title": "我的"
  			}
  		]
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
  				styles: this.style,
  				waiting: {
  					autoShow: false
  				},
  			})

  			kv.log('打开页面:' + title)

  		}
  	},
  	mounted: function() {

  		mui.plusReady(function() {
  			kv.init()

  			if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
  				// 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
  				//			this.style.top = plus.navigator.getStatusbarHeight();
  			}

  			var url = '../' + App.activeTab + '/' + App.activeTab + '.html'

  			//载入首页
  			mui.openWindow({
  				url: url,
  				id: App.activeTab,
  				show: {
  					aniShow: 'none',
  				},
  				styles: App.style,
  				waiting: {
  					autoShow: false
  				},
  			})
  		})

  	},

  })