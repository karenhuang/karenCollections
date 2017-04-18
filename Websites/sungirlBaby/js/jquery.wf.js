/* ACWF v1.0.5 | jQuery Water Fall Plugin | by Alex Chen / djalexxx@msn.com */
(function($) {
    "use strict";
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        }
    }
    var target, settings = {"margin": 30, "itemWidth": 290, "minWidth": false, "autoWidth": true, "maxColumn": 0, "sort": "y"};
    function wf() {
        var margin, column, marginStart, itemWidth, i, aryX = [], aryY = [];
        margin = settings.margin;
        column = settings.autoWidth ? Math.floor((target.innerWidth() - margin) / (settings.itemWidth + margin)) : Math.floor((target.innerWidth() - margin) / (settings.itemWidth + margin));
        if (column < 1) {
            column = 1;
        }
        if (settings.maxColumn > 0 && column > settings.maxColumn) {
            column = settings.maxColumn;
        }
        marginStart = settings.autoWidth ? settings.margin : (target.innerWidth() - (settings.itemWidth + settings.margin) * column) / 2;
        if (marginStart < margin) {
            marginStart = margin;
        }
        itemWidth = settings.autoWidth ? (target.innerWidth() - margin * (column + 1)) / column : settings.itemWidth;
        if (settings.minWidth && itemWidth < settings.itemWidth) {
            itemWidth = settings.itemWidth;
        }
        for (i = 0; i < column; i += 1) {
            aryX.push(marginStart + (margin + itemWidth) * i);
            aryY.push(margin);
        }
        var start = target.children("div:hidden").eq(0).index();
        target.children("div").each(function(index, element) {
            var num = settings.sort === "y" ? aryY.indexOf(Math.min.apply(Math, aryY)) : index % column, top = aryY[num];
            $(element).css({position: "absolute", width: itemWidth, left: aryX[num], top: top , margin:0});
            if (index - start >= 0) {
                $(element).delay((index - start) * 50).fadeIn();
            }
            aryY[num] += $(element).outerHeight(true) + margin;
        });
        target.css({height:Math.max.apply(Math, aryY)})
    }
    $.fn.extend({
        initACWF: function(options) {
            settings = $.extend(settings, options);
            target = this;
            wf();
        },
        setACWF: function(options) {
            settings = $.extend(settings, options);
            wf();
        }
    });
}($));