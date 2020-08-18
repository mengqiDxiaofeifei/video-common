var html;	  
		$.ajax({
		         url: "/api/getUser",
				 method: "GET",
				 async: false,
		         success: function (data) {//请求数据并返回结果给success,是一个对象，类似python的字典。回调函数。data只是一个函数的参数，跟上面的data不一样
		             console.log(data.code);
					if(data.code === 200){
						var username = data.data;
						html = "welcome<a class='btn' href='#'>"+username+"</a>"
						+ "<a class='btn' onclick='loginOut()'>退出</a><a class='btn' onclick='goTo(1)'>上传</a>";
					}else {
						html = '<a class="btn" href="login.html">登录</a>'+
		                '<a class="btn" href="signup.html">注册</a><a class="btn" onclick="goTo(2)">上传</a>';
					}
		         }
		}) 
		$("#userLabel").html(html);
		 function loginOut(){
			$.ajax({
			         url: "/api/logout",
					 method: "GET",
					 async: false,
			         success: function (data) {//请求数据并返回结果给success,是一个对象，类似python的字典。回调函数。data只是一个函数的参数，跟上面的data不一样
			             window.location.href ="index.html";
			         }
			}) 
		 }
		 
		 function goTo(num){
			 if(num == 1){
				 window.location.href ="upload.html";
			 }else{
				 window.location.href ="login.html";
			 }
		 }