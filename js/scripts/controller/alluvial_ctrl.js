/*
 * Created by Ramesses on 2016/10/1.
 */

define(['app', 'service/service','directive/navMenu','prettify','d3'], function (app) {

    app.controller('AlluvialController', function ($scope,$window,RESTClient,Auth) {


        /*! alluvial_diagram 02-11-2015 */
        $window.localStorage["page"]=='all';
        
        $scope.times = [{month:7,day:11}];
        $scope.channelList = ["CCTV1", "CCTV1(高清)", "CCTV2", "CCTV2(高清)", "CCTV3", "CCTV3(高清)", "CCTV4", "CCTV5", "CCTV5(高清)", "CCTV6", "CCTV6(高清)", "CCTV7", "CCTV7(高清)", "CCTV8", "CCTV8(高清)", "CCTV9", "CCTV9(高清)", "CCTV10", "CCTV10(高清)", "CCTV11", "CCTV12", "CCTV12(高清)", "CCTV13", "CCTV14", "CCTV14(高清)", "CCTV15"];
        $scope.selectedChannel = $scope.channelList[0];
        $scope.selectedTime = JSON.stringify($scope.times[0]);

        $scope.updateChannelData = function () {
            // console.log($scope.selectedChannel);
            // console.log($scope.channelList.indexOf($scope.selectedChannel));

            $scope.updateData();
        }
        
        d3.alluvial = function() {
            function a() {
                function a(b, c) {//b b.week find next week recursively
                    if (c + 1 > d.length - 1)
                        return [];
                    var e = d[c + 1]
                        , f = e.filter(function(a) {
                        return b.key == a.key ? !0 : !1
                    });
                    return f.length < 1 ? (f = a(b, c + 1),
                        c + 1 == d.length - 1 ? [] : f) : f
                }
                function k(a, b) {//a a,week find previous week recursively
                    if (a.week < 1)
                        return [];
                    var c = d[b - 1]
                        , e = c.filter(function(b) {
                        return a.key == b.key ? !0 : !1
                    });
                    return e.length < 1 ? (e = k(a, b - 1),
                    e.length < 1 && console.log("source - can't find team " + a.key + " in week " + (b - 1)),
                        e) : e
                }
                c = [],//links
                    b = [],//node
                    d = [];//? index by week(column)
                // g hOffsets
                var n;//away=>program_id,away_prob=>show_period,home_prob=>start_time,home=>program_name
                _data.forEach(function(a) {
                    a.week > d.length - 1 && (d.push([]),
                        n = 0),
                        node = {},// parse and push away team
                        node.key = a.away,
                        node.value = a.away_prob,
                        node.opponentValue = a.home_prob,
                        node.gameKey = a.home + "_" + a.away + "_w" + a.week,
                        node.week = a.week,
                        node.opponent = a.home,
                        node.game = a,
                        node.win = a.away_prob >= .5 ? 1 : 0,
                        node.totalWins = 0,
                        node.type = "away",
                        node.gameIndex = n,
                        node.sourceLinks = [],
                        node.targetLinks = [],
                        node.count = a.count,
                        node.time_len = a.time_len,
                        node.avg_time = a.avg_time,
                        node.arrival_rate = a.arrival_rate,
                        node.rating = a.rating,
                        node.loyalty = a.loyalty,
                        b.push(node),
                        d[node.week].push(node),
                        // node = {},
                        // node.key = a.home,// parse and push home team
                        // node.opponent = a.away,
                        // node.opponentValue = a.away_prob,
                        // node.gameKey = a.home + "_" + a.away + "_w" + a.week,
                        // node.value = a.home_prob,
                        // node.week = a.week,
                        // node.game = a,
                        // node.type = "home",
                        // node.win = a.home_prob >= .5 ? 1 : 0,
                        // node.gameIndex = n,
                        // node.totalWins = 0,
                        // node.sourceLinks = [],
                        // node.targetLinks = [],
                        // b.push(node),
                        // d[node.week].push(node),
                        n++
                }),//m[0] width m[1] height(1330)
                    i = m[1] * j,//scale 0.01 i=13.3, padding?
                    i = 0,// modified: padding to 0
                    // m[1] = m[1] *0.3,
                    h = (m[1] - d[0].length * i) / d[0].length,// single node height
                    e = (m[0] - l) / (d.length - 1),// single width
                    f = h + i;
                var height = m[1];
                var o = 0;
                d.forEach(function(a) {
                    g.push(o * e),// hOffsets
                        o++
                }),
                    b.forEach(function(b) {// calculate node position parameters
                        // b.sourceLinks = k(b, b.week),
                        //     b.targetLinks = a(b, b.week),
                        b.x = b.week * e,
                            b.dx = l,
                            b.y = height * b.opponentValue,//start_time percentage
                            // b.value >= .5 ? b.y = (b.gameIndex - 1) * (h + i) : b.y = (b.gameIndex - 1) * (h + i) + h * (1 - b.value) + 1,
                            b.dy = height * b.value
                    }),
                    b.forEach(function(b) {// calculate path link position parameters
                        if (b.week < d.length - 1) {
                            var e = a(b, b.week);
                            if (e.length > 0) {
                                e.forEach(function (des) {
                                    var f = {};
                                    f.source = b,
                                        f.target = des,
                                        f.sy = f.source.y,
                                        f.ty = f.target.y,
                                        f.sdy = f.source.dy,
                                        f.tdy = f.target.dy,
                                        f.dy = b.dy,
                                        f.key = b.key,
                                        f.value = f.target.value,
                                        f.target.totalWins = f.source.totalWins + f.target.win,
                                        f.wins = f.target.totalWins,
                                        c.push(f)
                                })
                            }
                        }
                    })
            }
            var b, c, d, e, f, g = [], h = 50, i = 10, j = .01, k = {}, l = 8, i = 8, m = [1, 1], b = [], c = [];
            return k.data = function(a) {
                return arguments.length ? (_data = a,
                    k) : _data
            }
                ,
                k.nodeHeight = function(a) {
                    return arguments.length ? k : h
                }
                ,
                k.nodeWidth = function(a) {
                    return arguments.length ? (l = +a,
                        k) : l
                }
                ,
                k.nodePadding = function(a) {
                    return arguments.length ? (i = +a,
                        k) : i
                }
                ,
                k.nodes = function(a) {
                    return arguments.length ? (b = a,
                        k) : b
                }
                ,
                k.links = function(a) {
                    return arguments.length ? (c = a,
                        k) : c
                }
                ,
                k.size = function(a) {
                    return arguments.length ? (m = a,
                        k) : m
                }
                ,
                k.hOffsets = function() {
                    return g
                }
                ,
                k.xOffset = function() {
                    return e
                }
                ,
                k.layout = function() {
                    return a(),
                        k
                }
                ,
                k.relayout = function() {
                    return k
                }
                ,
                k.link = function() {
                    function a(a) {
                        var c = a.source.x + a.source.dx
                            , d = a.target.x
                            , e = d3.interpolateNumber(c, d)
                            , f = e(b)
                            , g = e(1 - b)
                            , h = a.source.y
                            , i = a.target.y
                            , j = "M " + c + "," + h + " C " + f + ", " + h + " " + g + ", " + i + " " + d + ", " + i + " L " + d + ", " + (i + a.tdy) + " C " + f + ", " + (i + a.tdy) + " " + f + ", " + (h + a.sdy) + " " + c + ", " + (h + a.sdy) + " L " + c + "," + h;
                        return j
                    }
                    var b = .5;
                    return a.curvature = function(c) {
                        return arguments.length ? (b = +c,
                            a) : b
                    }
                        ,
                        a
                }
                ,
                k
        }
            ,


            $scope.updateData = function () {

                var pad = function pad(num, size) {
                    var s = num+"";
                    while (s.length < size) s = "0" + s;
                    return s;
                };

                var common_area = 0;//now only support guangzhou
                var common_prefix = "http://202.120.39.166:6789/v1.0/";
                var common_channel = $scope.channelList.indexOf($scope.selectedChannel)+1;
                var common_date = "2016" + pad(JSON.parse($scope.selectedTime).month,2) + pad(JSON.parse($scope.selectedTime).day,2);
                nm_json_url  = common_prefix + "programcolor/" + common_area + "/" + common_date + "/" + common_channel;
                nm_csv_url = common_prefix + "week/" + common_area + "/" + common_date + "/" + common_channel + "/" + 5*60;

                console.log(nm_csv_url);
                console.log(nm_json_url);


                d3.select("#chart").select("*").remove("*");


                var a = 0
                    , b = 0
                    , c = .4
                    , d = .1
                    , e = 0
                    , f = 1
                    , g = 50//original : 100
                    , h = d3.select("#game")
                    , i = d3.select("#program_name"),
                    rate = d3.select("#program_rate")
                    // d3.select("#game_winner_name"))
                    // , j = d3.select("#game_winner_img")
                    // , k = d3.select("#game_winner_prob")
                    // , l = (d3.select("#loser"),
                    // d3.select("#game_loser_name"))
                    // , m = d3.select("#game_loser_img")
                    // , n = d3.select("#game_loser_prob")
                // , o = window.innerWidth
                    , o = d3.select("#chart").node().parentNode.clientWidth
                    , p = {
                    top: 0,
                    right: 50,
                    bottom: 10,
                    left: 160
                }
                    , q = Math.max(o, 800) - p.left - p.right
                    , r = 1440 - p.top - p.bottom
                    , height_true = (r-g)*0.4
                    , s = (d3.format(",.0f"),
                    d3.scale.category20(),
                    d3.select("#chart").append("svg").style("overflow", "visible").attr("width", q + p.left + p.right).attr("height", 1440))
                    , t = s.append("g").attr("transform", "translate(" + p.left + "," + p.top + ")")// position of top label
                    , u = s.append("g").attr("transform", "translate(" + p.left + "," + (p.top + g) + ")")//position of real canvas
                    , v = d3.alluvial().nodeWidth(8).nodePadding(10).size([q, height_true])// an d3.alluvial instance
                    , w = v.link();//a function, take a link, and return svg line "d" parameters


                var intecept_str = function (str) {
                    if (str.length > 5){
                        return str.substring(0,5);
                    }
                    else {
                        return str;
                    }
                };

                var weekName = ["周一","周二","周三","周四","周五","周六","周日"];


                var x_ax = d3.scale.linear().domain([0,24]).range([p.top,1440*0.4-20]);
                var xAxis = d3.svg.axis().scale(x_ax).orient("left").tickSize(-(q + p.left));
                s.append("g").attr("class", "x axis")
                    .attr("transform", "translate("+ p.left/2 + "," + g + ")")
                    .call(xAxis);



                d3.json(nm_json_url, function(g, o) {
                    var r = []
                        , s = {};
                    // var o = JSON.parse(jdata);
                    o.teams.forEach(function(a) {
                        s[a.key] = a
                    }),
                        d3.csv(nm_csv_url, function(g) {
                            // var g = d3.csv.parseRows(cdata);

                            function o(a) {//mouse over
                                d3.selectAll("path." + a.key).transition().style("fill-opacity", .3),
                                    u.selectAll("rect").filter(function() {
                                        return this.__data__.key != a.key
                                    }).transition().style("fill-opacity", d),
                                    u.selectAll("rect").filter(function() {
                                        return this.__data__.opponent == a.key
                                    }).transition().style("fill-opacity", .25);
                                u.selectAll("text." + a.key).data();
                                u.selectAll("text").filter(function() {
                                    return this.__data__.key != a.key && this.__data__.opponent != a.key
                                }).transition().style("fill-opacity", d);
                                h.style("top", function() {
                                    var b = a.value > .49 ? a.y + p.top + 140 : a.y + p.top + 140 - (20 - a.dy);
                                    return b + "px"
                                }).style("left", function() {
                                    return Math.min(q - 130, Math.max(a.x - 37, 20)+50) +180 + "px"
                                }),
                                    h.transition().style("opacity", 1);
                                i.text(a.opponent).style("color","rgb(183, 9, 163)").style("font-weight","bold").style("font-family","sans-serif").style("font-size","20px");
                                rate.text("收视率: "+ a.value.toFixed(2) +"%").style("color","black");


                                d3.selectAll(".show_item").each(function (d,i) {
                                    var name = ["总收视人数", "总收视时长","人均收视时长","到达率", "收视率", "观众忠实度"];
                                    data = d3.select(this);
                                    function isInt(n) {
                                        return n % 1 === 0;
                                    };

                                    // var itemKey = data.selectAll(".col-md-2")[0];
                                    // var itemValue = data.selectAll(".col-md-2")[1];

                                    var itemdata = +a[data.node().id];
                                    if (isInt(itemdata)){}
                                    else {itemdata = itemdata.toFixed(2) + "%";}

                                    var index = i;

                                    data.selectAll(".item_item").each(function (d,i) {
                                        var piece = d3.select(this);
                                        if (i==0){
                                            piece.text(name[index] + ":").style("color","black").style("font-size","12px").style("font-weight","bold");

                                        }
                                        else {
                                            piece.text(itemdata).style("color","black").style("font-size","12px");
                                        }

                                    })

                                    // itemKey.text(name[i] + ":").style("color","black").style("font-size","12px").style("font-weight","bold");
                                    // itemValue.text(itemdata).style("color","black").style("font-size","12px");
                                    // data.text(name[i] + ":" + itemdata).style("color","black").style("font-size","12px");
                                });
                                
                                // var b, c, e, f;
                                // a.value > .49 ? (b = s[a.key],
                                //     c = s[a.opponent],
                                //     e = a.value,
                                //     f = a.opponentValue) : (b = s[a.opponent],
                                //     c = s[a.key],
                                //     e = a.opponentValue,
                                //     f = a.value),
                                //     i.text(b.name).style("color", b.color),
                                //     k.text(Math.round(100 * e) + "%").style("color", b.color),
                                //     j.attr("src", "assets/" + b.key + ".png"),
                                //     l.text(c.name).style("color", c.color),
                                //     n.text(Math.round(100 * f) + "%").style("color", c.color),
                                //     m.attr("src", "assets/" + c.key + ".png")
                                    // t.selectAll(".weekLabel").transition().style("font-weight", function(b, c) {
                                    //     return c == a.week || c == a.week + 17 ? "bold" : "normal"
                                    // }).style("font-size", function(b, c) {
                                    //     return c == a.week || c == a.week + 17 ? "16px" : "12px"
                                    // })
                            }
                            function x(b) {//mouse out
                                d3.selectAll("path").transition().style("fill-opacity", a),
                                    u.selectAll("rect").transition().style("fill-opacity", function(a) {
                                        // return a.value < .5 ? c : .8
                                        return .7
                                    }),
                                    u.selectAll("text").transition().style("fill-opacity", f),
                                    t.selectAll(".headerLabel").transition().style("opacity", 0),
                                    // t.selectAll(".weekLabel").transition().style("font-weight", "normal").style("font-size", "12px"),
                                    h.transition().style("opacity", 0)
                            }
                            function y(a) {
                                return s[a].color
                            }
                            r = [],// g(array),csv_data,cvt to r(array)
                                g.forEach(function(a) {
                                    game = {},
                                        game.week = Number(a.week),
                                        game.away = a.away,
                                        game.home = a.home,
                                        game.away_prob = Number(a.away_prob),
                                        game.home_prob = Number(a.home_prob),
                                        game.count = a.count,
                                        game.time_len = a.time_len,
                                        game.avg_time = a.avg_time,
                                        game.arrival_rate = a.arrival_rate,
                                        game.rating = a.rating,
                                        game.loyalty = a.loyalty,

                                        r.push(game)
                                }),
                                v.data(r).layout();//load data, return d3.alluvial()
                            var z = v.links()//links dataset
                                , A = v.nodes()// nodes dataset
                                , B = v.hOffsets()
                                , C = t.selectAll(".topLabel").data(B).enter();//top label,week 1 - 17
                            C.append("text").style("fill", "#1976D2").style("font-weight", 400).style("text-anchor", "middle").attr("class", "weekLabel").attr("y", 35 - p.top).attr("x", function(a) {
                                return a
                            }).text(function (a) {
                                return weekName[B.indexOf(a)];
                            } );// set week font
                                // C.append("text").style("fill", "#1976D2").style("font-weight", 400).style("text-anchor", "middle").attr("class", "weekLabel").attr("y", 35 - p.top).attr("x", function(a) {
                                //     return a
                                // }).text(function(a, b) {
                                //     return b + 1
                                // });// set week number font
                            // u, the display canvas <g>
                            // g g, data join(<path class="link key">) path
                            // z = v.links()
                            // w = v.link()
                            var D = (u.append("g").selectAll(".link").data(z).enter().append("path").attr("class", function(a) {
                                return "link " + a.key
                            }).attr("d", w).style("fill", function(a) {
                                return y(a.key)
                            }).style("fill-opacity", a).style("stroke", function(a) {
                                return y(a.key)
                            }).style("stroke-width", .5).style("stroke-opacity", b),
                                // g g, data join(<g class="node">) node
                                u.append("g").selectAll(".node").data(A).enter().append("g").attr("class", "node").attr("transform", function(a) {
                                    return "translate(" + a.x + "," + a.y + ")"
                                }));
                            // rect size configuration of each node <g><rect></rect><text></text></g>
                            D.append("rect").attr("class", function(a) {
                                return "game " + a.key + " " + a.gameKey
                            }).attr("height", function(a) {
                                return a.dy
                            }).attr("width", v.nodeWidth()).style("fill", function(a) {
                                return y(a.key)
                            }).style("fill-opacity", function(a) {
                                // return a.value < .5 ? c : .8
                                return .7
                            }).style("stroke", function(a) {
                                return y(a.key)
                            }).style("stroke-opacity", e).on("mouseover", function(a) {
                                o(a)
                            }).on("mouseout", function(a) {
                                x(a)
                            }),
                                D.append("text").attr("x", -6).attr("class", function(a) {
                                    return "game " + a.gameKey + " " + a.key
                                }).attr("y", function(a) {
                                    return a.dy / 2
                                }).attr("dy", ".35em").style("font-weight", function(a) {
                                    // return a.value < .5 ? 200 : 700
                                    return 500
                                }).style("fill-opacity", f).attr("text-anchor", "end").style("font-size", "12px").style("fill", function(a) {
                                    return y(a.key)
                                }).attr("transform", null ).text(function(a) {
                                    return intecept_str(a.opponent)
                                }).on("mouseover", function(a) {
                                    o(a)
                                }).on("mouseout", function(a) {
                                    x(a)
                                })
                        })
                })
            };
        $scope.updateData();


    });
}); 


//http://202.120.39.166:6888/v1.0/programhot/1/D?username=root&password=123456