
//block1輪播plugin
$.fn.sliderShow = function(){
  var element = $(this),//輪播最大外框
      bigimgLi = element.find(".pt-bannerList li"),
      ptPrev = element.find(".pt-prev"),
      ptNext = element.find(".pt-next"),
      imgMax = bigimgLi.length,
      startPos, nowAnimate,
      imgNow = 0,
      imgNext = null,
      nextClick = 4000,
      animateV = 1200,
      timer;

  //初始預設
  bigimgLi.eq(imgNow).addClass('active').siblings().removeClass('active');
  if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }


  function moveNext(num) {
    clearInterval(timer);
    imgNext = num;      
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    bigimgLi.eq(imgNow).stop().animate({"opacity":0},animateV,function(){
      $(this).css({"z-index":0});
    });
    bigimgLi.eq(imgNext).stop().animate({"opacity":1},animateV, function() {
      $(this).css({"z-index":10});
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

  function autoMove() { ptNext.mousedown();}
  timer = setInterval(autoMove, nextClick);
  return element;
}


//cheerleading輪播plugin
$.fn.cheerleadingSliderShow = function(){
  var element = $(this),//輪播最大外框
      btnfigure = element.find(".cheerleading figure"),
      bigimg = btnfigure.find("img"),
      ptPrev = element.find(".pt-prev"),
      ptNext = element.find(".pt-next"),
      biggerBlock = element.find(".biggerImg"),
      bigCont = element.find(".bigimgCont"),
      biggerUl = element.find(".biggerImg ul"),
      bigTag = "",
      bigLi,
      imgMax = btnfigure.length,
      startPos, nowAnimate,
      imgNow = 0,
      imgNext = null,
      nextClick = 4000,
      animateV = 600;

  //初始預設
  if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }
  if(imgMax>1){
    for(var i=0; i<imgMax; i++){bigTag+="<li><img src=''></li>";}
    biggerUl.append(bigTag);
    bigLi = biggerUl.find("li");
    for(var j=0; j<imgMax; j++){ bigLi.eq(j).find("img").attr("src",bigimg.eq(j).attr("src"));}  
    bigLi.eq(imgNow).addClass('active').siblings().css({"left":'100%'});
    biggerUl.css({'padding-top':bigLi.find('img').height()});
    ptNext.css({'height':bigLi.find('img').height()}); 
    ptPrev.css({'height':bigLi.find('img').height()});

  }

  function moveNext(num) {
    imgNext = num;
    startPos = imgNext > imgNow ? 100: -100;
    nowAnimate = imgNext > imgNow ? "-100%": "100%";    
    imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;  
    btnfigure.removeClass("active").each(function(){
      if($(this).attr('data-idx')==imgNext){
        $(this).addClass('active');
      }
    });
    bigLi.eq(imgNow).removeClass("active").stop().animate({left: nowAnimate},animateV);
    bigLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
    .stop().animate({left: '0%'},animateV, function() {    
      imgNow = imgNext;
      imgNext = null;
    });

  }   

  //大圖左右按鈕
  ptNext.on("click", function(event) {
    event.stopPropagation();
    if (imgNext == null && imgMax>1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  ptPrev.on("click", function(event) {
    event.stopPropagation();
    if (imgNext == null  && imgMax>1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
  });
  
  btnfigure.on("click",function(e){
    if (imgNext != null ) return;
    moveNext(($(this).attr('data-idx')/1));
    if(!bigCont.hasClass('show')){
      bigCont.addClass('show');
      $('body').addClass('mask');
    }  
  });

  bigCont.on('click',function(){
    bigCont.removeClass('show');
    $('body').removeClass('mask');     
  });

  return element;
}


