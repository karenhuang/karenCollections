$(function() {
    var $element = $("#silderT1"),
        $bigimgLi = $element.find(".pt_bannerList li"),
        $smallimgLi = $element.find(" .pt_btnList li"),
        $appendDiv = $element.find(".appendDiv"),
        slices = 10,
        slicesH = 5,
        totleSlice = slices*slicesH,
        sliceWidth = $bigimgLi.width() / slices,
        sliceHeight = $bigimgLi.height() / 5,
        sliceDiv = "",
        imgMax = $bigimgLi.length,
        imgNow = 0,
        imgNext = null,
        nextClick = 5000,
        animateTime=600,
        timer,
        dragElem = null,
        dragState = false,
        dragStartX = 0,
        dragDate= null,
        clickDate = null,
        totleTimes = totleSlice-1;//0~49格

    for (var i = 0; i < totleSlice; i++) {
        var verticalIndex = Math.floor(i/10) * 20,//0~80%
            levelIndex = i % 10 * 10;//0~90%        
        //new div and new img
        var dCont = $("<div></div>");
        var dImg = $("<img>");
        //寬切成十分之一所以img寬要變成1000%相乘後才會為正確大小=100%,長度亦然
        dImg.css({
            top: verticalIndex*(-5)+'%',
            left: levelIndex*(-10)+'%',
            width:'1000%',
            height:'500%'
        });
        dImg.attr("src",$bigimgLi.eq(0).find('img').attr('src'));
        dCont.css({
            top:verticalIndex+'%',
            left:levelIndex+'%',
            width:Math.floor(100/slices)+'%',
            'padding-top':'10%'
        }).append(dImg);
        $appendDiv.append(dCont);
    }        
   

    $bigimgLi.eq(imgNow).css({zIndex:5});
    if (imgMax==1){ $(".pt_next").hide(); $(".pt_prev").hide();}
    
    
    function move(num) {
        var $dd=$appendDiv.find('div');
        clearInterval(timer);
        imgNext = num;
        $smallimgLi.eq(imgNext).addClass("on").siblings().removeClass("on");
        $bigimgLi.eq(imgNow).css({zIndex:5}).siblings().css({zIndex:0});
        $bigimgLi.eq(imgNext).css({zIndex:10});
        //append 的div在切換下一張的設定
        $appendDiv.css({zIndex:15}).find('img').attr('src',$bigimgLi.eq(imgNow).find('img').attr('src')); 

        $dd.css({'width':'10%'});
        function imgAnimate(eqIndex){
            totleTimes=eqIndex;
            if(totleTimes>0){  
                $dd.eq(totleTimes).animate({'width':0},30,function(){
                   totleTimes--; 
                   imgAnimate(totleTimes);
                });             
            }else if(totleTimes==0){
                $appendDiv.css({zIndex:0});
                $bigimgLi.eq(imgNext).animate({left:"0%"},function(){
                    imgNow = imgNext;
                    imgNext = null;
                    totleTimes = totleSlice-1;
                    timer=setInterval( autoMove,nextClick);
                });                 
            }   
        }
        imgAnimate(totleTimes);
    }


    $(".pt_next").on("mousedown",function() {
        clearInterval(timer);
        if (imgNext == null && imgMax>1) {
            imgNext = (imgNow + 1)%imgMax;
            move(imgNext);
        }
        return false;
    });

    $(".pt_prev").on("mousedown",function() {
        clearInterval(timer);
        if (imgNext == null && imgMax>1) {
            imgNext = ((imgNow - 1)+imgMax)%imgMax;
            move(imgNext);
        }
        return false;
    });

    $smallimgLi.on("mousedown touchstart",function(e) {
        e.preventDefault();//擋掉圖片被拖拉而造成無法執行後續的move(_this.index())
        clearInterval(timer);
        var _this = $(this);
        if (imgNext != null || _this.hasClass("on")) return false;
        move(_this.index() );
        return false;
    });

    $bigimgLi.on("mousedown touchstart",function(e){
        clearInterval(timer);
        //防止被drag以致後續動作無法繼續
        if(e.type == "mousedown"){   e.preventDefault();}  
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
                imgNext = x > dragStartX ? (imgNow + 1)%imgMax : ((imgNow - 1)+imgMax)%imgMax;
                move(imgNext);
                $(this).find('a').click(function(){return false});
            }else{
                $(this).find('a').off();
            }  
            dragState = false;
        }else{
            $(this).find('a').off();
        }  
    });

    function autoMove(){$(".pt_next").mousedown()}
    timer=setInterval( autoMove,nextClick);

});
