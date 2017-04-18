$(function() {
    var $element = $("#silderT1"),
        $bigimgLi = $element.find(".pt_bannerList li"),//大圖li
        $smallimgLi = $element.find(" .pt_btnList li"),//下方按鈕小圖li
        $appendDiv = $element.find(".appendDiv"),//放產生小切圖的div的容器
        maxWidth = $bigimgLi.width(),
        slices = 10,
        sliceWidth = maxWidth / slices,//切成10等分後的寬度
        sliceDiv = "",//塞自動產生的divwithimg
        imgMax = $bigimgLi.length,
        imgNow = 0,
        imgNext = null,
        nextClick = 5000,
        animateTime=600,
        _img,
        timer,
        dragElem = null,
        dragState = false,
        dragStartX = 0,
        dragDate= null;
    //將欲添加到".appendDiv"的img切成10等分,初始抓取第一張圖片來源並寫入.appendDiv的img
    for (var i = 0; i < slices; i++) {
        sliceDiv += '<div style="width:' + sliceWidth + 'px;"><img src="" style="left:'+ sliceWidth * i *(-1) + 'px;"></div>';
    }
    _img = $bigimgLi.eq(0).find('img').attr('src');
    $appendDiv.append(sliceDiv).find('img').attr('src', _img );

    $bigimgLi.eq(imgNow).css({zIndex:5});
    if (imgMax==1){ $(".pt_next").hide(); $(".pt_prev").hide();}

    function move(num) {
        clearInterval(timer);
        imgNext = num;  
        $bigimgLi.eq(imgNow).css({zIndex:5}).siblings().css({zIndex:0});
        $smallimgLi.eq(imgNext).addClass("on").siblings().removeClass("on");
        _img = $bigimgLi.eq(imgNext).find('img').attr('src');
        $appendDiv.find('img').attr('src', _img );
        //append 的div在切換下一張的設定
        $appendDiv.css({zIndex:15})
        .find('div:nth-child(odd)').css({top: 100 * (-1) + "%" ,opacity:0,}).stop().animate({ top: 0, opacity:1 }, animateTime)
        .end().find('div:nth-child(even)').css({top: '100%',opacity:0}).stop()
        .animate({ top: 0, opacity:1}, animateTime,function(){ $appendDiv.css({zIndex:0});
        }); 
        $bigimgLi.eq(imgNext).animate({left: 0 },animateTime,function() {
            $(this).css({zIndex:10});
            imgNow = imgNext;
            imgNext = null;
            timer=setInterval( autoMove,nextClick);
        });
    }

    $(window).resize(function() {
        var $slicesDiv = $(".appendDiv div ");
        $slicesDiv.css({'width':$bigimgLi.width()/slices,});
        for(var j=0 ;  j < slices; j++){
            $slicesDiv.eq(j).find('img').css({'left': ($bigimgLi.width()/slices)*(-1)*j}).attr('src', _img);
        }
    });

    $(".pt_next").on("mousedown",function() {
        clearInterval(timer);
        if (imgNext == null && imgMax>1) {
            imgNext = (imgNow+1)%imgMax;
            move(imgNext);
        }
        return false;
    });

    $(".pt_prev").on("mousedown",function() {
        clearInterval(timer);
        if (imgNext == null && imgMax>1) {
            imgNext = ((imgNow-1)+imgMax)%imgMax;
            move(imgNext);
        }
        return false;
    });

    $smallimgLi.on("mousedown",function(e) {
        var _this = $(this);
        clearInterval(timer);
        if(e.type == "mousedown"){   e.preventDefault();} 
        if (imgNext != null || _this.hasClass("on")) return ;
        move(_this.index() );
    });


    $bigimgLi.on("mousedown touchstart",function(e){
        clearInterval(timer);
        if(e.type == "mousedown"){ e.preventDefault();} 
        if(!dragState && imgNext==null && imgMax>1){
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();
        }
    });

    $bigimgLi.on("mouseup touchend",function(e){
        if(dragState) {
            var passDate = new Date()-dragDate;
            var x = e.type == "mouseup" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if(passDate>120 && dragStartX!=x){
                imgNext = x > dragStartX ? (imgNow+1)%imgMax :((imgNow-1)+imgMax)%imgMax;;
                move(imgNext);
                $(this).find('a').click(function(){return false});
            }else{ $(this).find('a').off();}  
            if( e.type == "mouseleave" || e.type == "touchleave" ) {timer=setInterval( autoMove,nextClick)}
            dragState = false;
        }else{
            $(this).find('a').off();
        }  
    });
    function autoMove(){$(".pt_next").mousedown()}
    timer=setInterval( autoMove,nextClick);

});

