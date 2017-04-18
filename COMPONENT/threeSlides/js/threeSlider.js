$.fn.threeSlideShow = function(){
    var element = $(this),
        bigimgUl = element.find(".pt-slide"),
        bigimgLi = bigimgUl.find("li"),
        nextBtn = element.find(".nextBtn"),
        prevBtn = element.find(".prevBtn"),
        imgMax = bigimgLi.length,
        startPos, nowAnimate,
        imgNow = 1,
        imgNext = null,
        imgNextPrev = 0,//imgNext的前導圖片;
        imgNowPrev = 0, //imgNow的前導圖片;
        nextClick = 4000,
        animateTime = 600,
        timer,
        dragState = false,
        dragStartX = 0,
        dragDate = null,
        dragDis = 0;//紀錄向左或向右拖動的距離
    //初始預設
    bigimgLi.css({left:"200%"});
    bigimgLi.eq(imgNow).css({left:"0%"}).addClass('active');
    bigimgLi.eq(imgNow-1).css({left:"-100%"});
    bigimgLi.eq(imgNow+1).css({left:"100%"});
    if(imgMax == 3){
        var clone_li = bigimgLi.clone();
        bigimgUl.append(clone_li.removeClass().css({left:"200%"}));
        bigimgLi = bigimgUl.find("li");
        imgMax = bigimgLi.length;
    } 


    function directionFn() {
        clearInterval(timer);       
        if(imgNext > imgNow){ 
            startPos = 100; // 起始點 正100
            nowAnimate = -100; //往左邊 -100方向移動
            imgNext %= imgMax; // 下一張
            imgNextPrev = (imgNext+1)%imgMax; //imgNext的右邊一張圖片
            imgNowPrev = ((imgNow - 1)+imgMax)%imgMax; //imgNow 的左邊一張圖片         
        }else{
            startPos = -100; // 起始點 負100
            nowAnimate = 100; //往右邊 100方向移動
            imgNext = (imgNext+imgMax)%imgMax; // 下一張
            imgNextPrev = (imgNext-1)%imgMax; //imgNext的左邊一張圖片
            imgNowPrev = (imgNow + 1)%imgMax;  //imgNow 的右邊一張圖片
        }
        imgAnimate();
    }
    function imgAnimate(){
        clearInterval(timer);  
        bigimgLi.eq(imgNextPrev).css({left: startPos*2+dragDis +"%"}).stop().animate({left: nowAnimate*(-1)+"%"},animateTime);
        bigimgLi.eq(imgNow).stop().animate({left: nowAnimate+"%"},animateTime);
        bigimgLi.eq(imgNowPrev).css({left: startPos*(-1)+dragDis+"%"}).stop().animate({left:nowAnimate*2+"%"},animateTime);
        bigimgLi.eq(imgNext).css({left:startPos+dragDis+"%"}).addClass('active').stop().animate({left:"0%"},animateTime,function(){
            imgNow = imgNext;
            imgNext = null;
            timer = setInterval(autoMove, nextClick);
        }).siblings().removeClass('active');
    }
    function autoMove() { nextBtn.click(); }
    nextBtn.on("click",function(){
        if(imgNext==null && imgMax>3){
            imgNext = imgNow+1;
            dragDis = 0;
            directionFn();
        }
    });
    prevBtn.on("click",function(){
        if(imgNext==null && imgMax>3){
            imgNext = imgNow-1;
            dragDis = 0;
            directionFn();     
        }
    });
    bigimgLi.on("mousedown touchstart", function(e) {
        clearInterval(timer); 
        if(e.type == "mousedown"){   e.preventDefault();}       
        if (!dragState && imgNext == null && imgMax>3) {
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();           
        }
    });
    bigimgLi.on("mousemove touchmove", function(e) {
        var x = 0;
        var _index;
        if (dragState) {
            x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
            dragDis =(x - dragStartX)/bigimgLi.width()*100;
            _index = $(this).index();
            $(this).css({ left:dragDis+"%" });
            bigimgLi.eq( ((_index-1)+imgMax)%imgMax ).css({left:-100+dragDis+"%"});//imgNext;
            bigimgLi.eq((_index+1)%imgMax).css({left:100+dragDis+"%"}); //imgNowPrev (往左:imgNow 的左邊一張圖片,往右:imgNow 的右邊一張圖片);
            if(x < dragStartX){//往左;
                bigimgLi.eq((_index+2)%imgMax).css({left:200+dragDis+"%"}); //imgNextPrev :imgNext的右邊一張圖片;        
            }else{//往右;
                bigimgLi.eq( ((_index-2)+imgMax)%imgMax ).css({left:-200+dragDis+"%"});//imgNextPrev :imgNext的左邊一張圖片;
            } 
        }
    });
    bigimgLi.on("mouseup touchend mouseleave", function(e) {
        var _index;
        if (dragState) {
            var passDate = new Date() - dragDate;
            var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            _index = $(this).index();
            if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 150 && endX != dragStartX) { 
                imgNext = endX > dragStartX?imgNow - 1:imgNow + 1;
                directionFn();
                $(this).find('a').click(function() { return false });
            } else {
                $(this).find('a').off();
                $(this).animate({ left:"0%"});
                //處理快速滑動的歸位設定
                bigimgLi.eq( ((_index-1)+imgMax)%imgMax ).animate({left:-100+"%"});//imgNext ;
                bigimgLi.eq((_index+1)%imgMax).animate({left:100+"%"},function(){
                    timer = setInterval(autoMove, nextClick);
                });//imgNowPrev (往右:imgNow 的右邊一張圖片, 往左:imgNow 的左邊一張圖片);
                if(endX<dragStartX){//往左;
                    bigimgLi.eq((_index+2)%imgMax).animate({left:200+"%"}); //imgNextPrev :imgNext的右邊一張圖片;                     
                }else{//往右;
                    bigimgLi.eq( ((_index-2)+imgMax)%imgMax ).animate({left:-200+"%"});//imgNextPrev :imgNext的左邊一張圖片;
                } 
            }
        } else {$(this).find('a').off();}
        dragState = false;
    });
    timer = setInterval(autoMove, nextClick);
    return element;
}






$(function(){
    $(".th-slide").threeSlideShow();
});

