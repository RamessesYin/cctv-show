/*
 * Created by Ramesses on 2016/10/1.
 */
define(function (require) {
    var app = require('app');   
    app.controller('HomeCtrl', ['$scope','$window', '$http', '$q', function($scope,$http,$window, $http, $q) {
console.log($scope);
console.log($http);
console.log($window);
//console.log($q);
    var auth = {};
    var tokenKey = "new-user-authentication-token-key";

   auth.getUser = function () {
    if (!auth.isLoggedIn())
      return null;
    var token = auth.getToken();
    if (token.indexOf('.') >= 0) {
      token = token.split('.')[1];
    }
    return decode(token);
  };

  //检测用户是否已经登录
  auth.isLoggedIn = function () {
    var token = auth.getToken();
    if (!token)
      return false;
    if (token.indexOf('.') >= 0) {
      token = token.split('.')[1];
    }
    try {
      var payload = decode(token);
    } catch (e) {
      return false;
    }
    var expire = new Date(payload.expire);
    var now = new Date(Date.now());
    return (expire >= now && payload.face);
  };

  auth.setToken = function (token) {
    $window.localStorage["tokenKey"] = token;
  };

  auth.getToken = function () {
    return $window.localStorage["tokenKey"];
  };

  //执行登录操作,向服务器发送请求，然后接受token保存到本地
  //返回一个promise
  auth.login = function (user,succFn,failFn) {
   // console.log($q);
    //var defer = $q.defer();

$http.post('http://202.120.39.166:6789/v1.0/login', user)
      .success(function (data, status, headers) {
        auth.setToken(data);
        console.log(auth.getToken());
        succFn(data);
        //defer.resolve();

      }).error(function (data, status, headers) {
      console.log('error' + status);
      //defer.reject(data);
      failFn(data);
    });


    //return defer.promise;
  };

  //退出登录状态，删除本地的token
  auth.logout = function () {
    $window.localStorage.removeItem(tokenKey);
  };


 

        var init=function()
    {
        var user = {
            username:'Ramesses',
            password: 'Ramesses'
        };

        auth.login(user)
            .then(function(){
                $scope.user = Auth.getUser();
                var token=Auth.getToken();
                 console.log("Auth");
                 console.log(token);
                //$state.go('home');

            }, function(err){
                form.$submitted=false;
                $scope.loginError=err.error;
                console.log("登录失败:"+err);
            });
    }
    init();
    console.log("HomeCtrl");

    }]);
});
