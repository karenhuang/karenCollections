$(function() {

  // common---------
  $("#menuBtn").on("mousedown", function() {
    $("html").toggleClass("mobileMenu");
  });

  // distributor page----------------------start--------------------
  // 錨點
  $(".th-distributorList .md-tab li").off("click").on("click", function() {
    var id = $(this).data("id");
    $(this).addClass("on").siblings().removeClass("on");
    if ($(window).innerWidth() > 980) {
      $("html, body").stop().animate({ scrollTop: $(id).offset().top }, 400);
    } else {
      $(id).addClass("show").siblings().removeClass("show");
      $(window).resize();
    }
  });

  //same height with li----------------start
  $.fn.sameHeight = function() {
    var element = $(this);
    element.each(function(i, el) {
      var li_H = 0;
      $(el).find("li").attr("style", "").each(function() {
        li_H = Math.max(li_H, $(this).height());
        $(this).css({ height: li_H });
      });
    });
  }
  $(".countries").sameHeight();
  $(window).on("resize", function() {
    $(".countries").sameHeight();
  });
  //same height with li----------------end


  // indexBanner slider
  if ($(".th-indexBanner").length) {
    $(".th-indexBanner").indexSliderShow();
  }


  // technology------------------------
  $(".th-technologyMiddle .md-fourText li").on('click', function() {
    var _text = $(this).find(".text");
    var _li = $(this);
    if (_li.hasClass("show")) {
      _li.removeClass("show");
    } else {
      _li.addClass("show");
    }
    _text.stop().slideToggle();
  });


  // news open lightbox
  $(".js-boxOpen").off("click").on("click", function() { $("html").addClass("maskBg"); });
  $(".js-boxClose").off("click").on("click", function() { $("html").removeClass("maskBg"); });
  $(".js-stopBubble").off("click").on("click", function(e) { e.stopPropagation(); });

  // news slider
  if ($(".th-newslightBox").length) {
    $(".th-newslightBox").newsSlider();
  }


  // reset pc to mobile or mobile to pc
  function newsResetImg() {
    if ($(window).innerWidth() > 980) {
      $(".th-newslightBox .imgCont li").css({ "left": '100%' });
      $(".th-newslightBox .imgCont li.active").css({ "left": '0%' });
    } else {
      $(".th-newslightBox .imgCont li").css({ "left": '0%' });
    }
  };
  newsResetImg();

  // resize reset
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      newsResetImg();
      resetproductinfo();
    }, 50)
  }).resize();

  if ($(".th-indexArrival").length) {
    $(".th-indexArrival").indexArrival();
  }
  if ($(".th-indexNews").length) {
    $(".th-indexNews").indexNews();
  }
  if ($(".md-productlist").length) {
    $(".md-productlist").switchProductlist();
  }

  if ($(".md-productGallery").length) {
    $(".md-productGallery").productGallery();
  }

  // contact page
  $(".th-contactMap .location").on('click', function() {
    $(this).addClass("on").siblings(".location").removeClass("on");
    $(".th-contactText .pt-address .chAddress").text($(this).data("chaddress"));
    $(".th-contactText .pt-address .enAddress").text($(this).data("en"));
    $(".th-contactText .pt-address .tel").text($(this).data("tel"));
    $(".th-contactText .pt-address .fax").text($(this).data("fax"));
  });


  function resetproductinfo() {
    if ($(window).innerWidth() > 963) {
      $(".md-info1 .equalH").attr("style", "").css({ height: $(".md-info1").height() });
      $(".md-info2 .equalH").attr("style", "").css({ height: $(".md-info2").height() });
      $(".md-info3 .equalH").attr("style", "").css({ height: $(".md-info3").height() });
    } else {
      $(".md-info1 .equalH").attr("style", "");
      $(".md-info2 .equalH").attr("style", "");
      $(".md-info3 .equalH").attr("style", "");
      if ($(window).innerWidth() > 640) {
        $(".gpmdCont .m-tabCont").attr("style", "");
        $(".gpmdCont").find(".show").removeClass("show");
      }
    }
  }


  $(".th-productCont .gpmdCont .m-tab").on("click", function() {
    $(this).parent().toggleClass("show");
    $(this).siblings(".m-tabCont").slideToggle();
  });


});