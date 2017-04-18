(function(window){

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '732391563599373',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  function shareFB(pTitle,pImg,pHref){
    FB.ui({
      method: 'feed',
      link: pHref,
      title: pTitle,
      picture: pImg 
    },function (response) { });
  }

  function shareTwitter(pTitle,pHref){
    window.open('http://twitter.com/?status='.concat(encodeURIComponent(pHref)).concat(' ').concat(encodeURIComponent(pTitle)));
  }

  function shareWeibo(pTitle,pImg,pHref){
    window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(pHref) + '&title=' + encodeURIComponent(pTitle) + '&pic=' + encodeURIComponent(pImg));
  }

  function shareDate(data){
    var shareData = data;
    var href = document.location.href;
    if(shareData.title == ""){
      shareData.title = "SunGirlBaby上閣樓" 
    }
    $("#fbShare").off('click').on('click',function(e){
      e.preventDefault();
      shareFB(shareData.title,shareData.img,href);
    });
    $("#weiboShare").off('click').on('click',function(e){
      e.preventDefault();
      shareTwitter(shareData.title,href);
    });
    $("#twitterShare").off('click').on('click',function(e){
      e.preventDefault();
      shareWeibo(shareData.title,shareData.img,href);
    });
  }

})(window)






$(function(){ 
  
  // pink header hover
  if($("#header").hasClass('hd-pink')){
    $(".md-mainUl >li >a").off("mouseenter click").on("click",function(){
      if(window.innerWidth<1200){
        if($(this).siblings(".md-secondMenu").length>0 && $("html").hasClass('leftMenu')){
          $(this).siblings(".md-secondMenu").toggleClass('show');
          $(this).parent("li").siblings().find(".md-secondMenu").removeClass('show');
        } 
      }
    });
    $(".md-mainUl >li >a").on("mouseenter",function(){
      if(window.innerWidth>1200 && $(this).siblings(".md-secondMenu").length>0){
        if($(window).scrollTop() < $(".main-content").offset().top){
          if($(".main-Index").length>0){
            $(this).siblings(".md-secondMenu").css({top:"100%",height:"auto"}).slideDown(300,function(){
              $(this).stop().animate({top: ($(this).height()-$("#header").height())*-0.5},350);
            });
          }else{
            $(this).siblings(".md-secondMenu").addClass('md-show');
          }
        }else{
          // menu fixed 後 md-secondMenu 只能top 0;
          $(this).siblings(".md-secondMenu").addClass('md-show');
        }
      }else{
        $(this).siblings(".md-secondMenu").removeClass('md-show');
      }
    });
    $(".md-mainUl >li").on("mouseleave",function(){
      if($(this).find(".md-secondMenu").length>0 && window.innerWidth>1200){
        if($(window).scrollTop() < $(".main-content").offset().top){
          $(".md-secondMenu").attr("style","");
        }else{
          $(".md-secondMenu").attr("style","").removeClass('md-show');
        }
      }
    });
  } 



  //blue header hover
  if($("#header").hasClass('hd-blue')){
    // menu click effect
    $(".md-mainUl >li >a").off("click").on("click",function (){
      if($(this).siblings(".md-secondMenu").length==1){
        $(this).siblings(".md-secondMenu").toggleClass('show');
        if($(this).siblings(".md-secondMenu").hasClass('show')){
          $("#header").addClass('secondUl-active');
        }else{
          $("#header").removeClass('secondUl-active');
        }
        $(this).parent("li").siblings().find(".md-secondMenu").removeClass('show');
      }
    });
    $(".md-mainUl .closeBtn").off("click").on("click",function(){
      $(this).parents(".md-secondMenu").toggleClass('show');
      if($("#header").hasClass('secondUl-active')){
        $("#header").removeClass('secondUl-active');
      }
    });

    // document ready each by each add class
    $("#header h1").addClass('show');
    $("#header h1.show").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){
      $("#header h1 img").addClass('imgShow');
      $("#header h1 img.imgShow").one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){
        $("#header .md-mainUl >li").addClass('liShow');
      });
    });
    // for fix ie9 (blue menu animate not support ie9)
    if(navigator.userAgent.indexOf("MSIE 9.0")>0) {
      $("#header h1").addClass('show');
      $("#header h1 img").addClass('imgShow');
      $("#header .md-mainUl >li").addClass('liShow');
    }
  }
  // window small than 1200 no animate on nav
  if($("#header").hasClass('hd-blue') && window.innerWidth<1200){
    // document ready add class
    $("#header h1").addClass('show');
    $("#header h1 img").addClass('imgShow');
    $("#header .md-mainUl >li").addClass('liShow');
  }

  $(window).scroll(function(){
    if(window.innerWidth>1200){
      if($(window).scrollTop()>$(".main-content").offset().top){
        $("#header").addClass('fixedMenu');
        if($(".hd-pink").length>0){$(".main-content").addClass('fixmargin');}
        if($(".hd-blue").length>0){$(".th-commonShare").addClass('fixed');}
        $("#goTop").addClass('show');
      }else{
        $("#header").removeClass('fixedMenu');
        if($(".hd-pink").length>0){$(".main-content").removeClass('fixmargin');}
        if($(".hd-blue").length>0){$(".th-commonShare").removeClass('fixed');}
        $("#goTop").removeClass('show');
      }
    }else{
      $("#header").removeClass('fixedMenu');
      if($(".hd-pink").length>0){$(".main-content").removeClass('fixmargin');}
      if($(".hd-blue").length>0){$(".th-commonShare").removeClass('fixed');}
    }
  }).scroll();
});