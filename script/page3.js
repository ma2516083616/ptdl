       
		
		var file_name=""
		var files_na=''
		$("#file3").change(function(){
			if($("#file3").val()!=''){
				event.preventDefault();
				digResult($(this)[0].files[0])
			}
			$("#load_img").css("display","none")
		})

		
		function digResult(file_name){
			saveModel2();
			function saveModel2(){
				$("#save_model3").click(function(){
                    console.log($("#input_size3").val());
                    console.log($("#max_depth3").val())
					var params;
					params=file_name.name+'_'+$("#input_size3").val()+'_'+$("#max_depth3").val()+'_'+$("#train_num3").val();
					window.open('http://106.54.23.150:8083/dvaProject/core/export/'+params)
					
				})
			}
			$("#btn3").click(function(){
                var formData= undefined;
            var formData= new FormData();
                $("#loding3").css("display","block");
                console.log($("#loding3").css("display"))
				formData.append('file_name', $("#file3")[0].files[0]);
				formData.append("max_depth",$("#max_depth3").val());
				formData.append("num_class",$("#input_size3").val());
				formData.append("num_round",$("#train_num3").val());
               
				
				$.ajax({
					type:'post',
					url:rootUrl+'core/fdp/udf',
					data:formData,
					async:false,
					cache: false,
					processData:false,
	    			contentType:false,
					beforeSend: function () {
						console.log('正在进行，请稍候')
					},
					success:function(data){
						$("#loding3").css("display","none");
					    $("#load3").css("display","block");
						var datas=JSON.parse(data).data;
						var rps=JSON.parse(data)
						console.log(rps)
						
						var ht=''
						ht='';
						if(ht==''){
							$("#Population-list-1 tbody").empty();
								ht='<tr>'+
									'<td>'+ rps.columns[0] +'</td>'+
									'<td>'+ rps.columns[1]+'</td>'+
									'<td>'+ rps.columns[2]+'</td>'+
								'</tr>';
								$("#Population-list-1 tbody").append(ht)
							}
						datas.forEach(function(d){
								ht==''
								ht='<tr>'+
									'<td>'+ d[0] +'</td>'+
									'<td>'+ d[1]+'</td>'+
									'<td>'+ d[2]+'</td>'+
								'</tr>';
							
							$("#Population-list-1 tbody").append(ht)
						})
						
						
						var train =[];test=[];epoch=[],
						datas.forEach(function(d){
							for(var i =0 ;i<d.length;i++){
								if(i==1){
									train.push(d[i]);
								}else if(i==2){
									test.push(d[i]);
								}else{
									epoch.push(d[i])
								}
								
								
							}
						});
						
						$("#result-pic3").removeAttr("_echarts_instance_").empty();
						var myChart3 = echarts.init(document.getElementById('result-pic3'));
						option = {
							color:['#f99','#3bb784'],
							title: {
								text: '模型迭代误差',
								left: 'center',
								y:'8%'
							},
							tooltip: {
								trigger: 'axis',
								position: 'top',
								extraCssText:'width:160px;height:50px;',
								confine:true ,
								formatter: function(params){
									
									return params[0].seriesName+':'+params[0].value+ '<br/>'+params[1].seriesName+':'+params[1].value
								},
							},
								legend: {
									right: '10%',
									data: ['训练误差', '测试误差'],
									y:'15%'
								},
								xAxis: {
									type: 'category',
									name: '迭代次数',
									splitLine: {show: false},
									data: epoch
								},
								grid: {
									left: '5%',
									right: '14%',
									bottom: '13%',
									top:'20%',
									containLabel: true
								},
								yAxis: {
									type: 'value',
									name: '误差',
									min: function(value) {
									    return value.min ;
									},
									max: function(value) {
									    return value.max ;
									}
								},
								series: [
									{
										name: '训练误差',
										type: 'line',
										data: train
									},
									{
										name: '测试误差',
										type: 'line',
										data: test
									}
								]
							};
						myChart3.setOption(option);
						$("#result-pic3").children("div").eq(1).css("display","none")
					},
					error:function(){
						console.log("page3 error");
						$("#loding3").css("display","none");
						$("#result-pic3").text("训练失败")
					}
				})
				
			})
		}