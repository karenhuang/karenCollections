$(function() {
    $("#menuBtn").click(function() {
        $("body").toggleClass('leftmenu');
    });
    $('.leftmenubg').click(function(event) {
        $("body").toggleClass('leftmenu');
    });

    $("#goTop").hide();

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $("#goTop").show();
        } else {
            $("#goTop").hide();
        }
    });

    $("#goTop").click(function() {
        $("html,body").stop().animate({
            scrollTop: 0
        });
        return false;
    });

    if($(window).width()>720){
        $(".hightspeedBg, .hspeedtxt").hover(
            function(){
               $('.hspeedtxt').find('img').stop().animate({width:'110%', left:'-60px'});
               $('.half').stop().animate({'marginLeft':'-300px'});
            },
            function(){
                $(".hspeedtxt").find('img').stop().animate({width:'100%', left:0});
                $('.half').stop().animate({'marginLeft':'-220px'});
            }
        );

        $(".normallBg, .normalltxt").hover(
            function(){
               $(".normalltxt").find('img').stop().animate({width:'110%', left:'40px'});
               $('.half').stop().animate({'marginLeft':'-140px'});
            },function(){
                $(".normalltxt").find('img').stop().animate({width:'100%', left:0});
                $('.half').stop().animate({'marginLeft':'-220px'});
            }
        );
    }else{
        $(".hightspeedBg, .hspeedtxt").unbind('hover');
        $(".normallBg, .normalltxt").unbind('hover');  
    }



});

$(window).resize(function(event) {
    if($(window).width()>720){
        $(".hightspeedBg, .hspeedtxt").hover(
            function(){
               $('.hspeedtxt').find('img').stop().animate({width:'110%', left:'-60px'});
               $('.half').stop().animate({'marginLeft':'-300px'});
            },
            function(){
                $(".hspeedtxt").find('img').stop().animate({width:'100%', left:0});
                $('.half').stop().animate({'marginLeft':'-220px'});
            }
        );

        $(".normallBg, .normalltxt").hover(
            function(){
               $(".normalltxt").find('img').stop().animate({width:'110%', left:'40px'});
               $('.half').stop().animate({'marginLeft':'-140px'});
            },function(){
                $(".normalltxt").find('img').stop().animate({width:'100%', left:0});
                $('.half').stop().animate({'marginLeft':'-220px'});
            }
        );
    }
    else{
        $(".hightspeedBg, .hspeedtxt").unbind('hover');
        $(".normallBg, .normalltxt").unbind('hover');  
    }
});