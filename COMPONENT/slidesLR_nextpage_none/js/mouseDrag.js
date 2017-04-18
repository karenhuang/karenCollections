$(function() {
    var $element = $("#silderT2"),//輪播最大外框
        $bigimgLi = $element.find(".pt_bannerList li"),
        $smallimgLi = $element.find(" .pt_btnList li"),
        $btnCont = $(".btnCont"),
        imgMax = $bigimgLi.length,
        startPos, nowAnimate,
        imgNow = 0,
        imgNext = null,
        nextClick = 5000,
        timer,
        dragState = false,
        dragStartX = 0,
        dragDate = null,
        dpos = null,//紀錄拖動向左或向右的起始位置
        pageTotal = Math.ceil($smallimgLi.length/6),//小圖的總頁數(六張為一頁)
        pageNow = 1, //小圖現在所在頁數
        ainValue = 0;//目前移動的正負值

    //初始預設
    $smallimgLi.eq(imgNow).addClass("on");
    $bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
    if(imgMax<2){ $(".pt_next").hide(); $(".pt_prev").hide(); }
    if(imgMax<7){ $(".prevPage").hide(); $(".nextPage").hide(); }
    
    $(window).resize(function(){
        var hidden_W = $bigimgLi.width()*0.9;//預留10%給左右箭頭
        $(".btnhidden").css({'width':hidden_W});
        $smallimgLi.css({'width':(hidden_W-(6*6))/6});//先扣掉li的margin左右3px的寬度
        $(".pt_btnList").css({'width':($smallimgLi.outerWidth(true)+1)*$smallimgLi.length});
        //控制大圖hover後 小圖列出現 
        $(window).width()>980 ? $btnCont.stop().css({'bottom':'-90px'}) : $btnCont.stop().css({'bottom':0});
        $(".md_slideShow").hover(
            function(){$btnCont.stop().animate({'bottom':0},300);},
            function(){$(window).width()>980 ? $btnCont.stop().animate({'bottom':'-90px'},300) : $btnCont.stop().animate({'bottom':0},300);}
        );        
    }).resize();

    function move(num) {
        clearInterval(timer);
        imgNext = num;
        startPos = imgNext > imgNow ? 100: -100;
        nowAnimate = imgNext > imgNow ? "-100%": "100%";          
        imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;
        $smallimgLi.eq(imgNext).addClass("on").siblings().removeClass("on");      
        if(dragState){startPos = (startPos+dpos/$bigimgLi.width()*100);}//重新計算拖動後的起始位置
        $bigimgLi.eq(imgNow).stop().animate({left: nowAnimate});
        $bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
        .stop().animate({left: "0%"}, function() {
            imgNow = imgNext;
            imgNext = null;
            timer = setInterval(autoMove, nextClick);
        }).siblings().removeClass('active');
    }
 
     //控制小圖換頁的左右箭頭消失出現
    $(".prevPage").hide();
    function smallimgRLBtn(){
        if(pageNow==1){$(".prevPage").hide();$(".nextPage").show();}
        else if(pageNow>1 && pageNow<pageTotal){$(".prevPage").show();$(".nextPage").show();}
        else if(pageNow==pageTotal){$(".nextPage").hide();$(".prevPage").show();}           
    }

    //小圖左右按鈕
    $(".nextPage").click(function(){
        if(pageTotal>pageNow){
            pageNow+=1; ainValue-=1;
            $(this).siblings('.btnhidden').find(".pt_btnList").stop().animate({ 'left': ainValue*100+"%"},500);  
            smallimgRLBtn();
        }
        return false;
    });
    $(".prevPage").click(function(){
        if(pageNow>1){
            pageNow-=1; ainValue+=1; 
            $(this).siblings('.btnhidden').find(".pt_btnList").stop().animate({'left': ainValue*100+"%"},500);            
            smallimgRLBtn(); 
        }
        return false;
    });   

    //大圖左右按鈕
    $(".pt_next").on("mousedown", function() {
        clearInterval(timer);
        if (imgNext == null && imgMax>1) {
            imgNext = imgNow + 1;
            move(imgNext);
        }
        return false;
    });

    $(".pt_prev").on("mousedown", function() {
        clearInterval(timer);
        if (imgNext == null  && imgMax>1) {
            imgNext = imgNow - 1;
            move(imgNext);
        }
        return false;
    });

    $smallimgLi.on("mousedown", function(e) {      
        e.preventDefault(); //擋掉圖片被拖拉而造成無法執行後續的move(_this.index())
        clearInterval(timer); 
        var _this = $(this);
        if (imgNext != null || _this.hasClass("on")) return;
        move(_this.index());
    });

    $bigimgLi.on("mousedown touchstart", function(e) {
        clearInterval(timer); 
        //防止被drag以致後續動作無法繼續
        if(e.type == "mousedown"){   e.preventDefault();}        
        if (!dragState && imgNext == null && imgMax>1) {
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();
        }
    });

    $bigimgLi.on("mousemove touchmove", function(e) {
        if (dragState) {
            var x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
            if(new Date() - dragDate<100)return false; 
            dpos =x-dragStartX;
            var dis = dpos/$bigimgLi.width()*100;
            $(this).css({ left:dis+"%" });
            if(x > dragStartX){
                $bigimgLi.eq( (($(this).index()-1)+imgMax)%imgMax ).css({left:(-100+Math.abs(dpos)/$bigimgLi.width()*100)+"%"});
            }else if(x < dragStartX){
                $bigimgLi.eq(($(this).index()+1)%imgMax).css({left:(100-Math.abs(dpos)/$bigimgLi.width()*100)+"%"});
            } 
        }
    });

    $bigimgLi.on("mouseup touchend mouseleave", function(e) {
        if (dragState) {
            var passDate = new Date() - dragDate;
            var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 130) { 
                if(endX > dragStartX){
                    imgNext =imgNow - 1;
                    $bigimgLi.eq((imgNow+1)%imgMax).css({left:"100%"});
                }else{
                    imgNext =imgNow + 1;
                    $bigimgLi.eq( ((imgNow-1)+imgMax)%imgMax ).css({left:"-100%"});
                }
                move(imgNext);
                $(this).find('a').click(function() {return false});
            } else {$(this).find('a').off();}
        } else {$(this).find('a').off();}
        dragState = false;
    });
    function autoMove() { $(".pt_next").mousedown();}
    timer = setInterval(autoMove, nextClick);
});
