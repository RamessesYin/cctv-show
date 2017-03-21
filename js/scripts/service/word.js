/*
 * Created by Ramesses on 2016/10/12.
 */
// dataServices
define(['app','d3'], function (app) {






app.factory('Word', ['$window', '$http', '$q', function ($window, $http, $q) {
  
  var word={};

  word.init=function(data,addFun,rmFun)
  {
    if(window.localStorage["init"]=='0')
    {
      var e = d3.select("#prenoms_list_container ul").selectAll("li");
       e.remove();
          }
    window.localStorage["init"]='0';
   
            var name=[];
    
    var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

            for(var i=0;i<data.id.length;i++)
            {
                 var char;
                var tmp={
                    mixte:false,
                    prenom:data.program_name[i],
                    sexe:data.normalized_value[i]>50?"f":"h",
                    total:data.normalized_value[i],
                    prenom_sexued:data.program_name[i],
                    search_text:data.program_name[i],
                    unique_id:data.program_name[i],
                    years:data.specific_value[i],
                    id:data.id[i]
                }
                name.push(tmp);

            }
            var range=data.date;

   
    var   colors = ["#4c5d91", "#4c92b9", "#53a488", "#a5ad5c", "#e0da2f", "#b98c6f", "#d57599", "#a15599"];
    var   scales = {
          h: d3.scale.ordinal().range(colors.slice(0, 5)),
          f: d3.scale.ordinal().range(colors.slice(0).reverse().slice(0, 5))
        };

      var add_remove, prenoms_lis, update_class_for_prenom;
      update_class_for_prenom = function(years) {

       

        return function(sel) {
              return sel.each(function(prenom_data) {

            var font_size, i, level, line_height, prenom_data_max, sizes, _ref;
                       
           // log([prenom_data]);
            i = [prenom_data][0].total/100;
            level = i > 1 ? 4 : i > 0.8 ? 3 : i > 0.5 ? 2 : i > 0.3 ? 1 : 0;
            sizes = [[0.9, 1], [1.2, 0.7], [1.7, 0.625], [2.0, 0.55], [2.5, 0.47]];
            _ref = sizes[level], font_size = i*50, line_height = _ref[1];
            // log(font_size);
        
            return d3.select(this).style("line-height", line_height).style("font-size", font_size + "px");
          });
        };
      };
      d3.select("#prenoms_list_container .loading").remove();
      prenoms_dataset=name;
      prenoms_lis = d3.select("#prenoms_list_container ul").selectAll("li").data(prenoms_dataset).enter().append("li").attr("class", function(prenom_data) {
        return prenom_data.sexe;
      }).style("color",function(prenom_data) {
        return prenom_data.sexe=='h'?"#262626":"#FF4500";
      }).style("padding","3px").style().style("display","inline-block").style("list-style-type","none").style("white-space","nowrap").call(update_class_for_prenom(range)).text(function(d) {
        
        var word=d.prenom.substr(0,4)+'...';
        return word;
      }).style("font-family", "SimHei").attr("title", function(prenom_data) {
        if (prenom_data.alt != null) {
          return "autres orthographes: " + prenom_data.alt.join(", ");
        }
      }).on("click", function(prenom_data) {
        var selected;
                selected = d3.select(this).classed("selected");
                console.log("set line height");
                d3.select(this).style("line-height","1");
        var options=selected?1:0;
        add_remove(options, prenom_data);
        prenom_color_scale=scales[prenom_data.sexe](prenom_data.prenom);
        var back={
          name:prenom_data.prenom,
          id:prenom_data.id,
          color:prenom_color_scale
        };
        if(options==0)
          {
            // console.log("FROM WORD:add the word");
            // console.log(back);

            addFun(back);
                      }
        else 
        {
          // console.log("FROM WORD:rm the word");
          //   console.log(back);

          rmFun(back);
        }
        return false;
      });



      $("#prenoms_list_container ul li").after(" ");

      add_remove = function(options, prenom_data) {
        var sel;
        sel = prenoms_lis.filter(function(d) {
          return d === prenom_data;
        });
        if (options==0) {
     
          prenom_color_scale=scales[prenom_data.sexe](prenom_data.prenom);
      
          return sel.style("background-color", prenom_color_scale).classed("selected", true).style("line-height","1");
        } else {
          var origin=prenom_data.sexe=='h'?"#262626":"#FF4500";
          return sel.style("background-color", "").classed("selected", false);
        }
      };

       $("#prenoms_list_container").css({
          height: $(window).height() - $("#title").outerHeight(true) - $("#search").outerHeight(true) - parseInt($("#prenoms_list_container").css("padding-top")) - parseInt($("#prenoms_list_container").css("padding-bottom")) - 30
        });


    }
    

  return word;
}]);




});