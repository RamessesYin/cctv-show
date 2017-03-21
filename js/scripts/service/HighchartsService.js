/*
 * Created by Ramesses on 2016/10/2 
 */

define(['app','highcharts'], function (app) {

    app.factory('HighchartsService',[function(){
        var self={};
        var target=$('highchart');
        //当前series与之对应的idx关系
        var curSeries=[];
        self.chart=null;


        var option={

            options:{
                chart:{


                    backgroundColor:"#666666",
                    type:'spline'
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: '日期'
                    },
                    tickInterval:10
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }],
                    minTickInterval:1
                },
                legend: {
                    layout: 'vertical',
                    align: 'center',
                    verticalAlign: 'top',
                    borderWidth: 0,

                    enabled:true
                },
                credits: {
                    enabled:false
                }

            },


            series: [{
                name: '日期',
                data: []
            }],
            marginRight:120
        }


        self.init=function ()
        {
            self.chart = target.highcharts();

        };


        self.setData=function(data,date)
        {

            var result=adjustToSix(data,date);
            data=result.data;
            date=result.date;

            option.options.xAxis.categories=date;

            option.series[0].data=data;
            return option;
        }

        self.setLegend=function(legend)
        {
            if(legend.length>1)
            {
                for(var i=0;i<legend.length && i<stackOption.series.length;i++)
                {
                    stackOption.series[i].name=legend[i];
                }
            }
            else
            {
                option.series[0].name=legend[0];
            }

        }

        var adjustToSix=function(data,date)
        {
            var num=30;

            var len=data.length;
            if(len<num)
            {
                delete option.options.xAxis.tickInterval;
                delete stackOption.options.xAxis.tickInterval;

                return {
                    data:data,
                    date:date
                }
            };
            var interval=len/30;
            if(interval%6)
            {
                interval=6-interval%6+interval;
            }


            if(date.length>0)
            {
                //
                if(date[0]>=2000000000)
                {
                    while((date[0]-Math.floor(date[0]/100)*100)%6!=0)
                    {
                        data.shift();
                        date.shift();
                    }

                }
            }
            return {
                data:data,
                date:date
            };
        }

        self.setYInterval=function(flag)
        {
            if(flag===0)
            {
                option.options.yAxis.minTickInterval="auto";
            }
            else
            {
                option.options.yAxis.minTickInterval=1;
            }
            return option;
        }

        self.setYTitle=function(title)
        {
            option.options.yAxis.title.text=title;
            stackOption.options.yAxis.title.text=title;
            return option;
        }

        self.setXTitle=function(title)
        {
            option.options.xAxis.title.text=title;
            return option;
        }

        self.setWidth=function(width)
        {
            target.css('width',width);
        }
        self.setHeight=function(height)
        {
            target.css('height',height);
        }

        self.setOption=function(op)
        {
            angular.merge(option.options,op);
        }

        self.update=function()
        {
            target.highcharts(option);
        }

        self.getOption=function()
        {
            return option;
        };

        self.addSeries=function (index , data,color)
        {
            // //self.chart.addSeries(data);
            // console.log("what add ???");
            // console.log(index);
            // console.log(data);
            // console.log(color);
            option.series.push({data:data});
            option.options.yAxis.plotLines;

            curSeries.push(index);
        };

        self.removeSeries = function (index)
        {

        };

        return self;
    }]);

    app.factory('StockChartService',function ()
    {
        var self={};
        var target = $('highchart');
        var curSeries = [];
        //var chart=null;

        var seriesOptions = [
            // {
            //     name:1,
            //     data:[
            //         [1255392000000,27.15],
            //         [1255478400000,27.33],
            //         [1255564800000,27.22],
            //         [1255651200000,26.86],
            //         [1255910400000,27.12]
            //     ]
            // }

            ];


        self.init = function ()
        {
            // log(target);
            target.highcharts('StockChart', {

                rangeSelector: {
                    selected: 4
                },
                chart: {
                      backgroundColor: '#ECF0F5',
                },
                yAxis: {
                    labels: {
                        formatter: function () {
                           // return (this.value > 0 ? ' + ' : '') + this.value + '%';
                           return this.value;
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }],
                    minRange:1
                },

                plotOptions: {
                    series: {
                        compare: 'undefined',
                        showInNavigator: true
                    }
                },

                tooltip: {

                    pointFormatter: function ()
                    {
                        return '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+(parseFloat(this.y))+'';
                    },
                    valueDecimals: 2,
                    split: true
                },

                series: seriesOptions
            });
        };

        self.addSeries=function(word , data)
         {
        //     console.log("start to add");
        //     console.log(word);
        //     console.log(data);
        //     console.log(JSON.stringify(data));
            var chart = target.highcharts();
            word.data = data;
            // console.log("chart 添加的名字");
            // console.log(word.name);

            // console.log("chart series 添加");
            // console.log("之前");
             for(var i =0;i<chart.series.length;i++)
             {
                console.log(chart.series[i]);
             }
            chart.addSeries({
                name: word.name,
                data: data,
                color:word.color
            });
             // console.log("之后");
             // for(var i =0;i<chart.series.length;i++)
             // {
             //    console.log(chart.series[i]);
             // }
            // chart.addSeries({
            //     name:'test',
            //     data:[
            //         [1475369421000,0.00],
            //         [1475369321000,0.00],
            //         [1475369221000,0.00],
            //         [1475369321000,1.00],
            //         [1475369621000,0.00]]
            //
            // })
            // console.log(curSeries);
            // log("curSeries添加");
            // log(word);
            // // log("之前");
            // for(var j=0;j<curSeries.length;j++)
            //  {
            //     console.log(curSeries[j]);
            //  }


               curSeries.push(word);

            // log("之后");
            //   for(var j=0;j<curSeries.length;j++)
            //  {
            //     console.log(curSeries[j]);
            //  }
         
        };

        self.removeSeries=function(word)
        {
            console.log("ready to rm");
            var chart = target.highcharts();
            var id = word.id;
            console.log(chart.series);
            for(var i=0;i<chart.series.length;i++)
            {
                if(chart.series[i].name==word.name)
                {
                    chart.series[i].remove(true);
                    chart.redraw();
                    return;
                }
             //    if(id==curSeries[i].id)
             //    {
             //         console.log("the rm word id is");
             //         log(i);
             //         log("之前");
             //           for(var j=0;j<curSeries.length;j++)
             // {
             //    console.log(curSeries[j]);
             // }
             //         curSeries.splice(i,1);
             //         log("之后");
             //          for(var j=0;j<curSeries.length;j++)
             // {
             //    console.log(curSeries[j]);
             // }                     

             // chart.series[i].remove(true);
             //         console.log("succ remove?");

             //         chart.redraw();
             //         console.log("succ redraw???");
             //         return;
             //    }
            }

            // chart.series[0].remove(true);
            // chart.redraw();
            // return ;
            // for(var i=0;i<chart.series.length;i++)
            //     chart.series[i].remove(true);

            // for(var i=0;i<curSeries.length;i++)
            // {
            //     if(curSeries[i].id == id)
            //     {
            //         curSeries.splice(i,1);
            //         break ;
            //     }

            // }

            // for(var i=0;i<curSeries.length;i++)
            // {
            //     chart.addSeries({
            //         name: curSeries[i].name,
            //         data: curSeries[i].data,
            //         color:curSeries[i].color
            //     });
            // }

        }

        return self;

    })


});







