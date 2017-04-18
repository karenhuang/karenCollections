$(function(){ 
  $("#twoSlider").twoSliderShow();
  $("#oneSlider ul").html($("#twoSlider li").clone().removeClass('active'));
  $("#oneSlider").sliderShow();
  $("#menuBtn").on("click",function () { $('html').toggleClass('leftMenu');});
  $("#goTop").on("click",function(){$("html,body").stop().animate({scrollTop: 0});});

  //複製網址
  $("#copybabyLink").on("mousedown",function(){
    var textarea = document.createElement("textarea");
    textarea.textContent = document.URL;
    textarea.style.position = "fixed"; 
    document.body.appendChild(textarea);
    textarea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
      console.log('unable to copy');
    } finally{
      document.body.removeChild(textarea);
      alert("網址已複製");
    }
  });

  
  
  function dwContReset(){
    // 重置.infoShow的內容高度
    $(".th-download .detailinfo.infoShow").css({height: $(".th-download .infoShow .monthCont").outerHeight() });   
    //download內容重置left位置 
    var dwCont = $(".th-download .md-month");
    dwCont.each(function(){
      $(this).find(".detailinfo").css({left:""});
      if(window.innerWidth>980){
        $(this).find(".detailinfo").css({left: ($(this).index()%3)*100*(-1)+"%"});
      }
      if(window.innerWidth>640 && window.innerWidth<=980){
        $(this).find(".detailinfo").css({left: ($(this).index()%2)*100*(-1)+"%"});
      }      
      if(window.innerWidth<640){
        $(this).find(".detailinfo").css({left: "0%"});
      }
    });
  }


  $(".th-download .md-month").on("mousedown",function(){ 
    var selfe = $(this);
    var lineNum, infoNum;
    var timer;
    if(window.innerWidth>980){
      lineNum = ~~((selfe.index()/3));
      if(selfe.parent().find('.infoShow').length>0){
        infoNum = ~~(selfe.parent().find('.infoShow').parent().index()/3) ;
      }
    }  
    if(window.innerWidth>640 && window.innerWidth<=980){
      lineNum = ~~((selfe.index()/2));
      if(selfe.parent().find('.infoShow').length>0){
        infoNum = ~~(selfe.parent().find('.infoShow').parent().index()/2) ;
      }
    }
    if(selfe.find('.infoShow').length>0){
      // 按已開的則關閉
      console.log("按已開的則關閉");
      selfe.removeClass('open').find('.detailinfo').removeClass('infoShow').css({height:"0px",transition:'0.4s'});
    }else{
      // 同一層
      if(lineNum == infoNum){
        // console.log("同一層");
        if(window.innerWidth>640){
          selfe.siblings().removeClass('open').find('.detailinfo').removeClass('infoShow').css({height:"",transition:'0s'});
          selfe.addClass('open').find('.detailinfo').addClass('infoShow').css({
            height:selfe.find('.monthCont').outerHeight(),
            transition:'0s'
          });
        }else{
          // 單張
          // console.log("單張");
          selfe.siblings().removeClass('open').find('.detailinfo').removeClass('infoShow').css({height:"",transition:'0.4s'});
          selfe.addClass('open').find('.detailinfo').addClass('infoShow').css({
            height:selfe.find('.monthCont').outerHeight(),
            transition:'0.4s'
          });
          timer=setTimeout(function(){
            $("html,body").stop().animate({scrollTop: selfe.find('.monthCont').offset().top-selfe.find('.defaultinfo').height()*0.3},300);
          },410,function(){clearTimeout(timer);});  
        }
      }else{
        // 一般狀況
        // console.log("一般狀況");
        selfe.siblings().removeClass('open').find('.detailinfo').removeClass('infoShow').css({height:"",transition:'0.4s'});
        selfe.addClass('open').find('.detailinfo').addClass('infoShow').css({height:selfe.find('.monthCont').outerHeight(),transition:'0.4s'});
        if(window.innerWidth>1200){
          timer=setTimeout(function(){
            $("html,body").stop().animate({scrollTop: selfe.find('.monthCont').offset().top-selfe.find('.defaultinfo').height()*0.3-100},300);  
          },410,function(){clearTimeout(timer);});
        }else{
          timer=setTimeout(function(){
            $("html,body").stop().animate({scrollTop: selfe.find('.monthCont').offset().top-selfe.find('.defaultinfo').height()*0.3},300);
          },410,function(){clearTimeout(timer);});
        }      
      }     
    }
    // 阻擋event fllow
    selfe.find(".monthCont").on("mousedown",function(event){event.stopPropagation();});
  });



  var window_W=window.innerWidth;
  $(window).on("resize",function(){
    $(".th-commonContInfo .md-video iframe").css({height: $(".th-commonContInfo .md-video").width()/1.777});
    if(window_W!=window.innerWidth){
      if( $("#header").hasClass('hd-pink') && window.innerWidth<1200){
        $("body").removeClass('leftMenu'); 
        $(".md-secondMenu").attr("style","");
      }
    }
    dwContReset();
  });
  $(window).resize();

  //判斷是否為首頁
  function isIndexpage(){
    if($(".main-Index").length>0){
      $("#twoSlider").addClass('twoShow');
      $("#oneSlider").addClass('oneShow');
    }else{
      $("#twoSlider").removeClass('twoShow');
      $("#oneSlider").removeClass('oneShow');
    }
  } 
  isIndexpage();
  


  $(window).scroll(function(){
    if(window.innerWidth>1200){
      //女神排行 right aside fixed 
      var finalScrollH = ($(document).outerHeight(true)-$(window).innerHeight())-$(window).scrollTop();
      if($(".th-ranking").length>0){
        //大於md-ranking 底部
        if(($(".th-ranking .md-ranking").offset().top + $(".th-ranking .md-ranking").height()- $(window).scrollTop()) < $(".th-ranking .md-banner").height()){
          $(".th-ranking .md-banner").css({top:"", bottom: 0 });
        }else if($(window).scrollTop() > ($(".th-ranking .md-ranking").offset().top-40) ){
          //大於 md-ranking offset().top
          $(".th-ranking .md-banner").addClass('fixed-banner').css({ top: $(window).scrollTop() - $(".th-ranking .md-banner").height() +50 +"px", bottom:"" });
        }else{
          //小於 md-ranking offset().top
          $(".th-ranking .md-banner").removeClass('fixed-banner').css({bottom:"",top:0});      
        }    
      }
    }else{
      $(".th-ranking .md-banner").removeClass('fixed-banner').attr("style","");
    }
  }).scroll();

  //女神排行按鈕的動態
  $(".md-ranking >a").hover(function(){
    if($(this).hasClass('on')){ return
    }else{
      $(this).find("span").addClass('fadeInDown');
    }
  },function(){
    if($(this).hasClass('on')){ return
    }else{
      $(this).find("span").removeClass('fadeInDown');
    }
  });

  // 女神排行bottom banner fixed時 fotter需要做margin-bottom
  $(window).resize(function(){
    if($(".th-fixbotbanner").length>0){
      if(window.innerWidth<768){
        $("#footer").css({"margin-bottom":"15%"});
      }else{
        $("#footer").css({"margin-bottom":"0%"});
      }      
    }
  }).resize();

  // 女神排行bottom banner 輪播
  $(".th-fixbotbanner").fixedSliderShow()

});


