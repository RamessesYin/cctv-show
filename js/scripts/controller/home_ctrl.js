/*
 * Created by Ramesses on 2016/10/1.
 */
define(['app', 'service/service','service/HighchartsService','service/word','directive/navMenu','prettify'], function (app) {
    app.controller('HomeController', function ($scope,$window,StockChartService,Word,RESTClient,Auth) {
      
       if ($window.localStorage["page"]!='home')
       {
        $window.localStorage["page"]='home';
        location.reload();
       }
        var data;
        var dataForStock=[];
        $scope.filterData={
            start_time:'20160901',
            end_time:'20160930',
            type:0,
            option:0
        };
    RESTClient.getResource('http://202.120.39.166:6888/v1.0/programhot/1/D')
           .then(function(data){
            $scope.count=data.count;
            $scope.id=data.id;
            $scope.program_name=data.program_name;
            $scope.rank=data.rank;


            var tmp=[];
            for(var i=0;i<10;i++)
            {

              var item={
                name:$scope.program_name[i],
                index:i+1
              }
              tmp.push(item);
            }
            $scope.hotlist=tmp;

           });

                        RESTClient.getResource('http://202.120.39.166:6888/v1.0/summary')
           .then(function(data){
            $scope.counts=data.count;
            $scope.time_ranges=data.time_range;
            $scope.users=data.user;
              });
         var addSpline=function (word)
        {
            for(var i=0;i<data.id.length;i++)
            {
                if(word.id == data.id[i])
                {
                    StockChartService.addSeries(word,dataForStock[i]);
                    break;
                }
            }
        };

        var removeSpline=function (word)
        {
            StockChartService.removeSeries(word);
        };

        $scope.add = function () {
            removeSpline({id:7});
        }

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
                    Word.init(res,addSpline,removeSpline);
                });
        };

       

        var filter=function ()
        {
            var curData = Words.curWords();
            var maxY=0,minY=9999;
            for(var i=0;i<curData.length;i++)
            {
                var max = Math.max.apply(null, data.specific_value[curData.index]);
                var min = Math.min.apply(null, data.specific_value[curData.index]);
                if(max>maxY) maxY=max;
                if(min<minY) minY=min;
            }

        };


        $scope.update();


        StockChartService.init();


 


    //   $scope.count=null;
    //  $scope.id=null;
    //  $scope.program_name=null;
    //  $scope.rank=null;
    //    console.log("HOME");
    //         var init=function()
    // {
    //     var user = {
    //         username:'root',
    //         password: '123456'
    //     };

    //     Auth.login(user)
    //         .then(function(){
    //             $scope.user = Auth.getUser();
    //             var token=Auth.getToken();
    //             RESTClient.getResource('http://202.120.39.166:6888/v1.0/programhot/1/D')
    //        .then(function(data){
    //          $scope.count=data.count;
    //          $scope.id=data.id;
    //          $scope.program_name=data.program_name;
    //          scope.rank=data.rank;
            

    //        });

    //         }, function(err){
    //             form.$submitted=false;
    //             $scope.loginError=err.error;
    //             console.log("登录失败:"+err);
    //         });
    // }
    // init();

     console.log("home!!!");

    });
}); 


//http://202.120.39.166:6888/v1.0/programhot/1/D?username=root&password=123456