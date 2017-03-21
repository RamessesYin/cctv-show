/*
 * Created by Ramesses on 2016/10/1.
 */
define(['app', 'service/service','service/HighchartsService','service/word','directive/navMenu','prettify'], function (app) {
    app.controller('LineController', function ($scope,$window,StockChartService,Word,RESTClient,Auth) {
        log("init the page is");
        log($window.localStorage["page"]);
              if ($window.localStorage["page"]!='line')
       {
        $window.localStorage["page"]='line';
        log("then");
        log($window.localStorage["page"]);
        location.reload();
       }

         $scope.options=["总收视人数","总收视时长","人均收视时长","到达率","收视率","观众忠实度"];
         $scope.index=["0","1","2","5","6","7"]
         $scope.intervals=["按天", "按小时"];
         $scope.selectOption=$scope.options[0];
         $scope.selectInterval=$scope.intervals[0];

    //      var getRangePrompt=function(id)
    // {
    //   RESTClient.getResource('http://202.120.39.166:6888/v1.0/summary').then(function(data){
    //     console.log(data);
    //     $scope.dataRange=data.time_range;
    //     $scope.dataNum=data.count;
    //     $scope.boxNum=data.user;


    //     var reg=new RegExp("-","g");
    //     limitStart=new Date($scope.dataRange.substr(0,10).replace(reg,','));
    //     limitEnd=new Date($scope.dataRange.substr(-19,10).replace(reg,','));
    //     log("起");

    //     var thirty_start=new Date(limitEnd.getTime() - 30*24*60*60*1000);

    //     var start=(limitStart<thirty_start)?thirty_start:limitStart;
        

    //   $scope.start_=limitStart;
    //   $scope.end_=limitEnd;

    //     $scope.limitStart='2016-09-01';
    //     $scope.limitEnd='2016-09-18';

    //     if($window.localStorage["start"])$scope.limitStart=$window.localStorage["start"];
    //     if($window.localStorage["end"])$scope.limitEnd=$window.localStorage["end"];

    //     $("#start_time").val($scope.limitStart);
    //     $("#end_time").val($scope.limitEnd);
    //     console.log(limitStart);
    //     console.log(limitEnd);

    //   });
    // }


    // getRangePrompt();

    Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
    }




        var data;
        var dataForStock=[];
        $scope.filterData={
            start_time:'20160901',
            end_time:'20160930',
            type:0,
            option:0
        };


        




        $scope.updateOption=function()
        {
            $scope.filterData.option=$scope.index[$scope.options.indexOf($scope.selectOption)];
                       $scope.update();

        };

        $scope.updateInterval=function()
        {
            $scope.filterData.type=$scope.intervals.indexOf($scope.selectInterval);
            
            $scope.update();

        };



         var addSpline=function (word)
        {
            log("call the add fun");
            log(word);
            for(var i=0;i<data.id.length;i++)
            {
                if(word.id == data.id[i])
                {
                    console.log("success to get the word info");
                    console.log(dataForStock[i]);
                    StockChartService.addSeries(word,dataForStock[i]);
                    break;
                }
            }
        };

        var removeSpline=function (word)

        {
            console.log("call the rm fun");
            console.log(word);
            StockChartService.removeSeries(word);
        };

        // $scope.add = function () {
        //     removeSpline({id:7});
        // }

        var formatTime = function(time)
        {
            time =  String(time);
            var tmp = time.substr(0,4)+'-'+time.substr(4,2)+'-'+time.substr(6,2);
            // var d = new Date();
            // d.setFullYear(time.substr(0,4));
            // d.setMonth(parseInt(time.substr(4,2))-1);
            // d.setDate(time.substr(6,2));
            if(time.length == 10)
            {
                tmp += ' '+time.substr(8,2);
                //d.setHours(time.substr(8,10));
            }
            else
            {
                tmp+=' '+'00';
            }
            tmp += ':00:00';
            var d = new Date(tmp);
            var t = d.getTime();
            //t = parseInt(t/1000) * 1000;
            return t;
        };


        //重画图像
        $scope.update=function ()
        {


            log($scope.filterData);
            RESTClient.getResource('http://202.120.39.166:6888/v1.0/data/'
                +$scope.filterData.option+'/'
                +$scope.filterData.type+'/'
                +$scope.filterData.start_time+'/'
                +$scope.filterData.end_time+'/50')
                .then(function (res)
                {
                    data=res;

                    var date = [];
                    for(var i = 0;i<res.date.length;i++)
                    {
                        date.push(formatTime(res.date[i]));
                    }
                    for(var i=0;i<res.id.length;i++)
                    {
                        var d=[];
                        for(var j=0;j<res.date.length;j++)
                        {

                            d.push([date[j],res.specific_value[i][j]]);
                        }

                        dataForStock.push(d);
                    }
                    log("finish init ,strat to draw");
                    Word.init(res,addSpline,removeSpline);
                    StockChartService.init();
                });
        };

       

        // var filter=function ()
        // {
        //     var curData = Words.curWords();
        //     var maxY=0,minY=9999;
        //     for(var i=0;i<curData.length;i++)
        //     {
        //         var max = Math.max.apply(null, data.specific_value[curData.index]);
        //         var min = Math.min.apply(null, data.specific_value[curData.index]);
        //         if(max>maxY) maxY=max;
        //         if(min<minY) minY=min;
        //     }

        // };
       




        $(function() {
    $('input[name="daterange"]').daterangepicker({
    "startDate": "09/01/2016",
    "endDate": "09/30/2016",
    "minDate": "09/01/2016",
    "maxDate": "09/30/2016",
}, function(start, end, label) {
  var e = end.format('YYYYMMDD');
  var s=start.format('YYYYMMDD');
  $scope.filterData.end_time=e;
  $scope.filterData.start_time=s;
  $scope.update();
  
});
    });


        $scope.update();


        StockChartService.init();


 

     console.log("home!!!");

    });
}); 


//http://202.120.39.166:6888/v1.0/programhot/1/D?username=root&password=123456