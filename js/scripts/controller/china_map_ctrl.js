/*
 * Created by Ramesses on 2016/10/1.
 */
define(['app', 'service/service','directive/navMenu','prettify','d3'], function (app) {

    app.controller('ChinaMapController', function ($scope,RESTClient,Auth) {

        var map = d3.select("#chinamap");

        var width  = map.node().clientWidth;
        var height = 1000;

        var svg = d3.select("#chinamap").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0,0)");

        var projection = d3.geo.mercator()
            .center([107, 31])
            .scale(5000)
            .translate([width/2, height/2]);

        var path = d3.geo.path()
            .projection(projection);


        var color = d3.scale.category20();


        d3.json("views/china.geojson", function(error, root) {

            if (error)
                return console.error(error);
            // console.log(root.features);

            svg.selectAll("path")
                .data( root.features )
                .enter()
                .append("path")
                .attr("stroke","#000")
                .attr("stroke-width",1)
                .attr("fill", function(d,i){
                    return color(i);
                })
                .attr("d", path )
                .on("mouseover",function(d,i){
                    d3.select(this)
                        .attr("fill","yellow");
                })
                .on("mouseout",function(d,i){
                    d3.select(this)
                        .attr("fill",color(i));
                });

        });


    });
}); 


//http://202.120.39.166:6888/v1.0/programhot/1/D?username=root&password=123456