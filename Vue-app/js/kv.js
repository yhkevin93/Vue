/*!
 * =====================================================
 * 这里封装常用方法
 * =====================================================
 */
/**
 * kv方法封装
 * 2017年8月1日11:00:07
 */

/*----------------kv基础（调用mui)----------------*/
var kv = (function(mui) {

	defaults = {
		mode: 'development', //开发模式：'development',产品模式:'production';
		step: 1, //步奏
	}

	var k = {};

	k.init = function() {
		k.log('当前开发模式:' + defaults.mode);
	}

	//输出，开发模式会执行输出，产品模式会隐藏输出
	k.log = function(log) {
		var pageid = plus.webview.currentWebview().id
		if(defaults.mode == 'development') {
			console.log(pageid + ':' + defaults.step + '.' + log);
			defaults.step++;
		}
	}

	return k
}(mui));

/*--------------------网络请求--------------------*/
(function(k, mui) {

	networkData = {
		ip: 'https://cnodejs.org/api/v1',
	}

	k.ajaxData = function(data, url, way, success, error) {
		
		var theurl = networkData.ip + url
		
		mui.ajax(theurl, {
			data: data,
			dataType: 'json',
			type: way,
			timeout: 10000,
			success: function(data) {
				k.log(url + '请求成功')
				success(data);
			},
			error: function(xhr, type, errorThrown) {
				k.log('链接错误类型：' + type + '链接错误地址：' + ip + url)
				mui.toast('网络链接失败，请检查你的网络')
				if(error) {
					error()
				}
			}
		})
	}
}(kv, mui));

/*---------------------上拉加载，下拉刷新------------------*/

(function(k, mui) {

	k.pullRefresh = function(ref) {
		mui.init({
			pullRefresh: {
				container: "#App", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
				down: {
					height: 50, //可选,默认50.触发下拉刷新拖动距离,
					auto: true, //可选,默认false.首次加载自动下拉刷新一次
					contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
					contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
					contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
					callback: ref //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
				}
			}
		});

	}

	k.endRefresh = function() {
		setTimeout(function() {
			mui('#App').pullRefresh().endPulldownToRefresh();
		}, 250)
	}

}(kv, mui));

/*---------------------------页面管理----------------------------*/
(function(k, mui) {
	styles = {
		popGesture: 'close',
		statusbar: {
			background: '#f7f7f7'
		},
		scrollIndicator: 'none',
	}

	k.openWindow = function(url, extras) {
		mui.openWindow({
			url: url,
			id: url,
			extras: extras,
			createNew: true,
			waiting: {
				autoShow: false
			},
			styles: styles,

		})
		
		k.log('打开页面：'+url)
	}

}(kv, mui))