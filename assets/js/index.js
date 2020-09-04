var html;
var createVideo;	  
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
		$.ajax({
		         url: "/api/vi/video",
				 method: "GET",
				 async: false,
		         success: function (resp) {//请求数据并返回结果给success,是一个对象，类似python的字典。回调函数。data只是一个函数的参数，跟上面的data不一样
		             console.log(resp.data.records);
					if(resp.code === 200){
						var list = resp.data.records;
								$.each(list,function(i,item){
								
								createVideo +=   " <div class=\"col-md-3 col-sm-4 col-xs-6\"><div class=\"video-item\">\n" +
								"                            <div class=\"thumb-wrap\">\n" +
								"                                <img src='"+item.image+"' alt=\"Movie Thumb\">\n" +
								"                                <span class=\"rating\">9.2</span>\n" +
								"                                <div class=\"thumb-hover\">\n" +
								"                                    <a class=\"play-video\" href=\"https://www.youtube.com/watch?v=5cY5PHE4x_g\"><i class=\"fa fa-play\"></i></a>\n" +
								"                                </div>\n" +
								"                            </div>\n" +
								"                            <div class=\"video-details\">\n" +
								"                                <h4 class=\"video-title\"><a href=\"movie-detail.html\">'"+item.title+"'</a></h4>\n" +
								"                                <p class=\"video-release-on\">'"+item.uploadTime+"'</p>\n" +
								"                            </div>\n" +
								"                        </div></div>";
								
								$("#video-carousel").html(createVideo); 
								
									}); 
							}
		     }
		}) 
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
//最新视频
		
	