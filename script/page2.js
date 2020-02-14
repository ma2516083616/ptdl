modelResult();
	function modelResult(){
		$.ajax({
			type:'get',
			url:rootUrl+'core/ml/state',
			success:function(data){
				data=JSON.parse(data).data;
				
				if(!data) return ;
				data.map(function(d){
					$("#model2").append("<option title='"+d+"'  value= '"+d+"'>"+d+"</option>")
				});
				
				
				var val=$("#model2").val();
				
			},
			error:function(){
				console.log("page2 model")
			}
			
		});

	}


$("#btn2").click(function(){
    $("#result-pic2").text("");
    var myform=undefined;
    var myform= new FormData()
    var start_time=$("#start_time").val().replace(/-/g,'');
    var end_time=20191212;
    myform.set('file_name', $("#file2")[0].files[0]);
    myform.set("start_time",start_time);
    myform.set("end_time",end_time);
    myform.set("model_name",$("#model2").val());
    $("#2").css("display","block");
    $.ajax({
        type:'post',
        url:rootUrl+'core/tsp',
        async:false,
        data:myform,
        cache: false,
        processData:false,
    			contentType:false,
        beforeSend: function () {
            console.log('正在进行，请稍候')
        },
        success:function(data){
            
            $("#loding2").css("display","none");
            $("#load2").css("display","block");
            console.log(JSON.parse(data))
            datas=JSON.parse(data).data;
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
            console.log(datas);
            
            var train =[];test=[];epoch=[],epochs=[]
            datas.forEach(function(d){
                for(var i =0 ;i<d.length;i++){
                    if(i==1){
                        train.push(d[i]);
                    }else if(i==2){
                        test.push(d[i]);
                    }else{
                        epochs.push(d[i])
                    }
                    
                    
                }
            });
            
            epochs.forEach(function(s){
                s=s.toString()
                
                epoch.push(s.substr(0,4)+'-'+s.substr(4,2)+'-'+s.substr(6,2))
            });
            $("#result-pic2").removeAttr("_echarts_instance_").empty();
            var myChart2 =undefined;
                myChart2 = echarts.init(document.getElementById('result-pic2'));
                var symbolsize
                if(train.length==1||test.length==1){
                    symbolsize=20
                }else{
                    symbolsize=4
                }
            option = {
                color:['#f99','#4cedd6'],
                title: {
                    text: '预测结果',
                    left: 'center',
                    y:'8%'
                },
                tooltip: {
                    trigger: 'axis',
                    extraCssText:'width:160px;height:50px;',
                    position: 'top',
                    confine:true ,
                    formatter: function(params){
                        return params[0].seriesName+":"+params[0].value+'<br />'+params[1].seriesName+":"+params[1].value
                    },
                },
                legend: {
                    right: '10%',
                    data: ['真实值', '预测值'],
                    y:'15%'
                },
                xAxis: {
                    type: 'category',
                    name: '日期',
                    splitLine: {show: false},
                    data: epoch
                },
                grid: {
                    left: '13%',
                    right: '14%',
                    bottom: '13%',
                    top:'20%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    name: '指标值',
                    min: function(value) {
                        return value.min ;
                    },
                    max: function(value) {
                        return value.max ;
                    }
                },
                series: [
                    {
                        name: '真实值',
                        type: 'line',
                        data: train,
                        symbolSize:symbolsize
                        
                    },
                    {
                        name: '预测值',
                        type: 'line',
                        data: test,
                        symbolSize:symbolsize
                        
                    }
                ]
            };
                myChart2.setOption(option);
                $("#result-pic2").children("div").eq(1).css("display","none")
        },
        error:function(){
            console.log("page2 error");
            $("#loding2").css("display","none");
            $("#result-pic2").text("训练失败")
        }
    })
    
});
	