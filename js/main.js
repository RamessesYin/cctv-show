require.config({

    baseUrl: "js/scripts",
    
	// alias libraries paths
    paths: {
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular/angular-route',
        'async': '../lib/requirejs/async',
        'angularAMD': '../lib/requirejs/angularAMD',
        'ngload': '../lib/requirejs/ngload',
        'ui-bootstrap': '../lib/angular-ui-bootstrap/ui-bootstrap-tpls',
        'prettify': '../lib/google-code-prettify/prettify',
        'jquery': 'js/lib/jquery-1.9.1.min',
        'd3': 'js/lib/d3.v3.min',
        'pubsub': 'js/lib/pubsub',
        'application':'js/application',
        'common':'js/common',
        'svg_drawer':'js/svg_drawer',
        'imagesPreloader':'js/imagesPreloader',
        'utils':'js/utils',
        'prenoms_list':'js/prenoms_list',
        'prenoms_dataset_raw':'js/prenoms_dataset_raw',
        'popup':'js/popup',
        'd3_compat':'js/d3_compat',
        'prenoms_dataset':'js/prenoms_dataset',
        'highcharts':'../lib/highstock',
        'date':"../../static/js/plugins/datepicker/bootstrap-datepicker.js",
        "LineController":'controller/line_ctrl',
        'HomeController': 'controller/home_ctrl',
        'PieController':'controller/pie_ctrl',
        'MapController': 'controller/map_ctrl',
        'ChinaMapController':'controller/china_map_ctrl',
        'AlluvialController':'controller/alluvial_ctrl',
        'SummaryChartController':'controller/summary_chart_ctrl',
        'ModulesController': 'controller/modules_ctrl'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        "d3": {exports: 'd3'},
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    // kick start application
    deps: ['app']
});
