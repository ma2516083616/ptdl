var rootUrl='http://106.54.23.150:8083/dvaProject/'
//var rootUrl='http://192.168.31.187:8083/dvaProject/'

// $(document).ready(function(){
// 	var username=window.sessionStorage.getItem(username)
// function test(){
// 	if(username==null){
// 		window.location.href='login.html' 
// 	}
// }
// })


//setInterval(test,1000)

$(".cover1").click(function(){
	$(".cover1").css("display","none")
	$("table").css("display","none")
	
});
$(".cover2").click(function(){
	$(".cover2").css("display","none")
	$("table").css("display","none")
	
})
$(".cover3").click(function(){
	$(".cover3").css("display","none")
	$("table").css("display","none")
	
})
$(".cover4").click(function(){
	$(".cover4").css("display","none")
	$("table").css("display","none")
	
})
$("#load,#load2,#load3,#load4").click(function(){
	$(this).parent().next().next().find('caption').empty();
	//$('#Population-list-1').find('caption').empty();
	$(this).parent().next().next().find('caption').children("button").attr('data-fileblob','');
	//$('#Population-list-1').find('caption').children("button").attr('data-fileblob','');
	$(this).parent().next().css("display","block");
	//$(".cover").css("display","block");
	$(this).parent().next().next().css("display","block");
	//$("#Population-list-1").css("display","block");
	$(this).parent().next().next().find("tbody").css("display","none");
	//$("#Population-list-1").find("tbody").css("display","none");
	$(this).parent().next().next().tableExport({formats:["xlsx","xls","csv","txt"]});	
	//$("#Population-list-1").tableExport({formats:["xlsx","xls","csv","txt"]});	
})
$("#log_out").click(function(){
	console.log("dddd");
	window.sessionStorage.clear();
	window.localStorage.clear();
	window.location.href='login.html'

})



//$(function(){
	var times=1000*60*3;
	var testtime=1000*60*10;
	console.log(testtime)
	var username =window.sessionStorage.getItem("timestamp");
	var username_local=window.localStorage.getItem("timestamp");
	var name_ses=undefined;
	var name_ses=window.sessionStorage.getItem("username");
	var name_loc=undefined;
	var name_loc=window.localStorage.getItem("username");
	var now_timetemp=new Date().getTime();

	
	
	if(username==null&&username_local==null){
		window.location.href='login.html'
	}
	if(username!=null&&now_timetemp>(username*1+testtime*1)){
		window.sessionStorage.clear();
		window.localStorage.clear();
		window.location.href='login.html'

	}else{
		var ddd=$("#logout").text();
		if(name_ses!=null){
			$("#logout").text(name_ses);
		}else{
			$("#logout").text(name_loc);
		}
		
	}
	if(username_local!=null&&now_timetemp>(username_local*1+testtime*1)){
		window.sessionStorage.clear();
		window.localStorage.clear();
		window.location.href='login.html'
	}else{
		if(name_ses!=null){
			$("#logout").text(name_ses);
		}else{
			$("#logout").text(name_loc);
		}
	}
	



$(".nav li").click(function(){
	var ind=$(this).index();
	console.log(ind);
	$(".nav li").eq(ind).addClass("active").siblings().removeClass('active');
	$(".container").children('div').eq(ind).addClass("active").siblings().removeClass('active');
	
})