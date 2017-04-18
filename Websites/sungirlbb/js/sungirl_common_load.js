$(window).load(function(){
  //共用 輪播
  // $(".th-sliderShow").sliderShow();

  //共用  右上角m版icon開關
  $(".icon-share").on("click",function(){
    $(".th-share ul").slideToggle(300);
    return false;
  });

  // $(".ft-logo img").hover(function(){
  //   $(this).css({opacity:0.2}).stop().animate({opacity:1}).attr("src","images/footerLogo_h.svg");
  // },function(){
  //   $(this).css({opacity:0.2}).stop().animate({opacity:1}).attr("src","images/footerLogo.svg");
  // });


  (function(){
    //共用  變動輪播箭頭的lineheight in firefox
    var oBrowser;
    function DetectBrowser(){
      var sAgent = navigator.userAgent.toLowerCase();
      this.isIE = (sAgent.indexOf("msie")!=-1); //IE6.0-7
      this.isFF = (sAgent.indexOf("firefox")!=-1);//firefox
      this.isSa = (sAgent.indexOf("safari")!=-1);//safari
      this.isOp = (sAgent.indexOf("opera")!=-1);//opera
      this.isNN = (sAgent.indexOf("netscape")!=-1);//netscape
      this.isCh = (sAgent.indexOf("chrome")!=-1);//chrome
      this.isMa = this.isIE;//marthon
      this.isOther = (!this.isIE && !this.isFF && !this.isSa && !this.isOp && !this.isNN && !this.isSa);//unknown Browser
    }        
    oBrowser = new DetectBrowser();
    if(oBrowser.isFF) { 
      $(".icon-nextBtn").css({"line-height":"56px"});
    }     
  })();
});




