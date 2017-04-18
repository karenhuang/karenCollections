$(document).ready(function(){
    //goTop
    $(".goTop").hide();
    $(window).scroll(function(){
        if($(this).scrollTop()>100){
            $(".goTop").fadeIn();
        } else {$(".goTop").fadeOut();}
    });
    $(".goTop").click(function(){
        $("html,body").animate({scrollTop:0},500);
    });


    //m版與PC版menu切換
    $("#menuBtn").click(function () {$("#menu").slideToggle(150);});

});

$(window).load(function () {

    if($(".m_tophd").css("display") == "none"){
        $("#menu").show();
    }else{  $("#menu").hide();  }



    //fix the size of tourtype images 避免相同classname造成length的錯誤
    for(var i=0, max= $('.figureCont').length;i<max ;i++){
        $('.figureCont:eq('+i+')>ul').css({'width': $(".figureCont").width() * $('.figureCont:eq('+i+')>ul>li').length+'px'});
        $('.figureCont:eq('+i+')>ul>li').css({ 'width': ( 100 / $('.figureCont:eq('+i+')>ul>li').length )+'%'  });
    }






    //touchChangeImages-------------------------------

    var dbclick=false;
    $(".rightbtn").click(function(){
        var _this = $(this).parent().find("li");
        setTimeout(function(){
            if(dbclick ==false){
                //防止下一次click時,前一個尚未跑完
                _this.first().stop(true,true);
                // 跑完第一個li後,把第一li物件附加到最後一個li元素的後面,並把margin-left歸零
                _this.first().animate({'margin-left': _this.first().width()*-1 },function(){
                    _this.last().css('margin-left','0').after( _this.first().css('margin-left','0') );
                });
            }
        },200)
    }).dblclick(function(){
        //dblclick時不做變化
        dbclick = true;
        setTimeout(function(){dbclick = false},300)
    });



    var Ldblclick=false;
    $(".leftbtn").click(function(){
        var _this = $(this).parent().find("li");
        setTimeout(function(){
            if(Ldblclick ==false){
                // 先把第最後一個li物件附加到第一個li元素的前面,並把margin-left改為負的li的寬度
                _this.first().before(_this.last().css('margin-left',_this.first().width()*-1).animate({'margin-left': 0}));
            }
        },200)
    }).dblclick(function(){
        //dblclick時不做變化
        Ldblclick = true;
        setTimeout(function(){Ldblclick = false},300)
    });


    var drag = {
        elemX: 0,
        startX: 0,
        state: false
    };

    $(".figureCont>ul>li").on("mousedown touchstart",function(e) {
        if (!drag.state) {
            drag.startX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            drag.state = true;
        }
        return false;
    });
    $(".figureCont>ul>li").on("mouseup touchend",function(e) {
        var moveWay =$(this).parents(".figureCont");
        if (drag.state) {
            var x = e.type == "mouseup" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (drag.elemX + x - drag.startX > 0) {
                moveWay.find(".leftbtn").click();
            } else {
                moveWay.find(".rightbtn").click()
            }
            drag.state = false;
        }
    });
});


$(window).resize(function () {
    if($(".m_tophd").css("display") == "none"){
        $("#menu").show();
    }else{  $("#menu").hide();  }



    //fix the size of tourtype images 避免相同classname造成length的錯誤
    for(var i= 0,max= $('.figureCont').length;i<max  ;i++){
        $('.figureCont:eq('+i+')>ul').css({'width': $(".figureCont").width() * $('.figureCont:eq('+i+')>ul>li').length+'px'});
        $('.figureCont:eq('+i+')>ul>li').css({ 'width': ( 100 / $('.figureCont:eq('+i+')>ul>li').length )+'%'  });
    }


});