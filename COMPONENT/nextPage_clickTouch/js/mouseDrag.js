$(function() {
    var element = $("#th_sliderShow"),
        md_slideShow = element.find(".md_slideShow"),
        pt_imgCont = element.find(".pt_imgCont"),
        ulElem = element.find(".pt_imgCont ul"),
        liElem = element.find(".pt_imgCont ul li"),
        imgMax = liElem.length,
        imgNow = 0,
        leftDistance = 4,
        imgNext = null,
        li_W = 240,//css 設定240px img設定230px;
        liPercen = 4,
        dragState = false,
        dragStartX = 0,
        dragDate = null;


    liElem.eq(imgNext).addClass('active');
    ulElem.css({"width":li_W * imgMax});
    function setSize(){
        pt_imgCont.attr("style","");
        if($(".pt_imgCont").width()>=960){
            pt_imgCont.css({"width": li_W*4});
            leftDistance = 4;
        }else if($(".pt_imgCont").width()<960 && $(".pt_imgCont").width()>=720){
            pt_imgCont.css({"width": li_W*3});
            leftDistance = 3;
        }else if($(".pt_imgCont").width()<720 && $(".pt_imgCont").width()>=480){
            pt_imgCont.css({"width": li_W*2});
            leftDistance = 2;
        }else if($(".pt_imgCont").width()<480){
            pt_imgCont.css({"width": li_W*1});
            leftDistance = 1;
        }     
    }

    $(window).resize(function(){
        setSize();
    }).resize();

    function resetElement(){
        ulElem = element.find(".pt_imgCont ul");
        liElem = element.find(".pt_imgCont ul li");
        imgNow = 0;
        imgNext = null;
        liElem.removeClass('active').eq(imgNow).addClass('active');    
    }

    function move() {
        if(imgNext > imgNow){
            for(var i=0; i<leftDistance; i++){  liElem.eq(i).clone().appendTo(ulElem); }
            $(".pt_imgCont ul").css({
                "width":li_W * $(".pt_imgCont ul li").length
            }).stop().animate({"left":li_W*leftDistance*-1},function(){
                $(".pt_imgCont ul").css({"left":0});
                for(var i=0; i<leftDistance; i++){  liElem.eq(i).remove(); }
                resetElement();
            });
        }else{
            for(var i=0; i<leftDistance; i++){  liElem.eq((imgMax-1)-i).clone().prependTo(ulElem); }
            $(".pt_imgCont ul").css({
                "left":li_W*leftDistance*-1,
                "width":li_W * $(".pt_imgCont ul li").length
            }).stop().animate({"left":0},function(){
                for(var i=0; i<leftDistance; i++){ liElem.eq((imgMax-1)-i).remove(); }
                resetElement();
            });    
        }
    }


    $(".pt_next").on("mousedown touchstart", function() {
        if (imgNext == null && imgMax>1) {
            setSize();
            imgNext = imgNow + leftDistance;
            move();
        }
        return false;
    });
    $(".pt_prev").on("mousedown touchstart", function() {
        if (imgNext == null  && imgMax>1) {
            setSize();
            imgNext = imgNow - leftDistance;
            move();
        }
        return false;
    });

    ulElem.on("mousedown touchstart", function(e) {
        //防止被drag以致後續動作無法繼續
        if(e.type == "mousedown"){  e.preventDefault();}  
        if (!dragState && imgNext == null && imgMax>1) {
            setSize(); 
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();
        }
    });

    ulElem.on("mouseup touchend mouseleave", function(e) {
        if (dragState) {
            var passDate = new Date() - dragDate;
            var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 150) { 
                endX > dragStartX ? $(".pt_prev").click() : $(".pt_next").click();
                $(this).find('a').click(function() {return false});
            } else {$(this).find('a').off();}
        } else {$(this).find('a').off();}
        dragState = false;
    });

});
