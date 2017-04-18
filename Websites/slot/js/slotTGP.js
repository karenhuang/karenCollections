
$.fn.jackpotList = function(){
    var element = $(this),
        ele_ul = element.find('.jackpotList'),
        ele_li = ele_ul.find('li'),
        liMax = ele_li.length,
        liNow = 0,
        liNext = false,
        timer;

        ele_li.eq(liNow).addClass('active');
        function moveList(){
            if(liNext == false){
                liNext = true;
                liNext = (liNow+1)%liMax;
                ele_li.eq(liNow).css({top:0}).stop().animate({top:"-100%"},600);
                ele_li.eq(liNext).css({top:"100%"}).addClass('active').stop().animate({top:0},600,function(){
                    liNow = liNext;
                    liNext = false;
                }).siblings().removeClass('active');               
            }
        }
        timer = setInterval(moveList, 3000);
    return element;
}


$.fn.threeSlideShow = function(){
    var $element = $(this),
        $bigimgUl = $element.find(".pt-slide"),
        $bigimgLi = $bigimgUl.find("li"),
        $bigimg = $bigimgLi.find("img"),
        $nextBtn = $element.find(".nextBtn"),
        $prevBtn = $element.find(".prevBtn"),
        imgMax = $bigimgLi.length,
        // autoLength = 0,
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
    $bigimgLi.css({left:"200%"});
    $bigimgLi.eq(imgNow).css({left:"0%"}).addClass('active');
    $bigimgLi.eq(imgNow-1).css({left:"-100%"});
    $bigimgLi.eq(imgNow+1).css({left:"100%"});
    if(imgMax == 3){
        var clone_li = $bigimgLi.clone();
        $bigimgUl.append(clone_li.removeClass().css({left:"200%"}));
        $bigimgLi = $bigimgUl.find("li");
         imgMax = $bigimgLi.length;
    } 


    function directionFn() {
        clearInterval(timer);       
        if(imgNext > imgNow){ //往左滑 起始點由正 移動到負;
            startPos = 100; // 起始點 正100
            nowAnimate = -100; //往左邊 -100方向移動
            imgNext %= imgMax; // 下一張
            imgNextPrev = (imgNext+1)%imgMax; //imgNext的右邊一張圖片
            imgNowPrev = ((imgNow - 1)+imgMax)%imgMax; //imgNow 的左邊一張圖片
            imgAnimate();           
        }else{//往右滑 起始點由負 移動到正;
            startPos = -100; // 起始點 負100
            nowAnimate = 100; //往右邊 100方向移動
            imgNext = (imgNext+imgMax)%imgMax; // 下一張
            imgNextPrev = (imgNext-1)%imgMax; //imgNext的左邊一張圖片
            imgNowPrev = (imgNow + 1)%imgMax;  //imgNow 的右邊一張圖片
            imgAnimate();
        }
    }
    function imgAnimate(){
        clearInterval(timer);  
        $bigimgLi.eq(imgNextPrev).css({left: startPos*2+dragDis +"%"}).stop().animate({left: nowAnimate*(-1)+"%"},animateTime);
        $bigimgLi.eq(imgNow).stop().animate({left: nowAnimate+"%"},animateTime);
        $bigimgLi.eq(imgNowPrev).css({left: startPos*(-1)+dragDis+"%"}).stop().animate({left:nowAnimate*2+"%"},animateTime);
        $bigimgLi.eq(imgNext).css({left:startPos+dragDis+"%"}).addClass('active').stop().animate({left:"0%"},animateTime,function(){
            imgNow = imgNext;
            imgNext = null;
            timer = setInterval(autoMove, nextClick);
        }).siblings().removeClass('active');
    }
    function autoMove() { $nextBtn.click(); }
    $nextBtn.on("click",function(){
        if(imgNext==null && imgMax>3){
            imgNext = imgNow+1;
            dragDis = 0;
            directionFn();
        }
    });
    $prevBtn.on("click",function(){
        if(imgNext==null && imgMax>3){
            imgNext = imgNow-1;
            dragDis = 0;
            directionFn();     
        }
    });
    $bigimgLi.on("mousedown touchstart", function(e) {
        clearInterval(timer); 
        if(e.type == "mousedown"){   e.preventDefault();} //防止被drag以致後續動作無法繼續;       
        if (!dragState && imgNext == null && imgMax>3) {
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();           
        }
    });
    $bigimgLi.on("mousemove touchmove", function(e) {
        var x = 0;
        var _index;
        if (dragState) {
            x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
            dragDis =(x - dragStartX)/$bigimgLi.width()*100;
            _index = $(this).index();
            $(this).css({ left:dragDis+"%" });
            $bigimgLi.eq( ((_index-1)+imgMax)%imgMax ).css({left:-100+dragDis+"%"});//imgNext;
            $bigimgLi.eq((_index+1)%imgMax).css({left:100+dragDis+"%"}); //imgNowPrev (往左:imgNow 的左邊一張圖片,往右:imgNow 的右邊一張圖片);
            if(x < dragStartX){//往左;
                $bigimgLi.eq((_index+2)%imgMax).css({left:200+dragDis+"%"}); //imgNextPrev :imgNext的右邊一張圖片;        
            }else{//往右;
                $bigimgLi.eq( ((_index-2)+imgMax)%imgMax ).css({left:-200+dragDis+"%"});//imgNextPrev :imgNext的左邊一張圖片;
            } 
        }
    });
    $bigimgLi.on("mouseup touchend mouseleave", function(e) {
        var _index;
        if (dragState) {
            var passDate = new Date() - dragDate;
            var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            _index = $(this).index();
            if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 120 && endX != dragStartX) { 
                imgNext = endX > dragStartX?imgNow - 1:imgNow + 1;
                directionFn();
                $(this).find('a').click(function() { return false });
            } else {
                $(this).find('a').off();
                $(this).animate({ left:"0%"});
                //處理快速滑動的歸位設定
                $bigimgLi.eq( ((_index-1)+imgMax)%imgMax ).animate({left:-100+"%"});//imgNext ;
                $bigimgLi.eq((_index+1)%imgMax).animate({left:100+"%"},function(){
                    timer = setInterval(autoMove, nextClick);
                });//imgNowPrev (往右:imgNow 的右邊一張圖片, 往左:imgNow 的左邊一張圖片);
                if(endX<dragStartX){//往左;
                    $bigimgLi.eq((_index+2)%imgMax).animate({left:200+"%"}); //imgNextPrev :imgNext的右邊一張圖片;                     
                }else{//往右;
                    $bigimgLi.eq( ((_index-2)+imgMax)%imgMax ).animate({left:-200+"%"});//imgNextPrev :imgNext的左邊一張圖片;
                } 
            }
        } else {$(this).find('a').off();}
        dragState = false;
    });
    timer = setInterval(autoMove, nextClick);
    return $element;
}

$.fn.winnerList = function(){
    var element = $(this),
        ele_ul = element.find('.bigCont'),
        ele_li = ele_ul.find('li'),
        liMax = ele_li.length,
        liNow = 0,
        topVal = 0,
        timer;

        //第一次設定li位置
        ele_li.each(function(){
            $(this).css({top: topVal});
            $(this).attr("data-top",topVal);
            topVal+=70;
        });
        function moveList(){
            ele_li.each(function(){
                $(this).stop().animate({top:$(this).attr("data-top")-70},function(){
                    $(this).attr("data-top", $(this).attr("data-top")-70);
                    if($(this).attr("data-top")<0){
                        $(this).css({top: liMax*70 + parseInt($(this).attr("data-top"),10)});
                        $(this).attr("data-top",liMax*70 + parseInt($(this).attr("data-top"),10));
                    }
                });
            });
        }
        timer = setInterval(moveList, 3000);
}



$(function(){
    $(".md-jackpot").jackpotList();
    $(".th-slide").threeSlideShow();
    $(".pt-winnerlist").winnerList();

    //open search bar
    $(".md-search button").on("click",function(){
        $(this).parent().addClass('show');
        $("body").addClass('searchOpen')
    });
    //close search bar
    $(".searchTxt a").on("click",function(e){
        e.preventDefault();
        $(this).parents(".md-search").removeClass('show');
        $("body").removeClass('searchOpen')
    });
    // 獎池按鈕
    $("body").addClass('rightFixed');
    $(".th-fixedBtn").addClass('on');
    $(".th-fixedBtn").on("click",function(){
        $(this).toggleClass('on');
        $("body").toggleClass('rightFixed');
    });

    //客製化scrollbar
    $("#thjackCont").mCustomScrollbar({ axis:"y"});
    $("#menuSelect").mCustomScrollbar({ axis:"x"});
    
    //
    var menuSelectW = 0;
    $(".pt-menuSelect li").each(function(){ menuSelectW+=$(this).width();});
    $(".pt-menuSelect").css({width:menuSelectW+30});


//------獎池累計--------------------------------------------------
    var totalNum = "100020000.00";
    var tagNum   = "100000000.00";
    function addNum(){
        var arrayStr =[];
        var str="";
        if(tagNum!==totalNum){
            arrayStr = tagNum.toString().split("");
            arrayStr.splice(arrayStr.length-3,1);
            for(var i=0; i<arrayStr.length;i++){
                str += arrayStr[i];
            }
            str++;
            tagNum = str.toString().substring(0, str.toString().length-2)+"."+str.toString().substring(str.toString().length-2);
            $('#output').text(formatNumber(str));            
        }
    }
    function formatNumber(num, glue) {
        if(isNaN(num)) { return NaN;}
        var glue = (typeof glue== 'string') ? glue: ',';
        var integerDigits = num.toString().split("");
        var threeDigits = [];
        var limit = 2;
        while (integerDigits.length > limit) {
            threeDigits.unshift( integerDigits.splice(integerDigits.length - limit, limit).join("") );
            limit = 3;
        }
        threeDigits.unshift(integerDigits.join(""));
        integerDigits = threeDigits.join(glue);
        integerDigits=integerDigits.substring(0, integerDigits.length-3)+"."+integerDigits.substring(integerDigits.length-2);
        return integerDigits;
    }
    setInterval(addNum,200);




//------resize時調整fixedmenu及右邊獎池按鈕高度-------------------------------------------------
    function fixmenu(){
        if($(window).scrollTop()>$(".th-slide").offset().top+$(".th-slide").height()){
            $("body").addClass('menuFixed');
            if($(window).width()>720){ 
                $(".th-fixedBtn").css({top:50});
                $(".th-jackpot").css({ height:$(window).height()-50,top: 50});
            }else{ 
                $(".th-fixedBtn").css({top:100});
                $(".th-jackpot").css({ height:$(window).height()-100,top: 100});
            }
            
            
        }else{
            $("body").removeClass('menuFixed');
            if($(window).width()>720){
                $(".th-fixedBtn").css({top: $(".th-slide").offset().top+$(".th-slide").height()+50});
                $(".th-jackpot").css({  height:$(window).height()-$(".gp-midCont").offset().top-50+$(window).scrollTop(),top:$(".gp-midCont").offset().top+50-$(window).scrollTop() });
            }else if($(window).width()<720){
                $(".th-fixedBtn").css({top: $(".th-slide").offset().top+$(".th-slide").height()+100});
                $(".th-jackpot").css({  height:$(window).height()-$(".gp-midCont").offset().top-100+$(window).scrollTop(),top:$(".gp-midCont").offset().top+100-$(window).scrollTop() });
            }

        }        
    }

    $(window).scroll(function(){fixmenu()}).scroll();

    $(window).load(function(){
        $(window).resize(function(){  
            //reset game list height 
            $(".th-listCont ul li").css({height: $(".th-listCont li img").eq(0).height()+10+ $(".th-listCont li .gp-ptCont").height() })
            fixmenu();
            
        }).resize();
    });
});


