
$.fn.twoSliderShow = function(){
  var element = $(this),//輪播最大外框
      leftE = element.find(".th-left"),
      rightE = element.find(".th-right"),
      leftUl = leftE.find(".pt-bannerList"),
      rightUl = rightE.find(".pt-bannerList"),
      leftLi = leftUl.find("li"),
      rightLi = rightUl.find("li"),
      leftImg = leftLi.find("img"),
      rightImg = rightLi.find("img"),
      leftBtn = leftE.find("span"),
      rightBtn = rightE.find("span"),
      leftE_Prev = leftE.find("#leftPrev"),
      leftE_Next = leftE.find("#leftNext"),
      rightE_Prev = rightE.find("#rightPrev"),
      rightE_Next = rightE.find("#rightNext"),
      leftBar = leftE.find(".pt-bar"),
      rightBar = rightE.find(".pt-bar"),
      leftliMax = leftLi.length,
      rightliMax = rightLi.length,
      startPos, nowAnimate,
      leftimgNow = 0,
      rightimgNow = 0,
      leftimgNext = null,
      rightimgNext = null,
      leftPromise = false,
      rightPromise = true,
      leftEnter = false,
      rightEnter =false,
      nextTime = 3200,
      animateV = 650,
      timer;//判斷是否移動中 

  //初始預設
  function init(){
    leftLi.eq(leftimgNow).addClass('active').siblings().css({"left":'100%'});
    rightLi.eq(rightimgNow).addClass('active').siblings().css({"left":'100%'});
    leftLi.eq(leftimgNow).find('.text').removeClass('textOp');
    rightLi.eq(rightimgNow).find('.text').removeClass('textOp');
    if(leftliMax<2){ leftE_Next.hide(); leftE_Prev.hide(); }
    if(rightliMax<2){ rightE_Next.hide(); rightE_Prev.hide(); }
  }
  init();

  function TextShuffle( pDom ){     
    this.dom = pDom;
    this.text = pDom.html();
    this.length = this.text.length; 
    this.index = 0;
    this.RANGE = 10;           
  }
  TextShuffle.prototype.start = function(){
    this.index = 0;
    this.timeoutID = setInterval( function(){
      this.tickHandler();
    }.bind(this) , 45);
  }
  TextShuffle.prototype.clear = function(){
    this.dom.html( this.text );
    clearInterval( this.timeoutID );
  }
  TextShuffle.prototype.tickHandler = function(){     
    this.index++;
    var tmpTXT = "";
    
    var tmpIndex = this.index;
    if ( this.index > this.RANGE) {
      tmpTXT = this.text.substr(0 , this.index - this.RANGE);
      tmpIndex = this.RANGE;
      console.log(tmpTXT);  
    };


    if ( this.index > this.length ) {
      tmpIndex = this.length - this.index + this.RANGE;         
    };      
  
    this.dom.html( tmpTXT );
    if (this.index > this.length + this.RANGE) {        
      this.clear();
    };
  }


  function rightMove(num) {
    clearInterval(timer);
    var textShuffle; 
    if(rightPromise){
      leftLi.find('.text').removeClass('textOp');
      leftBar.removeClass('show');
      rightimgNext = num;
      startPos = rightimgNext > rightimgNow ? 100: -100;
      nowAnimate = rightimgNext > rightimgNow ? "-100%": "100%";          
      rightimgNext = rightimgNext > rightimgNow ? rightimgNext%rightliMax : (rightimgNext+rightliMax)%rightliMax;  
      rightBar.addClass('show');
      rightLi.eq(rightimgNow).css({"left": 0}).removeClass("active").stop().animate({left: nowAnimate},animateV);
      textShuffle = new TextShuffle( rightLi.eq(rightimgNext).find(".text p"));
      textShuffle.start();
      rightLi.eq(rightimgNext).css({"left": startPos+"%"}).addClass('active')
      .stop().animate({left: 0},animateV, function(){
        rightLi.eq(rightimgNext).find('.text').addClass('textOp');
        rightimgNow = rightimgNext;
        rightimgNext = null;
        if(!rightEnter){
          rightPromise = false;
          leftPromise = true;
        }
        clearInterval(timer);
        timer = setInterval(autoMove, nextTime);
      });                
    }
  }

  function leftMove(num){
    clearInterval(timer);
    var textShuffle;
    if(leftPromise){
      rightLi.find('.text').removeClass('textOp');
      rightBar.removeClass('show');
      leftimgNext = num;
      startPos = leftimgNext > leftimgNow ? 100: -100;
      nowAnimate = leftimgNext > leftimgNow ? "-100%": "100%";          
      leftimgNext = leftimgNext > leftimgNow ? leftimgNext%leftliMax : (leftimgNext+leftliMax)%leftliMax; 
      leftBar.addClass('show');
      leftLi.eq(leftimgNow).css({"left": 0}).removeClass("active").stop().animate({left: nowAnimate},animateV);
      textShuffle = new TextShuffle( leftLi.eq(leftimgNext).find(".text p"));
      textShuffle.start();
      leftLi.eq(leftimgNext).css({"left": startPos+"%"}).addClass('active')
      .stop().animate({left: 0},animateV, function() {
        leftLi.eq(leftimgNext).find('.text').addClass('textOp'); 
        leftimgNow = leftimgNext;
        leftimgNext = null;
        if(!leftEnter){
          leftPromise = false;
          rightPromise = true;                        
        }
        clearInterval(timer);
        timer = setInterval(autoMove, nextTime);
      });                
    }
  }

  //左邊按鈕
  function leftBtnClick(id){
    clearInterval(timer);
    if(id=="leftNext"){
      if (leftimgNext == null && leftliMax>1 && leftPromise) {
        leftPromise = true;
        leftimgNext = leftimgNow + 1;
        leftMove(leftimgNext);
      }
    }else{
      if (leftimgNext == null  && leftliMax>1 && leftPromise) {
        leftPromise = true;
        leftimgNext = leftimgNow - 1;
        leftMove(leftimgNext);
      }
    }
  }
  //右邊按鈕
  function rightBtnClick(id){
    clearInterval(timer);
    if(id=="rightNext"){
      if (rightimgNext == null && rightliMax>1 && rightPromise) {
        rightPromise = true;
        rightimgNext = rightimgNow + 1;
        rightMove(rightimgNext);
      }
    }else{
      if (rightimgNext == null  && rightliMax>1 && rightPromise) {
        rightPromise = true;
        rightimgNext = rightimgNow - 1;
        rightMove(rightimgNext);
      }
    }
  }

  leftBtn.on("mousedown", function(e){
    e.preventDefault();
    clearInterval(timer);
    var _id = $(this).attr("id");
    leftBtnClick(_id);
  });

  rightBtn.on("mousedown", function(e){
    e.preventDefault();
    clearInterval(timer);
    var _id = $(this).attr("id");
    rightBtnClick(_id);
  });

  rightBtn.hover(function(){
    leftPromise=false;
    rightPromise=true;
    rightEnter = true;
  },function(){
    leftPromise=true;
    rightPromise=false;
    rightEnter = false;
    clearInterval(timer);
    timer = setInterval(autoMove, nextTime);
  });     

  leftBtn.hover(function(){
    rightPromise=false;
    leftPromise=true;
    leftEnter = true;
  },function(){
    rightPromise=true;
    leftPromise=false;
    leftEnter = false;
    clearInterval(timer);
    timer = setInterval(autoMove, nextTime);
  });

  function autoMove() { 
    if(rightPromise){
      rightE_Next.mousedown();
    }else{
      leftE_Next.mousedown();
    }
  }
  clearInterval(timer);
  timer = setInterval(autoMove, nextTime);
}

$.fn.sliderShow = function(){
  var $element = $(this),//輪播最大外框
      $bigimgUl = $element.find(".pt-bannerList"),
      $bigimgLi = $element.find(".pt-bannerList li"),
      $bigimg = $element.find(".pt-bannerList li img"),
      $ptPrev = $element.find(".pt-prev"),
      $ptNext = $element.find(".pt-next"),
      imgMax = $bigimgLi.length,
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
  $bigimgLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
  $bigimgLi.eq(imgNow).find('.text').addClass('textOp');
  if(imgMax<2){ $ptNext.hide(); $ptPrev.hide(); }


  function moveNext(num) {
    clearInterval(timer);
    moveState = false//開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? 100: -100;
    nowAnimate = imgNext > imgNow ? "-100%": "100%";          
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    if(dragState){startPos = (startPos+dpos/$bigimgLi.width()*100);}//重新計算拖動後的起始位置
    $bigimgLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
    $bigimgLi.eq(imgNow).find('.text').removeClass('textOp');
    $bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
    .stop().animate({left: 0},animateV, function() {
      $bigimgLi.eq(imgNext).find('.text').addClass('textOp');
      imgNow = imgNext;
      imgNext = null;
      timer = setInterval(autoMove, nextClick);
    });
  }   

  //大圖左右按鈕
  $ptNext.on("mousedown", function() {
    clearInterval(timer);
    if (imgNext == null && imgMax>1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  $ptPrev.on("mousedown", function() {
    clearInterval(timer);
    if (imgNext == null  && imgMax>1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
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
    moveState = true;
    if (dragState && moveState) {
      var x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;  
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
      if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 110 && endX != dragStartX) { 
        imgNext = endX > dragStartX ? imgNow-1 : imgNow+1;
        moveNext(imgNext);
        $(this).find('a').click(function() {return false});
      } else {
        $(this).find('a').off();
          //處理快速滑動的歸位設定
        if(endX > dragStartX){
          $bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          $bigimgLi.eq(imgNow-1).stop().animate({left: -100+"%"},animateV);
        }else{
          $bigimgLi.eq(imgNow).stop().animate({left: 0},animateV);
          $bigimgLi.eq(imgNow+1).stop().animate({left: 100+"%"},animateV);
        }  
      }
    } else {$(this).find('a').off();}
    dragState = false;
  });
  function autoMove() { $ptNext.mousedown();}
  timer = setInterval(autoMove, nextClick);
}