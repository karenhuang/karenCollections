$(function() {
    $.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name){
        return $.getUrlVars()[name];
      }
    });
    function setSize(){
        $("#gallery figure").each(function(i,e){
            var t= $(e);
            t.css({
                paddingTop:(t.data("h")*1)/(t.data("w")*1)*100+"%",
                position:"relative"
            });
        });
        $("img.lazy[src='']").lazyload({
              effect : "fadeIn"
        });
        $(window).resize();
    }

    var nextPage = 1;
    var loading = false;
    $(document).scrollTop(0);
    getContent();
    function getContent() {
        if (loading || nextPage == "end") return;
        ajaxLoad();
    }

    function ajaxLoad(){
        if(nextPage == "end") return false;
        loading = true;
        $("#wf-loading").show();
        $("#wf-more").hide();
        var ajaxData = { p: nextPage };
        if ($.getUrlVar("t") + "" != "undefined") ajaxData.t = $.getUrlVar("t");
        if ($.getUrlVar("k") + "" != "undefined") ajaxData.k = $.getUrlVar("k");
        if ($.getUrlVar("s") + "" != "undefined") ajaxData.k = $.getUrlVar("s");
        $.ajax({ type: "POST", dataType: "text", url: "data.txt", data: ajaxData,
            success: function (msg) {
                if (msg != "end") {
                    $("#gallery").append(msg);
                    if (nextPage == 1) {
                        init();
                    }else{
                        setSize();
                    }
                    nextPage += 1;
                } else {
                    nextPage = msg;
                }
                loading = false;
                $("#wf-loading").hide();
                $("#wf-more").show();
            },
            error: function () {
                alert("Error");
                loading = false;
                $("#wf-loading").hide();
                $("#wf-more").show();
            }
        })
    }
    function init() {
        setSize();
        $("#gallery").initACWF();
        $(window).resize(function() {
            $("#gallery").setACWF();
        }).resize();
        $("#wf-more").on("click",function() {
            if (!loading) {
                ajaxLoad();
            }
        });
    }
    
});