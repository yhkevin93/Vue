var my = new Vue({
	el: '#App',
	data: {
		title:'我的',
		user:{
			loginname:'请登录',
			githubUsername:'',
			avatar_url:'../../img/logo.jpg',
		}
	},

	mounted: function() {

		kv.ajaxData({},'/user/yhkevin93','GET',function(data){
			my.user = data.data
		})

	},
	methods:{
		
	}
})