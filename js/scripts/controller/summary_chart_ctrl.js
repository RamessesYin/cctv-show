/*
 * Created by Ramesses on 2016/10/1.
 */
define(['app', 'service/service','directive/navMenu','prettify','d3'], function (app) {

    app.controller('SummaryChartController', function ($scope,RESTClient) {

        
        console.log("hehe");
        var url_prefix = " http://202.120.39.166:6888/v1.0/info/"

        $scope.itemName = {accumulation: "accumulation", active: "active", count: "count", new: "new"};

        
        $scope.dateData = new Date("2016/09/10");
        $scope.updateData = function () {
            var pad = function pad(num, size) {
                var s = num+"";
                while (s.length < size) s = "0" + s;
                return s;
            };
            var parseDate = function parseDate(date) {
                var day = pad(date.getDate(),2);
                var month = pad(date.getMonth()+1,2);
                var year = date.getFullYear();
                return year+month+day;
            };
            var url_suffix = parseDate($scope.dateData);
            
            $scope.headText = "用户";
            var url = url_prefix + url_suffix;

            RESTClient.getResource(url)
                .then(function(data){

                    console.log(data);
                    $scope.summaryData = data;

                });


        };
        
        $scope.updateData();


    });
}); 


//http://202.120.39.166:6888/v1.0/programhot/1/D?username=root&password=123456