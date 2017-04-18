$(function() {
    $.fn.sliderShow = function(){
      var element = $(this),//輪播最大外框
          bigimgLi = element.find(".pt-bannerList li"),
          tabMenu = element.find(".pt-tabMenu li"),
          ptPrev = element.find(".pt-prev"),
          ptNext = element.find(".pt-next"),
          imgMax = bigimgLi.length,
          startPos, nowAnimate,
          imgNow = 0,
          imgNext = null,
          nextClick = 4000,
          animateV = 600,
          timer,
          dragState = false,
          dragStartX = 0,
          dragDate = null,
          dpos = null,//紀錄拖動向左或向右的起始位置
          moveState = false;//判斷是否移動中 

      //初始預設
      bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
      tabMenu.css({width:(100/imgMax)+"%"}).eq(imgNow).addClass('on');
      if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }

      function moveNext(num) {
        clearInterval(timer);
        moveState = false//開始move()後就不可以被mousemove
        imgNext = num;
        startPos = imgNext > imgNow ? 100: -100;
        nowAnimate = imgNext > imgNow ? "-100%": "100%";          
        imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
        if(dragState){startPos = (startPos+dpos/bigimgLi.width()*100);}//重新計算拖動後的起始位置
        tabMenu.eq(imgNext).addClass('on').siblings().removeClass('on');
        bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
        bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
        .stop().animate({left: 0},animateV, function() {
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

      tabMenu.on("mousedown", function() {
        clearInterval(timer); 
        var _this = $(this);
        if (imgNext != null || _this.hasClass("on")) return;
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
          var dis = dpos/bigimgLi.width()*100;
          $(this).css({ left:dis+"%" });
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
          if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 110 && endX != dragStartX) { 
            imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
            moveNext(imgNext);
            $(this).find('a').click(function() {return false});
          } else {
            if(endX==dragStartX){$(this).find('a').off(); }else{ $(this).find('a').click(function() {return false});  }
              //處理快速滑動的歸位設定
            if(endX > dragStartX){
              bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
              bigimgLi.eq((imgNow-1)%imgMax).stop().animate({left: -100+"%"},animateV);
            }else{
              bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
              bigimgLi.eq((imgNow+1)%imgMax).stop().animate({left: 100+"%"},animateV);
            } 
          }
        } else {$(this).find('a').off();}
        dragState = false;
      });
      function autoMove() { ptNext.mousedown();}
      timer = setInterval(autoMove, nextClick);
    }

    $.fn.tabShow = function(){
      var element = $(this),//輪播最大外框
          bigimgLi = element.find(".pt-tabCont li"),
          tabMenu = element.find(".pt-tabMenu li"),
          imgMax = bigimgLi.length,
          startPos, nowAnimate,
          imgNow = 0,
          imgNext = null,
          animateV = 600,
          timer,
          dragState = false,
          dragStartX = 0,
          dragDate = null,
          dpos = null,//紀錄拖動向左或向右的起始位置
          moveState = false;//判斷是否移動中 

      //初始預設
      bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});


      function moveNext(num) {
        moveState = false//開始move()後就不可以被mousemove
        imgNext = num;
        startPos = imgNext > imgNow ? 100: -100;
        nowAnimate = imgNext > imgNow ? "-100%": "100%";          
        imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
        if(dragState){startPos = (startPos+dpos/bigimgLi.width()*100);}//重新計算拖動後的起始位置
        tabMenu.eq(imgNext).addClass('on').siblings().removeClass('on');
        bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
        bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
        .stop().animate({left: 0},animateV, function() {
          imgNow = imgNext;
          imgNext = null;
        });
      }   

      tabMenu.on("mousedown", function() {
        var _this = $(this);
        if (imgNext != null || _this.hasClass("on")) return;
          moveNext(_this.index());
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
          var dis = dpos/bigimgLi.width()*100;
          $(this).css({ left:dis+"%" });
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
          if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 110 && endX != dragStartX) { 
            imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
            moveNext(imgNext);
            $(this).find('a').click(function() {return false});
          } else {
            if(endX==dragStartX){$(this).find('a').off(); }else{ $(this).find('a').click(function() {return false});  }
              //處理快速滑動的歸位設定
            if(endX > dragStartX){
              bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
              bigimgLi.eq((imgNow-1)%imgMax).stop().animate({left: -100+"%"},animateV);
            }else{
              bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
              bigimgLi.eq((imgNow+1)%imgMax).stop().animate({left: 100+"%"},animateV);
            } 
          }
        } else {$(this).find('a').off();}
        dragState = false;
      });
    }


  $(".th-sliderShow").sliderShow();
  $(".tabCont").tabShow();
  $(".md-casinoBanner").tabShow();

  $(".hoverBtn").on("mouseenter",function(){
    $(this).parent().addClass('showSort');
  });
  $(".sortBlock").on("mouseleave",function(){
      $(this).parent().removeClass('showSort');
  });

  $("nav, #header h1").hover(function(){
    if($(window).width()>1007){$(".menu-sub").stop().slideDown(300); }
  },function(){ 
    if($(window).width()>1007){$(".menu-sub").stop().slideUp(300); }
  });

  $("#menuBtn").click(function () {
      $('html').removeClass("rightLogin").toggleClass('leftmenu');
  });
  $("#loginBtn").click(function () {
      $('html').removeClass("leftmenu").toggleClass('rightLogin');
  });

  function doresize(){
    $(".menu-sub").attr("style","");
    $(".marquee-showing").siblings().css({"top":"-999em"});
    $(".menu-sub").removeClass('subShow');
  }
  
  var resizeTimer;
  $(window).resize(function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doresize, 50);
  }).resize();

  $(".ft-sss988logo .md-info .pt-phone").hover(function(){
    if($(window).width()>1200){$(".ft-qrcode").addClass('show');}
  },function(){
    if($(window).width()>1200){$(".ft-qrcode").removeClass('show');}
  });

  // menu 
  $(".menu-main >li").on("click",function(){
    if($(window).width()<1024){
      $(this).find(".menu-sub").toggleClass('subShow');
    }      
  });

});
