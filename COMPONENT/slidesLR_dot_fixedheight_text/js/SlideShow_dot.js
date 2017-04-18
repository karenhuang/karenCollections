
//共用輪播plugin
$.fn.sliderShow = function(){
  var element = $(this),//輪播最大外框
      bigimgUl = element.find(".pt-bannerList"),
      bigimgLi = element.find(".pt-bannerList li"),
      bigimg = element.find(".pt-bannerList li img"),
      ptPrev = element.find(".pt-prev"),
      ptNext = element.find(".pt-next"),
      dotUl = element.find(".pt-dot ul"),
      bigimgLi_W = 100/ bigimgLi.length,
      dotTag = "",
      dotli,
      imgMax = bigimgLi.length,
      startPos, nowAnimate,
      imgNowR = 0,
      imgNextR = 0,
      imgNow = 0,
      imgNext = null,
      nextClick = 4000,
      animateV = 500,
      timer,
      dragState = false,
      dragStartX = 0,
      dragDate = null,
      dpos = null,//紀錄拖動向左或向右的起始位置
      moveState = false;//判斷是否移動中 

  //初始預設
  bigimgUl.css({width: bigimgLi.length * 100+"%"});
  bigimgLi.css({width: bigimgLi_W +"%"}).eq(imgNow).addClass('active').siblings().css({"left":'100%'});
  if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }
  if(imgMax>1){
    for(var i=0; i<imgMax; i++){dotTag+="<li></li>" ;}
    dotUl.append(dotTag);
  }
  dotli = element.find(".pt-dot ul li");
  dotli.eq(imgNow).addClass('active');   

  function moveNext(num) {
    clearInterval(timer);
    moveState = false//開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? bigimgLi_W: -bigimgLi_W;
    nowAnimate = imgNext > imgNow ? -bigimgLi_W+"%": bigimgLi_W+"%";          
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    if(dragState){startPos = (startPos+dpos/bigimgLi.width()*bigimgLi_W);}//重新計算拖動後的起始位置
    dotli.eq(imgNext).addClass("active").siblings().removeClass("active");
    bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
    bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
    .stop().animate({left: "0%"},animateV, function() {
      imgNow = imgNext;
      imgNext = null;
      timer = setInterval(autoMove, nextClick);
    });
  }   

  //大圖左右按鈕
  ptNext.on("mousedown", function() {
    clearInterval(timer);
    if (imgNext == null && imgMax>1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  ptPrev.on("mousedown", function() {
    clearInterval(timer);
    if (imgNext == null  && imgMax>1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
  });
  
  dotli.on("click",function(e){
    var _this = $(this);
    clearInterval(timer);
    if(e.type == "mousedown"){   e.preventDefault();}  
    if (imgNext != null || _this.hasClass("active")) return;
    moveNext(_this.index());
  });

  bigimgLi.on("mousedown touchstart", function(e) {
    clearInterval(timer); 
    //防止被drag以致後續動作無法繼續
    if(e.type == "mousedown"){   e.preventDefault();}        
    if (!dragState && imgNext == null && imgMax>1) {
      dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      dragState = true;
      dragDate = new Date();
    }
  });

  bigimgLi.on("mousemove touchmove", function(e) {
    moveState = true;
    if (dragState && moveState) {
      var x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
      dpos =x-dragStartX;
      $(this).css({ left:dpos/bigimgLi.width()*bigimgLi_W+"%" });
      if(x > dragStartX){
        bigimgLi.eq( (($(this).index()-1)+imgMax)%imgMax ).css({left:(-bigimgLi_W+Math.abs(dpos)/bigimgLi.width()*bigimgLi_W)+"%"});
      }else if(x < dragStartX){
        bigimgLi.eq(($(this).index()+1)%imgMax).css({left:(bigimgLi_W-Math.abs(dpos)/bigimgLi.width()*bigimgLi_W)+"%"});
      } 
    }
  });

  bigimgLi.on("mouseup touchend mouseleave", function(e) {
    if (dragState) {
      var passDate = new Date() - dragDate;
      var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 150 && endX!=dragStartX) { 
        imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
        moveNext(imgNext);
        $(this).find('a').click(function() {return false});             
      } else {
        if(endX==dragStartX){$(this).find('a').off(); }else{ $(this).find('a').click(function() {return false});  }
          //處理快速滑動的歸位設定
        if(endX > dragStartX){
          bigimgLi.eq(imgNow).stop().animate({left: "0%"},animateV);
          bigimgLi.eq((imgNow-1)%imgMax).stop().animate({left: -bigimgLi_W+"%"},animateV);
        }else{
          bigimgLi.eq(imgNow).stop().animate({left: "0%"},animateV);
          bigimgLi.eq((imgNow+1)%imgMax).stop().animate({left: bigimgLi_W+"%"},animateV);
        }                
      }
    } else {$(this).find('a').off();}
    dragState = false;
  });
  function autoMove() { ptNext.mousedown();}
  timer = setInterval(autoMove, nextClick);
  return element;
}


$(function(){
  $(".th-sliderShow").sliderShow();
});