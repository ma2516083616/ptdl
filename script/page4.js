modelResult();
		
		function modelResult(){
			
			$.ajax({
				type:'get',
				url:rootUrl+'core/ml/diago',
				success:function(data){
					data=JSON.parse(data).data;
					if(!data) return ;
					data.map(function(d){
						$("#select_model").append("<option value= '"+d+"'>"+d+"</option>")
					});
					$("#select_model").on('changed.bs.select',function(){
						var vals=$(this).val();	
					});
				},
				error:function(){
					console.log("page4 model")
				}
				
			});
			
			
			
		};
		
		

			
		diagoForecast();
		function diagoForecast(){
		
			$("#btn4").click(function(){
				var formDatas=undefined;
				var formDatas= new FormData();
				formDatas.append("file_name",$("#file4")[0].files[0])
				formDatas.append("model_name",$("#select_model").val())
				$("#loding4").css("display","block");
				$.ajax({
					type:'post',
					url:rootUrl+'core/fdmt/udf',
					async:false,
					data:formDatas,
					cache: false,
					processData:false,
	    			contentType:false,
					beforeSend: function () {
						console.log('正在进行，请稍候')
					},
					success:function(data){
						$("#loding4").css("display","none");
						$("#load4").css("display","block");
						
						var data=JSON.parse(data);
						
						var inds =data.index;
						var datas=data.data;
						console.log(data);
						var udios=[{index:0,name:"正常"},{index:1,name:"低能放电"},{index:2,name:"高能放电"},{index:3,name:"低能放电兼过热"},
						{index:4,name:"中温过热"},{index:5,name:"局部放电"},{index:6,name:"高温过热"},{index:7,name:"低温过热"},{index:8,name:"高能放电兼过热"}];
						var items=[];
						datas.forEach(function(d){
							var item=[];
							for(var i =0; i<d.length; i++){
								for(var j =0; j<udios.length; j++){
									if(d[i]==udios[j].index){
										item.push(udios[j].name)
									}
								}
							}
							items.push(item)
						})
						console.log(items);
						var xaxis=[]
						udios.forEach(function(d){
							xaxis.push(d.name)
						});
						console.log(xaxis);
						var arrs=[]
						xaxis.forEach(function(d){
							var tesd=[];
							tesd.push(0);
							var s=0
							for(var i =0; i<items.length; i++){
								var tem=[];
								for(var j=0; j<items[i].length;j++){
									tem.push(0);
									if(d==items[i][j]){
										s+=1;
									}
									
									tesd=tem[j]=s;
									
								}
								
							}
							arrs.push(tesd)
						})
						
						var ht=''
						
						if(ht==''){
							$("#Population-list-1 tbody").empty();
							var tr=$('<tr></tr>')
							var td;
							for(var i=0 ; i<data.columns.length; i++){
								if(data.columns.length==1){
									td='<td>'+ data.columns[i] +'</td>'+'<td>数量</td>'
								}else{
									td='<td>'+ data.columns[i] +'</td>'
								}
								tr.append(td)
							}
							$("#Population-list-1 tbody").append(tr)
						}
						for(var j=0; j<xaxis.length; j++){
							ht=$('<tr></tr>');
							var td;
							if(typeof xaxis[0]=='string'){	
								td='<td>'+ xaxis[j] +'</td><td>'+ arrs[j] +'</td>'
								
							}else{
								for(var i =0; i<d.length; i++){
									console.log(d[i])
									td+='<td>'+ d[i] +'</td>'	
								}
								
							}
							ht.append(td)
							$("#Population-list-1 tbody").append(ht)
						}
						
						
						var test=[];xAxis_Data=[],tooltipdata=[];
						
						

						$("#result-pic4").removeAttr("_echarts_instance_").empty();
						var myChart4 = echarts.init(document.getElementById('result-pic4'));
						option = {
							color:['#79ef55'],
							title: {
								left: 'center',
								y:'8%'
							},
							tooltip: {
								trigger: 'axis',
								extraCssText:'width:160px;height:50px;',
							},
							xAxis: {
								type: 'category',
								name:'故障名称',
								data: xaxis
							},
							yAxis: {
								type: 'value',
								name: '故障数量',
								min: function(value) {
								    return value.min ;
								},
								max: function(value) {
								    return value.max ;
								}
							},
							series: [
								{
									name:'value',
									type:'bar',
									
									data:arrs
								}
							]
						};
				
						myChart4.setOption(option);
						$("#result-pic4").children("div").eq(1).css("display","none")
						
					},
					error:function(){
						console.log("page4 error");
						$("#loding4").css("display","none");
						$("#result-pic4").text("训练失败")
					}
				})
				
			})
		}