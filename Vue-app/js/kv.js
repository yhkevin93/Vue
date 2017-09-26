/*!
 * =====================================================
 * 这里封装常用方法
 * =====================================================
 */
/**
 * kv方法封装
 * 2017年8月1日11:00:07
 */
//APP配置参数
app_config = {
	//基础配置
	defaults: {
		mode: 'development', //开发模式：'development',产品模式:'production';
	},
	//网络环境配置
	networkData: {
		ip: 'https://cnodejs.org/api/v1', //网络请求域名地址
		header: {
			'Content-Type': 'application/json',
			'api-key': 'zlbf7ZwLetP=TDP=IC7p0JOE740='
		}
	},
	//页面滚动配置
	scrollConfig: {
		container: '#scroll' //滚动区域id
	},
	//页面样式配置
	pageStyles: {
		popGesture: 'close',
		statusbar: {
			background: '#f7f7f7' //状态栏颜色
		},
		//		scrollIndicator: 'none',
	},
	//地图配置
	map: {
		//坐标：默认成都
		point: {
			lng: 104.06,
			lat: 30.67,
		}
	}
}

/*----------------kv基础（调用mui)----------------*/
var kv = (function(mui) {

	defaults = {
		step: 1, //步奏
	}

	var k = {};

	k.init = function() {
		k.log('当前开发模式:' + app_config.defaults.mode);
	}

	//输出，开发模式会执行输出，产品模式会隐藏输出
	k.log = function(log) {

		if(app_config.defaults.mode == 'development') {
			var pageid = plus.webview.currentWebview().id
			console.log(pageid + ':' + defaults.step + '.' + log);
			defaults.step++;
		}
	}

	return k
}(mui));

/*--------------------网络请求--------------------*/
(function(k, mui) {

	k.ajaxData = function(url, data, way, success, error) {

		var theurl = app_config.networkData.ip + url

		k.log('请求地址:' + theurl)

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
				k.log('链接错误类型：' + type + '链接错误地址：' + app_config.networkData.ip + url)
				mui.toast('网络链接失败，请检查你的网络')
				if(error) {
					error()
				}
			}
		})
	}
	//带header
	k.ajaxDataWithHeader = function(url, newdata, way, success, error) {
		var theurl = url

		k.log('请求地址:' + theurl)

		mui.ajax(theurl, {
			data: newdata,
			dataType: 'json',
			headers: app_config.networkData.header,
			type: way,
			timeout: 10000,
			success: function(data) {
				k.log(url + '请求成功')
				success(data);
			},
			error: function(xhr, type, errorThrown) {
				//	k.log('链接错误类型：' + type + '链接错误地址：' + app_config.networkData.ip + url)
				mui.toast('网络链接失败，请检查你的网络')
				if(error) {
					error()
				}
			}
		})
	}

}(kv, mui));

/*---------------------上拉加载，下拉刷新，滚动区域------------------*/

(function(k, mui) {

	k.beginScroll = function() {
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			indicators: false,
		});
	};

	k.pullRefresh = function(ref) {
		mui.init({
			pullRefresh: {
				container: app_config.scrollConfig.container, //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
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

	};

	k.endRefresh = function() {
		setTimeout(function() {
			mui(app_config.scrollConfig.container).pullRefresh().endPulldownToRefresh();
		}, 250)
	};

}(kv, mui));

/*---------------------------页面管理----------------------------*/
(function(k, mui) {

	k.openWindow = function(url, extras) {
		mui.openWindow({
			url: url,
			id: url,
			extras: extras,
			createNew: true,
			waiting: {
				autoShow: false
			},
			styles: app_config.pageStyles,

		})

		k.log('打开页面：' + url)
	};

	//结合框架的新打开窗口，直接输入id就跳转
	k.newWindow = function(id, extras) {
		var url = '../' + id + '/' + id + '.html';
		mui.openWindow({
			url: url,
			id: url,
			extras: extras,
			createNew: true,
			waiting: {
				autoShow: false
			},
			styles: app_config.pageStyles,

		})
	}

	k.showWaiting = function(text) {
		var showText = text ? text : '等待中...'
		plus.nativeUI.showWaiting(showText, {
			modal: false
		});
	};

	k.closeWaiting = function() {
		plus.nativeUI.closeWaiting()
	};

}(kv, mui));

/*----------------------本地数据存取------------------------------------*/
(function(k) {

	k.setItem = function(key, value) {
		plus.storage.setItem(key, value);
	};

	k.getItem = function(key) {
		return plus.storage.getItem(key)
	};

}(kv));

/*----------------------跨页自定义事件触发---------------------------------*/
(function(k, m) {

	k.fire = function(detailPageId, eventName, extra) {

		var detailPage = plus.webview.getWebviewById(detailPageId)

		k.log('给' + detailPageId + '绑定' + eventName + '事件')

		m.fire(detailPage, eventName, extra);
	};

	k.addEvent = function(eventName, cb) {
		window.addEventListener(eventName, function(event) {
			cb(event.detail)
		});
	};

}(kv, mui));

/*------------------------地图类---------------------------------*/
(function(k, m) {
	k.setMap = function(id, mapPoint) {
		var mapExa = new plus.maps.Map(id);

		if(!mapPoint) {
			k.log('没有坐标，默认成都');
			mapExa.centerAndZoom(new plus.maps.Point(app_config.map.point.lng, app_config.map.point.lat), 14);
		} else {
			k.log('地图定位为用户当前位置');
			mapExa.centerAndZoom(mapPoint, 14);

		}

		return mapExa;
	};

	/*
	 data:传入的数组数据，
	 map:地图对象
	 cb(current,marker):回调方法，current：当前数据对象，marker：当前标签对象
	 click:标签按键方法
	 * */
	/**
	 * mui fixed classList
	 * @data {type} document
	 * @map {undefined}
	 */
	k.addMapMarker = function(data, map, cb, click) {
		for(id in data) {
			var current = data[id];
			var marker = new plus.maps.Marker(new plus.maps.Point(current.location.lon, current.location.lat));
			cb(current, marker);
			marker.onclick = click;
			marker.setLabel(current.title);
			//current是自己添加我属性，用于添加额外想要的数据
			marker.current = current;
			map.addOverlay(marker);
		}
	};
}(kv, mui));

/*----------------------------------通讯类----------------------------------------------*/

(function(k, m) {
	k.call = function(phoneNumber) {
		k.log('拨打:' + phoneNumber);
		plus.device.dial(phoneNumber, true);
	};
}(kv, mui));

/*---------------------------------支付类----------------------------------------------*/

(function(k, m) {
	//支付初始化，生成订单渠道
	k.getChannels = function(channels) {

		plus.payment.getChannels(function(s) {
			channels(s);
		}, function(e) {
			alert("获取支付通道列表失败：" + e.message);
		});

	};

	//支付
	k.pay = function(channel, detail, paysuccess, payfail) {
		plus.payment.request(channel, detail, function() {
			paysuccess()
		}, function() {
			payfail()
		});
	};
}(kv, mui));