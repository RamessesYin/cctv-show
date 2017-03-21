/*
 * Created by Ramesses on 2016/10/1.
 */
// dataServices
define(['app'], function (app) {






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
    $window.localStorage["tokenKey"] =token;
  };

  auth.getToken = function () {
    return $window.localStorage["tokenKey"];
  };

  //执行登录操作,向服务器发送请求，然后接受token保存到本地
  //返回一个promise
  auth.login = function (user) {
    var defer = $q.defer();

  $http.post('http://202.120.39.166:6888/v1.0/login', user)
      .success(function (data, status, headers) {
        log(data);
        log(headers);
        log(status);
        auth.setToken(data.token);
        log("login");
        log(auth.getToken());
        defer.resolve();

      }).error(function (data, status, headers) {
      console.log('error' + status);
      defer.reject(data);
    });


    return defer.promise;
  };

  //退出登录状态，删除本地的token
  auth.logout = function () {
    $window.localStorage.removeItem(tokenKey);
  };

  return auth;
}]);


app.factory('RESTClient', ['$http', '$q', 'Auth', function ($http, $q, Auth) {

  return {
    getResource: function (url) {
      //url =url+'?auth=HTTPBasicAuth('+Auth.getToken+')'; 
      var defer = $q.defer();
      var token=Auth.getToken();
      log(token);
      $http.get(
        url, 
      {
        headers: {'Authorization':Auth.getToken()}
      }).then(function (res) {
        defer.resolve(res.data);
      }, function (res) {
        defer.reject(res.data);
      });
      return defer.promise;
    },


    addResource: function (url, data) {
      url = encodeURI(url);
      var defer = $q.defer();
      $http.post(url, data, {
          headers: {'Authorization':Auth.getToken()}
        })
        .then(function (res) {
          defer.resolve(res.data);
        }, function (res) {
          defer.reject(res.data);
        });
      return defer.promise;
    },

    deleteResource: function (url) {
      url = encodeURI(url);
      var defer = $q.defer();
      $http.delete(url, {
        headers: {'Authorization':Auth.getToken()}
      }).then(function (res) {
        defer.resolve(res.data);
      }, function (res) {
        defer.reject(res.data);
      });
      return defer.promise;
    },


    updateResource: function (url, data) {
      url = encodeURI(url);
      var defer = $q.defer();
      $http.put(url, data, {
        headers: {'Authorization':Auth.getToken()}
      }).then(function (res) {
        defer.resolve(res.data);
      }, function (res) {
        defer.reject(res.data);
      });
      return defer.promise;
    }

  }

}]);



});