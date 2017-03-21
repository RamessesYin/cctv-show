/*
 * Created by Ramesses on 2016/10/1.
 */
      define(function () {
        var images = ["images/clear.png","images/logos/dataaddict.png","images/logos/dataaddict_over.png","images/search.png","images/spinner.gif"];
        cached_images = [];
        for(var i = 0; i < images.length; i++) {
          var img = new Image()
          img.onload = function() { 
            this.loaded = true; 
          };
          img.onerror = function() { 
            this.loadError = true; 
          };
          img.src = images[i];
          if (img.complete) {
            img.loaded = true;
          }
          cached_images.push(img);
        }
        return cached_images;
      });
