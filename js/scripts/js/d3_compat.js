/*
 * Created by Ramesses on 2016/10/1.
 */
// Generated by CoffeeScript 1.6.3
(function() {
  define(["d3"], function(d3) {
    return (function() {
      var childOf, d3_on, d3_selectionPrototype, relatedTarget, shims;
      d3_selectionPrototype = d3.selection.prototype;
      d3_on = d3_selectionPrototype.on;
      relatedTarget = function(callback) {
        return function() {
          var related, _ref;
          related = (_ref = d3.event) != null ? _ref.relatedTarget : void 0;
          if (this === related || childOf(this, related)) {
            return void 0;
          }
          return callback.apply(this, arguments);
        };
      };
      shims = {
        mouseenter: ["mouseover", relatedTarget],
        mouseleave: ["mouseout", relatedTarget]
      };
      d3_selectionPrototype.on = function(evt, callback, useCapture) {
        var bits, shim, type;
        bits = evt.split(".");
        type = bits.shift();
        shim = shims[type];
        if (shim) {
          evt = [shim[0], bits].join(".");
          callback = shim[1].call(null, callback);
          return d3_on.call(this, evt, callback, useCapture);
        } else {
          return d3_on.apply(this, arguments);
        }
      };
      return childOf = function(p, c) {
        if (p === c) {
          return false;
        }
        while (c && c !== p) {
          c = c.parentNode;
        }
        return c === p;
      };
    })();
  });

}).call(this);
