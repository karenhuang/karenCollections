// 最新消息lightBox 圖片切換
$.fn.newsSlider = function() {
  var element = $(this), //輪播最大外框
    bigimgUl = element.find(".imgCont"),
    bigimgLi = element.find(".imgCont li"),
    btnPrev = element.find(".btn-prev"),
    btnNext = element.find(".btn-next"),
    imgMax = bigimgLi.length,
    startPos, nowAnimate,
    imgNow = 0,
    imgNext = null,
    animateV = 600,
    moveState = false; //判斷是否移動中 

  //初始預設

  bigimgLi.eq(imgNow).addClass('active').siblings().css({ "left": '100%' });
  if (imgMax < 2) {
    btnNext.hide();
    btnPrev.hide();
  }


  function moveNext(num) {
    moveState = false //開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? 100 : -100;
    nowAnimate = imgNext > imgNow ? "-100%" : "100%";
    imgNext = imgNext > imgNow ? imgNext % imgMax : (imgNext + imgMax) % imgMax;
    bigimgLi.eq(imgNow).stop().animate({ left: nowAnimate }, animateV);
    bigimgLi.eq(imgNext).css({ "left": startPos + "%" })
      .stop().animate({ left: "0%" }, animateV, function() {
        $(this).addClass('active').siblings().removeClass('active');
        imgNow = imgNext;
        imgNext = null;
      });
  }

  //大圖左右按鈕
  btnNext.on("mousedown", function() {
    if (imgNext == null && imgMax > 1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  btnPrev.on("mousedown", function() {
    if (imgNext == null && imgMax > 1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
  });


  return element;
}


// 首頁 sliderShow
$.fn.indexSliderShow = function() {
  var element = $(this), //輪播最大外框
    bigimgUl = element.find(".pt-bannerList"),
    bigimgLi = element.find(".pt-bannerList li"),
    bigimg = element.find(".pt-bannerList li img"),
    dotUl = element.find(".pt-dot ul"),
    dotTag = "",
    dotli,
    imgMax = bigimgLi.length,
    startPos, nowAnimate,
    imgNow = 0,
    imgNext = null,
    nextClick = 4000,
    animateV = 500,
    timer,
    dragState = false,
    dragStartX = 0,
    dragDate = null,
    dpos = null, //紀錄拖動向左或向右的起始位置
    moveState = false; //判斷是否移動中 

  //初始預設
  bigimgLi.eq(imgNow).addClass('active').siblings().css({ "left": '100%' });

  if (imgMax > 1) {
    for (var i = 0; i < imgMax; i++) { dotTag += "<li></li>"; }
    dotUl.append(dotTag);
  }
  dotli = element.find(".pt-dot ul li");
  dotli.eq(imgNow).addClass('active');

  function moveNext(num) {
    clearInterval(timer);
    moveState = false //開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? 100 : -100;
    nowAnimate = imgNext > imgNow ? "-100%" : "100%";
    imgNext = imgNext > imgNow ? imgNext % imgMax : (imgNext + imgMax) % imgMax;
    if (dragState) { startPos = (startPos + dpos / bigimgLi.width() * 100); } //重新計算拖動後的起始位置
    dotli.eq(imgNext).addClass("active").siblings().removeClass("active");
    bigimgLi.eq(imgNow).removeClass("active").stop().animate({ left: nowAnimate }, animateV);
    bigimgLi.eq(imgNext).addClass('active').css({ "left": startPos + "%" })
      .stop().animate({ left: "0%" }, animateV, function() {
        imgNow = imgNext;
        imgNext = null;
        timer = setInterval(autoMove, nextClick);
      });
  }


  dotli.on("click", function(e) {
    var _this = $(this);
    clearInterval(timer);
    if (e.type == "mousedown") { e.preventDefault(); }
    if (imgNext != null || _this.hasClass("active")) return;
    moveNext(_this.index());
  });

  bigimgLi.on("mousedown touchstart", function(e) {
    clearInterval(timer);
    //防止被drag以致後續動作無法繼續
    if (e.type == "mousedown") { e.preventDefault(); }
    if (!dragState && imgNext == null && imgMax > 1) {
      dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      dragState = true;
      dragDate = new Date();
    }
  });

  bigimgLi.on("mousemove touchmove", function(e) {
    moveState = true;
    if (dragState && moveState) {
      var x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      dpos = x - dragStartX;
      $(this).css({ left: dpos / bigimgLi.width() * 100 + "%" });
      if (x > dragStartX) {
        bigimgLi.eq((($(this).index() - 1) + imgMax) % imgMax).css({ left: (-100 + Math.abs(dpos) / bigimgLi.width() * 100) + "%" });
      } else if (x < dragStartX) {
        bigimgLi.eq(($(this).index() + 1) % imgMax).css({ left: (100 - Math.abs(dpos) / bigimgLi.width() * 100) + "%" });
      }
    }
  });

  bigimgLi.on("mouseup touchend mouseleave", function(e) {
    if (dragState) {
      var passDate = new Date() - dragDate;
      var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
      if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 150 && endX != dragStartX) {
        imgNext = endX > dragStartX ? imgNow - 1 : imgNow + 1;
        moveNext(imgNext);
        $(this).find('a').click(function() { return false });
      } else {
        if (endX == dragStartX) { $(this).find('a').off(); } else { $(this).find('a').click(function() { return false }); }
        //處理快速滑動的歸位設定
        if (endX > dragStartX) {
          bigimgLi.eq(imgNow).stop().animate({ left: "0%" }, animateV);
          bigimgLi.eq((imgNow - 1) % imgMax).stop().animate({ left: -100 + "%" }, animateV);
        } else {
          bigimgLi.eq(imgNow).stop().animate({ left: "0%" }, animateV);
          bigimgLi.eq((imgNow + 1) % imgMax).stop().animate({ left: 100 + "%" }, animateV);
        }
      }
    } else { $(this).find('a').off(); }
    dragState = false;
  });

  function autoMove() {
    clearInterval(timer);
    if (imgNext == null && imgMax > 1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
  }
  timer = setInterval(autoMove, nextClick);
  return element;
}

// 首頁Arrival
$.fn.indexArrival = function() {
  var element = $(this),
    next = element.find(".pt_next"),
    prev = element.find(".pt_prev"),
    silderLi = element.find('.silderUl li'),
    timer,
    btnid = null,
    slidesLiMax = silderLi.length,
    imgNow = 0,
    imgNext = null,
    aniTime = 400,
    initTime = 0,
    clicknum = null,
    liNow = 0,
    navliState = false,
    absClick = null,
    dragState = false,
    dragStartX = 0,
    dragDate = null,
    autoClick = 4000;

  //初始設定

  moveImg(imgNow, 'init');
  if (silderLi.length < 6) {
    next.hide();
    prev.hide();
  }
  //auto
  function autoMove() {
    //  next.mousedown(); 
  }
  //moveimg
  function moveImg(num, id) {
    clearInterval(timer);
    imgNext = num;
    btnid = id;


    //右鍵click時的動態
    if (btnid == 'rightBtn') {
      //prev-1 --> prev-2
      silderLi.eq((imgNext - 3) % slidesLiMax).css({ "text-align": "left", "left": "-200%" })
        .stop().animate({ "left": "-300%" }, aniTime);
      //prev --> prev-1
      silderLi.eq((imgNext - 2) % slidesLiMax).css({ "left": "-100%" })
        .addClass('imgprev-1').siblings().removeClass('imgprev-1').end()
        .stop().animate({ "left": "-200%" }, aniTime);
      //now --> prev
      silderLi.eq((imgNext - 1) % slidesLiMax).css({ "left": "0%" })
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({ "left": "-100%" }, aniTime);
      //next --> now
      silderLi.eq(imgNext % slidesLiMax).css({ "left": "100%" }).addClass('active')
        .siblings().removeClass('active').end()
        .stop().animate({ "left": "0%" }, aniTime).find('img').stop().animate({
          rotateY: '0deg',
          translateX: '0'
        }, aniTime, function() {
          imgNow = imgNext;
          liNow = imgNext;
          imgNext = null;
          if (navliState) {
            if (absClick > 1) {
              moveImg((imgNow + 1) % slidesLiMax, 'rightBtn');
              absClick--;
            } else {
              navliState = false;
              absClick = null;
              timer = setInterval(autoMove, autoClick);
            }
          } else {
            timer = setInterval(autoMove, autoClick);
          }
        });
      //next+1 --> next
      silderLi.eq((imgNext + 1) % slidesLiMax).css({ "left": "200%" })
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({ "left": "100%" }, aniTime);
      //next+2 --> next+1
      silderLi.eq((imgNext + 2) % slidesLiMax).css({ "left": "300%" })
        .addClass('imgnextplus1').siblings().removeClass('imgnextplus1').end()
        .stop().animate({ "left": "200%" }, aniTime);
    }

    //左鍵click時
    if (btnid == 'leftBtn') {
      //prve-2 --> prev-1 
      silderLi.eq((imgNext - 2) % slidesLiMax).css({ "left": "-300%" })
        .addClass('imgprev-1').siblings().removeClass('imgprev-1').end()
        .stop().animate({ "left": "-200%" }, aniTime);

      //prve-1 --> prev 
      silderLi.eq((imgNext - 1) % slidesLiMax).css({ "left": "-200%" })
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({ "left": "-100%" }, aniTime);
      //prev --> now
      silderLi.eq(imgNext % slidesLiMax).css({ "left": "-100%" })
        .addClass('active').siblings().removeClass('active').end()
        .stop().animate({ "left": "0%" }, aniTime).find('img').stop().animate({ translateX: '0' }, aniTime, function() {
          imgNow = imgNext;
          liNow = imgNext;
          imgNext = null;
          if (navliState) {
            if (absClick > 1) {
              moveImg((imgNow - 1) % slidesLiMax, 'leftBtn');
              absClick--;
            } else {
              navliState = false;
              absClick = null;
              timer = setInterval(autoMove, autoClick);
            }
          } else {
            timer = setInterval(autoMove, autoClick);
          }
        });
      //now --> next
      silderLi.eq((imgNext + 1) % slidesLiMax).css({ "left": "0%" })
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({ "left": "100%" }, aniTime);
      //next --> next+1
      silderLi.eq((imgNext + 2) % slidesLiMax).css({ "left": "100%" })
        .addClass('imgnextplus1').siblings().removeClass('imgnextplus1').end()
        .stop().animate({ "left": "200%" }, aniTime);
      //next+1 --> next+2
      silderLi.eq((imgNext + 3) % slidesLiMax).css({ "text-align": "right", "left": "200%" })
        .stop().animate({ "left": "300%" }, aniTime);
    }

    //init
    if (btnid == 'init') {
      //prve-1 --> prev 
      silderLi.eq((imgNext - 2) % slidesLiMax).css({ "left": "-300%" })
        .addClass('imgprev-1').siblings().removeClass('imgprev-1').end()
        .stop().animate({ "left": "-200%" }, initTime);

      //prve-1 --> prev 
      silderLi.eq((imgNext - 1) % slidesLiMax).css({ "left": "-200%" })
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({ "left": "-100%" }, initTime);

      //prev --> now
      silderLi.eq(imgNext % slidesLiMax).css({ "left": "-100%" })
        .addClass('active').siblings().removeClass('active').end()
        .stop().animate({ "left": "0%" }, initTime).find('img').stop().animate({ translateX: '0' }, initTime, function() {
          imgNow = imgNext;
          liNow = imgNext;
          imgNext = null;
        });

      //now --> next
      silderLi.eq((imgNext + 1) % slidesLiMax).css({ "left": "0%" })
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({ "left": "100%" }, initTime);

      //next --> next+1
      silderLi.eq((imgNext + 2) % slidesLiMax).css({ "left": "100%" })
        .addClass('imgnextplus1').siblings().removeClass('imgnextplus1').end()
        .stop().animate({ "left": "200%" }, initTime);
    }
  }

  next.on('mousedown touchstart', function(e) {
    clearInterval(timer);
    var _id = $(this).attr('id');
    if (imgNext == null && slidesLiMax > 1) {
      imgNext = (imgNow + 1) % slidesLiMax;
      moveImg(imgNext, _id);
    }
    return false;
  });

  prev.on('mousedown', function(e) {
    clearInterval(timer);
    var _id = $(this).attr('id');
    if (imgNext == null && slidesLiMax > 1) {
      imgNext = (imgNow - 1 + slidesLiMax) % slidesLiMax;
      moveImg(imgNext, _id);
    }
    return false;
  });

  timer = setInterval(autoMove, autoClick);
  return element;
}


// 首頁 news
$.fn.indexNews = function() {
  var element = $(this),
    md_slideShow = element.find(".md_slideShow"),
    pt_imgCont = element.find(".pt_imgCont"),
    ulElem = element.find(".pt_imgCont ul"),
    liElem = element.find(".pt_imgCont ul li"),
    pt_next = element.find(".pt_next"),
    pt_prev = element.find(".pt_prev"),
    imgMax = liElem.length,
    imgNow = 0,
    leftDistance = 2,
    imgNext = null,
    li_W = 410, //css 設定390px margin-right:20px;
    dragState = false,
    dragStartX = 0,
    dragDate = null;


  liElem.eq(imgNext).addClass('active');
  ulElem.css({ "width": li_W * imgMax });

  function setSize() {
    pt_imgCont.attr("style", "");
    li_W = 410;
    if ($(".pt_imgCont").width() > 820) {
      pt_imgCont.css({ "width": li_W * 2 });
      leftDistance = 2;
    } else {
      li_W = 390;
      if ($(window).innerWidth() <= 443) {
        li_W = 340;
      }
      pt_imgCont.css({ "width": li_W * 1 });
      leftDistance = 1;
    }
  }
  var resetTimer;
  $(window).on("resize", function() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function() {
      setSize();
    }, 80);
  }).resize();

  function resetElement() {
    ulElem = element.find(".pt_imgCont ul");
    liElem = element.find(".pt_imgCont ul li");
    imgNow = 0;
    imgNext = null;
    liElem.removeClass('active').eq(imgNow).addClass('active');
  }

  function move() {
    if (imgNext > imgNow) {
      for (var i = 0; i < leftDistance; i++) { liElem.eq(i).clone().appendTo(ulElem); }
      ulElem.css({
        "width": li_W * $(".pt_imgCont ul li").length
      }).stop().animate({ "left": li_W * leftDistance * -1 }, function() {
        ulElem.css({ "left": 0 });
        for (var i = 0; i < leftDistance; i++) { liElem.eq(i).remove(); }
        resetElement();
      });
    } else {
      for (var i = 0; i < leftDistance; i++) { liElem.eq((imgMax - 1) - i).clone().prependTo(ulElem); }
      ulElem.css({
        "left": li_W * leftDistance * -1,
        "width": li_W * $(".pt_imgCont ul li").length
      }).stop().animate({ "left": 0 }, function() {
        for (var i = 0; i < leftDistance; i++) { liElem.eq((imgMax - 1) - i).remove(); }
        resetElement();
      });
    }
  }


  pt_next.on("mousedown touchstart", function() {
    if (imgNext == null && imgMax > 1) {
      setSize();
      imgNext = imgNow + leftDistance;
      move();
    }
    return false;
  });
  pt_prev.on("mousedown touchstart", function() {
    if (imgNext == null && imgMax > 1) {
      setSize();
      imgNext = imgNow - leftDistance;
      move();
    }
    return false;
  });

  ulElem.on("mousedown touchstart", function(e) {
    //防止被drag以致後續動作無法繼續
    if (e.type == "mousedown") { e.preventDefault(); }
    if (!dragState && imgNext == null && imgMax > 1) {
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
        endX > dragStartX ? pt_prev.click() : pt_next.click();
        $(this).find('a').click(function() { return false });
      } else { $(this).find('a').off(); }
    } else { $(this).find('a').off(); }
    dragState = false;
  });

  return element;
}

// productlist
$.fn.switchProductlist = function() {
  var element = $(this), //最大外框
    bigimgUl = element.find(".pt-bannerList"),
    bigimgLi = element.find(".pt-bannerList li"),
    btnPrev = element.find(".btn-prev"),
    btnNext = element.find(".btn-next"),
    imgMax = bigimgLi.length,
    startPos, nowAnimate,
    imgNow = 0,
    imgNext = null,
    animateV = 600;


  //初始預設

  bigimgLi.eq(imgNow).addClass('active').siblings().css({ "left": '100%' });
  if (imgMax < 2) {
    btnNext.hide();
    btnPrev.hide();
  }
  $(window).on("resize", function() {
    var ul_H = 0;
    if ($(window).innerWidth() > 768) {
      bigimgUl.attr("style", "");
      return
    }
    bigimgLi.each(function(index, el) { ul_H = Math.max(ul_H, $(el).innerHeight()) });
    bigimgUl.attr("style", "").css({ 'height': ul_H });
  }).resize();

  function moveNext(num) {
    if ($(window).innerWidth() > 768) return;
    imgNext = num;
    startPos = imgNext > imgNow ? 100 : -100;
    nowAnimate = imgNext > imgNow ? "-100%" : "100%";
    imgNext = imgNext > imgNow ? imgNext % imgMax : (imgNext + imgMax) % imgMax;
    bigimgLi.eq(imgNow).stop().animate({ left: nowAnimate }, animateV);
    bigimgLi.eq(imgNext).css({ "left": startPos + "%" })
      .stop().animate({ left: "0%" }, animateV, function() {
        $(this).addClass('active').siblings().removeClass('active');
        imgNow = imgNext;
        imgNext = null;
      });
  }

  //大圖左右按鈕
  btnNext.on("mousedown", function() {
    if (imgNext == null && imgMax > 1) {
      imgNext = imgNow + 1;
      moveNext(imgNext);
    }
    return false;
  });

  btnPrev.on("mousedown", function() {
    if (imgNext == null && imgMax > 1) {
      imgNext = imgNow - 1;
      moveNext(imgNext);
    }
    return false;
  });
  return element;
}

// product content gallery
$.fn.productGallery = function() {
  var element = $(this), //輪播最大外框
    bigimgUl = element.find(".pt-bannerList ul"),
    bigimgLi = bigimgUl.find("li"),
    bigimg = bigimgLi.find("figure img"),
    biggerCont = element.find(".pt-bigger"),
    smallCont = element.find(".pt-samllimg"),
    smallUl = element.find(".pt-samllimg ul"),
    smallTag = "",
    smallLi,
    imgMax = bigimgLi.length,
    startPos, nowAnimate,
    multiple = 0,
    imgNow = 0,
    imgNext = null,
    animateV = 600,
    dragState = false,
    dragStartX = 0,
    dragDate = null,
    dpos = null, //紀錄拖動向左或向右的起始位置
    moveState = false; //判斷是否移動中 

  //初始預設
  bigimgLi.eq(imgNow).addClass('active').siblings().css({ "left": '100%' });
  biggerCont.find("img").attr("src", bigimgLi.eq(imgNow).find("figure img").attr("src"));
  multiple = biggerCont.find("img").width() / bigimgLi.eq(imgNow).find("figure img").width();

  if (imgMax > 1) {
    for (var i = 0; i < imgMax; i++) { smallTag += "<li><img src=''></li>"; }
    smallUl.append(smallTag);
    smallLi = element.find(".pt-samllimg ul li");
    for (var j = 0; j < imgMax; j++) { smallLi.eq(j).find("img").attr("src", bigimg.eq(j).attr("src")); }
    smallLi.eq(imgNow).addClass('active');
  }

  $(window).on("resize", function() {
    var ul_H = 0;
    bigimgLi.each(function(index, el) { ul_H = Math.max(ul_H, $(el).innerHeight()) });
    bigimgUl.attr("style", "").css({ 'height': ul_H });
    if ($(window).innerWidth() > 963) {
      smallCont.attr("style", "");
      multiple = biggerCont.find("img").width() / bigimgLi.eq(imgNow).find("figure img").width();
    } else {
      smallCont.css({ top: bigimg.height() + 55 });
    }
  }).resize();


  function moveNext(num) {
    moveState = false //開始move()後就不可以被mousemove
    imgNext = num;
    startPos = imgNext > imgNow ? 100 : -100;
    nowAnimate = imgNext > imgNow ? "-100%" : "100%";
    imgNext = imgNext > imgNow ? imgNext % imgMax : (imgNext + imgMax) % imgMax;
    biggerCont.find("img").attr("src", bigimgLi.eq(imgNext).find("figure img").attr("src"));
    if (dragState) { startPos = (startPos + dpos / bigimgLi.width() * 100); } //重新計算拖動後的起始位置
    smallLi.eq(imgNext).addClass("active").siblings().removeClass("active");
    bigimgLi.eq(imgNow).removeClass("active").stop().animate({ left: nowAnimate }, animateV);
    bigimgLi.eq(imgNext).addClass('active').css({ "left": startPos + "%" })
      .stop().animate({ left: '0%' }, animateV, function() {
        imgNow = imgNext;
        imgNext = null;
      });
  }


  smallLi.on("click", function(e) {
    var _this = $(this);
    if (e.type == "mousedown") { e.preventDefault(); }
    if (imgNext != null || _this.hasClass("active")) return;
    moveNext(_this.index());
  });

  bigimgLi.on("mousedown touchstart", function(e) {
    if ($(window).innerWidth() < 963) {
      if (e.type == "mousedown") { e.preventDefault(); }
      if (!dragState && imgNext == null && imgMax > 1) {
        dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
        dragState = true;
        dragDate = new Date();
      }
    }
  });

  bigimgLi.on("mousemove touchmove", function(e) {
    if ($(window).innerWidth() < 963) {
      moveState = true;
      if (dragState && moveState) {
        var x = e.type == "mousemove" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
        dpos = x - dragStartX;
        $(this).css({ left: dpos / bigimgLi.width() * 100 + "%" });
        if (x > dragStartX) {
          bigimgLi.eq((($(this).index() - 1) + imgMax) % imgMax).css({ left: (-100 + Math.abs(dpos) / bigimgLi.width() * 100) + "%" });
        } else if (x < dragStartX) {
          bigimgLi.eq(($(this).index() + 1) % imgMax).css({ left: (100 - Math.abs(dpos) / bigimgLi.width() * 100) + "%" });
        }
      }
    }
  });

  bigimgLi.on("mouseup touchend mouseleave", function(e) {
    if ($(window).innerWidth() < 963) {
      if (dragState) {
        var passDate = new Date() - dragDate;
        var endX = (e.type == "mouseup" || e.type == "mouseleave") ? e.pageX : e.originalEvent.changedTouches[0].pageX;
        if (e.type == "mouseleave" || e.type == "touchleave" || passDate > 120 && endX != dragStartX) {
          imgNext = endX > dragStartX ? imgNow - 1 : imgNow + 1;
          moveNext(imgNext);
          $(this).find('a').click(function() { return false });
        } else {
          if (endX == dragStartX) { $(this).find('a').off(); } else { $(this).find('a').click(function() { return false }); }
          //處理快速滑動的歸位設定
          if (endX > dragStartX) {
            bigimgLi.eq(imgNow).stop().animate({ left: "0%" }, animateV);
            bigimgLi.eq((imgNow - 1) % imgMax).stop().animate({ left: -100 + "%" }, animateV);
          } else {
            bigimgLi.eq(imgNow).stop().animate({ left: "0%" }, animateV);
            bigimgLi.eq((imgNow + 1) % imgMax).stop().animate({ left: 100 + "%" }, animateV);
          }
        }
      } else { $(this).find('a').off(); }
      dragState = false;
    }
  });

  bigimg.on("mousemove", function(e) {
    if ($(window).innerWidth() > 963) {
      var yy = (e.pageY - (~~$(this).offset().top)) * -multiple + (biggerCont.height() / 2),
        xx = (e.pageX - (~~$(this).offset().left)) * -multiple + (biggerCont.width() / 2);
      biggerCont.find("img").css({ top: yy + 'px', left: xx + 'px' });
      biggerCont.css({ opacity: 1, zIndex: 105, top: (e.pageY - (~~$(this).offset().top)), left: (e.pageX + 20) });
    }
  });

  bigimg.on("mouseleave", function(e) {
    if ($(window).innerWidth() > 963) {
      biggerCont.css({ opacity: 0, zIndex: -1, top: 0, left: 0 });
    }
  });

  return element;
}