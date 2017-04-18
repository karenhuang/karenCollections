//輪播plugin
$.fn.sliderShow = function(){
  var element = $(this),//輪播最大外框
      bigimgUl = element.find(".pt-banner ul"),
      bigimgLi = element.find(".pt-banner ul li"),
      bigimg = element.find(".pt-banner li img"),
      dotUl = element.find(".pt-dot ul"),
      dotTag = "",
      dotli,
      imgMax = bigimgLi.length,
      startPos, nowAnimate,
      imgNowR = 0,
      imgNextR = 0,
      imgNow = 0,
      imgNext = null,
      nextClick = 3500,
      animateV = 800,
      timer,
      enterState =false,
      dragState = false,
      dragStartX = 0,
      dragDate = null,
      dpos = null,//紀錄拖動向左或向右的起始位置
      moveState = false;//判斷是否移動中 

  //初始預設
  bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
  if(imgMax>1){
    for(var i=0; i<imgMax; i++){dotTag+="<li></li>" ;}
    dotUl.append(dotTag);
  }
  dotli = element.find(".pt-dot ul li");
  dotli.eq(imgNow).addClass('active');   

  function moveNext(num) {
    clearInterval(timer);
    imgNext = num;    
    startPos = imgNext > imgNow ? 100: -100;
    nowAnimate = imgNext > imgNow ? "-100%": "100%";          
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    if(dragState){startPos = (startPos+dpos/bigimgLi.width()*100);}//重新計算拖動後的起始位置
    dotli.eq(imgNext).addClass("active").siblings().removeClass("active");
    bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
    bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
    .stop().animate({left: 0},animateV, function() {
      imgNow = imgNext;
      imgNext = null;
      if(!enterState){	timer = setInterval(autoMove, nextClick);  }
    });
  }   

  element.hover(function(){
  	enterState = true; 
  	clearInterval(timer);
  },function(){
  	enterState = false;
  	timer = setInterval(autoMove, nextClick);
  });

  dotli.on("mouseenter mouseleave",function(){
  	clearInterval(timer);
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
		e.preventDefault();
    if (!dragState && imgNext == null && imgMax>1) {
      dragStartX = (e.type == "mousedown" && e.which === 1) ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      dragState = true;
      dragDate = new Date();
    }
  });

  bigimgLi.on("mousemove touchmove", function(e) {
    if (dragState) {
      var x = (e.type == "mousemove" && e.which === 1) ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
      dpos =x-dragStartX;
      $(this).css({ left:dpos/bigimgLi.width()*100+"%" });
      if(x > dragStartX){
        bigimgLi.eq( (($(this).index()-1)+imgMax)%imgMax ).css({left:(-100+Math.abs(dpos)/bigimgLi.width()*100)+"%"});
      }else if(x < dragStartX){
        bigimgLi.eq(($(this).index()+1)%imgMax).css({left:(100-Math.abs(dpos)/bigimgLi.width()*100)+"%"});
      } 
    }
  });

  bigimgLi.on("mouseup touchend mouseleave", function(e) {
  	var passDate = 0;
  	var endX = 0;
    if (dragState) {
      passDate = new Date() - dragDate;
      endX = (e.type == "mouseup" || e.type == "mouseleave" && e.which === 1) ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 150 && endX!=dragStartX) { 
        imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
        moveNext(imgNext);
        $(this).find('a').click(function() {return false});
      } else {
        $(this).find('a').off();
          //處理快速滑動的歸位設定
        if(endX > dragStartX){
          bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          bigimgLi.eq(imgNow-1).stop().animate({left: -100+"%"},animateV);
        }else{
          bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          bigimgLi.eq(imgNow+1).stop().animate({left: 100+"%"},animateV);
        }                
      }
    } else {$(this).find('a').off();}
    dragState = false;
  });

  function autoMove() { 
  	clearInterval(timer);
    if (imgNext == null && imgMax>1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
  }
  timer = setInterval(autoMove, nextClick);
  return element;
}

//旅遊左右切換
$.fn.leftRight = function(){
  var element = $(this),//最大外框
      bigimgUl = element.find(".pt-banner"),
      bigimgLi = element.find(".pt-banner li"),
      bigimg = element.find(".pt-banner li a img"),
      ptPrev = element.find(".prevBtn"),
      ptNext = element.find(".nextBtn"),
      imgMax = bigimgLi.length,
      startPos, nowAnimate,
      imgNowR = 0,
      imgNextR = 0,
      imgNow = 0,
      imgNext = null,
      animateV = 500,
      dragState = false,
      dragStartX = 0,
      dragDate = null,
      dpos = null,//紀錄拖動向左或向右的起始位置
      moveState = false;//判斷是否移動中 

  //初始預設
  bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
  if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }

  function moveNext(num) {
    moveState = false//開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? 100: -100;
    nowAnimate = imgNext > imgNow ? "-100%": "100%";          
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    if(dragState){startPos = (startPos+dpos/bigimgLi.width()*100);}//重新計算拖動後的起始位置
    bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
    bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
    .stop().animate({left: 0},animateV, function() {
      imgNow = imgNext;
      imgNext = null;
    });
  }   

  //大圖左右按鈕
  ptNext.on("mousedown", function() {
    if (imgNext == null && imgMax>1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  ptPrev.on("mousedown", function() {
    if (imgNext == null  && imgMax>1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
  });

  bigimgLi.on("mousedown touchstart", function(e) {
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
      $(this).css({ left:dpos/bigimgLi.width()*100+"%" });
      if(x > dragStartX){
        bigimgLi.eq( (($(this).index()-1)+imgMax)%imgMax ).css({left:(-100+Math.abs(dpos)/bigimgLi.width()*100)+"%"});
      }else if(x < dragStartX){
        bigimgLi.eq(($(this).index()+1)%imgMax).css({left:(100-Math.abs(dpos)/bigimgLi.width()*100)+"%"});
      } 
    }
  });

  bigimgLi.on("mouseup touchend mouseleave", function(e) {
    if (dragState) {
      var passDate = new Date() - dragDate;
      var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 110  && endX!=dragStartX) { 
        imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
        moveNext(imgNext);
        $(this).find('a').click(function() {return false});
      } else {
        $(this).find('a').off();
          //處理快速滑動的歸位設定
        if(endX > dragStartX){
          bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          bigimgLi.eq(imgNow-1).stop().animate({left: -100+"%"},animateV);
        }else{
          bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          bigimgLi.eq(imgNow+1).stop().animate({left: 100+"%"},animateV);
        }                
      }
    } else {$(this).find('a').off();}
    dragState = false;
  });
  return element;
}


$(function(){
  var scrollH = 0,
      jump,
      target,
      timer;
        
  if($(".th-vipCont").length>0){ 
    jump = function (e) {
      target = location.hash;
      $('html,body').animate({scrollTop: $(target).offset().top},800, function(){
        location.hash = target;
      });
    }
    if(navigator.userAgent.toLowerCase().indexOf("firefox")!=-1){ $('html, body').show(); }else{  $('html, body').hide(); }
    if(scrollH < 100){$(".md-lv1").find("figure").removeClass('act');}
    $('.sec-ul >ul a[href^=#]').bind("click", jump);
    if(location.hash) {
      timer = setTimeout(function () {
        $('html, body').scrollTop(0).show();
        jump();
        clearTimeout(timer);
      }, 0);
    }else{
      $('html, body').show();
    }
  }

	$(".th-vip .md-slider").sliderShow();
	$(".th-travel .md-slider").leftRight();

  //jewelryCont open jewelryPop
  $(".th-jewelryCont .pt-productImg").on("mousedown",function(e){ e.preventDefault(); $("body").addClass('jewelryShow');});
  $(".jewelryPopCont").on("mousedown",function(e){e.preventDefault(); $("body").removeClass('jewelryShow');});


	$(window).scroll(function(){
		scrollH = $(this).scrollTop();
    var finalScrollH = ($(document).outerHeight(true)-$(window).innerHeight())-scrollH;
		//jewelry animate
		if($(".th-jewelry").length>0 && scrollH > $(".th-jewelry").offset().top-($(".th-jewelry").height()*0.4)){
			$(".jewelryText").addClass('show');
			$(".th-jewelry .show").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){
				$(this).find(".moreBtn").addClass('btnShow');
				$(this).find(".text").addClass('textShow');
			});
		}
		//entertainment animate
		if($(".th-entertainment").length>0 && scrollH > $(".th-entertainment").offset().top-($(".th-entertainment").height()*0.4)){
			$(".th-entertainment").addClass('bgShow').find(".md-text").addClass('textShow');
			$(".th-entertainment .textShow").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){
				$(this).siblings('.md-img').addClass('imgShow');
			});
		}
		//invest animate
		if($(".th-invest").length>0 && scrollH > $(".th-invest").offset().top-($(".th-invest").height()*0.4)){
			$(".th-invest").find(".md-text").addClass('textShow');
		}

    //entertainment right aside fixed 
    if($(".th-entertainmentList").length>0){
      //大於main-aside ul 底部
      if(($(".main-aside ul").offset().top + $(".main-aside ul").height()-100 - scrollH) < $(".sub-aside ul").height()){
        $(".sub-aside ul").attr("style","").css({ position:"fixed",bottom: $("#footer").height() + 256 - finalScrollH +"px" });
      }else if(scrollH > ($(".main-aside").offset().top-40) ){
        //大於 main-aside ul offset().top
        $(".sub-aside ul").attr("style","").css({position:"fixed", top: "0", marginTop:"100px"});
      }else{
        //小於 main-aside ul offset().top
        $(".sub-aside ul").attr("style","");
      }    
    }


    if($(".th-vipCont").length>0){
      if(scrollH < 100){
        $(".md-lv1").find("figure").removeClass('act');
      }
      if(scrollH > $(".md-lv1").height()*0.3){
        $(".md-lv2").find("figure").removeClass('act');
      }
      if(scrollH > $(".md-lv2").offset().top -100){
        $(".md-lv3").find("figure").removeClass('act');
      }
      if(scrollH > $(".md-lv3").offset().top -100){
        $(".md-lv4").find("figure").removeClass('act');
      }
      if(scrollH > $(".md-lv4").offset().top -100){
        $(".md-lv5").find("figure").removeClass('act');
      }
    }
	});

  $(window).resize(function(){
    $(".jewelryBG").css({"min-height":$(window).height()-$("#footer").height()});
  }).resize();
});