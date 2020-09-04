//登录
function toLogin(){
		$.ajax({
				method: "post",
				data: $("#loginForm").serialize(),//jq提供的获取form表单数据的快捷方式，通过form内标签的name属性{"username":"admin","passwd":"123456"}
				url: "/api/login",
				success: function (data) {//请求数据并返回结果给success,是一个对象，类似python的字典。回调函数。data只是一个函数的参数，跟上面的data不一样
					console.log(data);
					if(data.code === 200){
						//登录成功
						window.location.href ="index.html";
					}else if(data.code === 2003){
						alert("密码错误")
					}else if(data.code === 2004){
						alert("密码过期")
					}else if(data.code === 2005){
						alert("账号不可用")
					}else if(data.code === 2006){
						alert("账号被锁定")
					}else if(data.code === 2007){
						alert("账号不存在")
					}
				}
	   })
}
		
var countdown = 60;
//校验验证码
var regex = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
function checkPhone() {
			 var flag = false;
	if (document.getElementById("phone").value != '') {
		if (!document.getElementById("phone").value.match(regex)) {
		   alert("请输入正确的手机号!")
			flag = false;
		} else {
					 $.ajaxSetup({
						 async: false
					 });
					 $.get("/api/checkPhone?phone="+$("#phone").val(), function (data) {
						 if (data.code === 200 && data.data == true) {
							 flag = true;
						 } else {
							 alert("该手机号已被注册!")
							 flag = false;
						 }
					 });
		}
	} else {
				  flag = false;
		alert("请输入手机号!")
	}
	return flag;
}
function checkCode() {
	 var sign = false;
	 var inputCode = document.getElementById("code").value.toUpperCase(); //取得输入的验证码并转化为大写
	 if (inputCode.length <= 0) { //若输入的验证码长度为0
		 return false;
	 }
	 $.ajaxSetup({
		 async: false
	 });
	 $.get("/api/checkSmsCode?code=" + inputCode+"&phone="+$("#phone").val(), function (data) {
		 if (data.code === 200 && data.data == true) {
			 sign = true;
		 } else {
			 sign = false;
			 document.getElementById("code").value = "";
		 }
	 });
	 return sign;
}    
							  
function sendSmsBtn(obj) {
	   if (checkPhone()) {
		 obj = $(obj);
		 $.ajax({
			 url: "/api/sendCode",
			 contentType: "application/json",
			 type: "get",
			 dataType: "json",
			 async: false,
			 data: {
				 "mobile": $("#phone").val(),
			 },
			 success: function (data, status) {
				 if (data.code === 200) {
					alert("发送成功")
				 }
			 }
		 })
		 settime(obj);
	 }
 }
 //验证码
 function settime(obj) { //发送验证码倒计时
	 if (countdown === 0) {
		 obj.attr('disabled', false);
		 //obj.removeattr("disabled");
		 obj.text("发送验证码");
		 countdown = 60;
		 return;
	 } else {
		 obj.attr('disabled', true);
		 obj.text("重新发送(" + countdown + ")");
		 countdown--;
	 }
	 setTimeout(function () {
			 settime(obj)
		 }
		 , 1000)
 }
//注册
 function register(){
	  if(checkCode()){
		  $.ajax({
				  method: "post",
				  data: $("#registerForm").serialize(),//jq提供的获取form表单数据的快捷方式，通过form内标签的name属性{"username":"admin","passwd":"123456"}
				  url: "/api/register",
				  success: function (data) {//请求数据并返回结果给success,是一个对象，类似python的字典。回调函数。data只是一个函数的参数，跟上面的data不一样
					  console.log(data);
					if(data.code === 200){
						//注册成功
						var msg = "恭喜您,注册成功,是否去登录";
						if (confirm(msg)==true){ 
						  window.location.href ="login.html";
						}else{ 
						  window.location.href ="index.html";
						} 
					}else{
						alert(data.message)
					}
			}
		})
	  }else{
		  $("#code").val("");
		  alert("短信验证码有误或者已过期")
		 
	  }
 }
function del() { 
 var msg = "恭喜您,注册成功,是否去登录"; 
 if (confirm(msg)==true){ 
  return true; 
 }else{ 
  return false; 
 } 
} 