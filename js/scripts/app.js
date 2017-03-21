
/*
 * Created by Ramesses on 2016/10/1.
 */
 define(['angularAMD', 'angular-route'], function (angularAMD) {
    var app = angular.module("ngreq-app", ['ngRoute']);
    
    /**
     * Configure Angular ngApp with route and cache the needed providers
     */
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/home", angularAMD.route({
                templateUrl: 'views/home.html', controller: 'HomeController', navTab: "home"
            }))
            .when("/auth", angularAMD.route({
                templateUrl: 'views/auth.html', controllerUrl: 'controller/auth_ctrl', navTab: "auth"
            }))
            .when("/pie", angularAMD.route({
                templateUrl: 'views/pie.html', controller: 'PieController', navTab: "pie"
            }))
            .when("/line", angularAMD.route({
                templateUrl: 'views/line.html', controller: 'LineController', navTab: "line"
            }))
            .when("/alluvial", angularAMD.route({
                templateUrl: 'views/alluvial.html', controller: 'AlluvialController', navTab: "alluvial"
            }))
            .when("/summaryChart", angularAMD.route({
                templateUrl: 'views/summary_table.html', controller: 'SummaryChartController', navTab : "summaryChart"
            }))

            .otherwise({redirectTo: '/home'})
        ;
    });
    
    // Define constant to be used by Google Analytics
    app.constant("SiteName", "/angularAMD");
    
    
    // Create function to link to GitHub
    app.directive('ghLink', function () {
        return {
            restrict: 'A',
            scope: true,
            template: '<a href="{{fullpath}}" target="_blank">{{filename}}</a>',
            controller: function ($scope, $attrs) {
                var gh_root = "https://github.com/marcoslin/angularAMD/blob/master/www/",
                    relfile = $attrs.ghLink,
                    fullpath = gh_root + relfile;
                $scope.fullpath = fullpath;
                $scope.filename = relfile.replace(/^.*[\\\/]/, '');
            }
        };
    });
    
    // Add support for pretty print
    app.directive('prettyprint', function() {
        return {
            restrict: 'C',
            link: function postLink(scope, element, attrs) {
                  element.html(prettyPrint(scope.dom));
            }
        };
    });
        
    // Bootstrap Angular when DOM is ready
    return angularAMD.bootstrap(app);

});


var DEBUG=true;

function log(msg)
{
    if(DEBUG)
    {
        console.log(msg);
    }
}