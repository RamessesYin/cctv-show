define(function (require) {
    var angular = require('angular');
    var app = require('app');



   app.factory('RESTClient', ['$http', '$q', function($http, $q){

    return {
        getResource: function(url,data){
            /*if(data==null)
                data={callback:'JSON_CALLBACK'};
            else
                data.callback='JSON_CALLBACK';*/
            //data.callback=;

            var defer = $q.defer();
            var str='';
            for(var p in data)
            {
                str+=(p+'='+data[p]+"&");
            }
            if(str!='')
            {
                str.substring(0,str.length-1);
                str='?'+str;
            }
            /*$http.jsonp(url+str).success(function(data){
                console.log(data);
                defer.resolve(data);
            })*/

            $http.get(url+str)
            .then(function(res){
                defer.resolve(res.data);
            }, function(res){
                defer.reject(res.data);
            });
            return defer.promise;
        },


        addResource: function(url, data){
            //alert(1);
            var defer = $q.defer();
            $http.post(url,data)
                .then(function(res){
                    defer.resolve(res.data);
                }, function(res){
                    defer.reject(res.data);
                });
            return defer.promise;
        },

        deleteResource: function(url){
            var defer = $q.defer();
            $http.delete(url)
            .then(function(res){
                defer.resolve(res.data);
            }, function(res){
                defer.reject(res.data);
            });
            return defer.promise;
        },


        updateResource: function(url, data){
            var defer = $q.defer();
            $http.put(url,data)
            .then(function(res){
                defer.resolve(res.data);
            }, function(res){
                defer.reject(res.data);
            });
            return defer.promise;
        }

    }

}]);


   app.factory('Auth', ['$window', '$http', '$q', function ($window, $http, $q) {
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
    //var defer = $q.defer();

$http.post('http://202.120.39.166:6789/v1.0/login', user)
      .success(function (data, status, headers) {
        succFn(data);
        auth.setToken(data);
        console.log(auth.getToken());
        //defer.resolve();

      }).error(function (data, status, headers) {
      console.log('error' + status);
      failFn(data);
      //defer.reject(data);
    });


    return defer.promise;
  };

  //退出登录状态，删除本地的token
  auth.logout = function () {
    $window.localStorage.removeItem(tokenKey);
  };

  return auth;
}]);

    
});







