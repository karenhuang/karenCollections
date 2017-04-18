$(function(){
  $.fn.rotateSlides=function(){
    var element = $(this),
        $next = element.find(".pt_next"),
        $prev = element.find(".pt_prev"),
        $imgprev = element.find('.imgprev'),
        $imgnext = element.find('.imgnext'),
        $silderLi = element.find('.silderUl li'),
        $navLi = element.find('nav li'),
        timer,
        btnid = null,
        slidesLiMax = $silderLi.length,
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
    $navLi.eq(imgNow).addClass('active');    
    moveImg(imgNow,'init');
    //auto
    function autoMove(){ $next.mousedown(); }
    //moveimg
    function moveImg(num,id){
      clearInterval(timer);
      imgNext = num;
      btnid = id;
      //menu及content的下一個active
      $navLi.eq(imgNext).addClass('active').siblings().removeClass('active');

      //右鍵click時的動態
      if(btnid=='rightBtn'){
        //change li (position) then change img (rotateY)
        //prev --> prev-1
        $silderLi.eq((imgNext-2)% slidesLiMax).css({"left":"-100%"})
        .stop().animate({"left":"-200%"},aniTime)
        .find('img').stop().animate({rotateY:'0deg',translateX:'0'},aniTime);
        //now --> prev
        $silderLi.eq((imgNext-1)% slidesLiMax).css({ "left":0})
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({"left":"-100%"},aniTime)
        .find('img').stop().animate({rotateY:'45deg',translateX:'150px'},aniTime);
        //next+1 --> next
        $silderLi.eq((imgNext+1)% slidesLiMax).css({"left":"200%"})
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({"left":"100%"},aniTime)
        .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},aniTime);
        //next --> now
        $silderLi.eq(imgNext%slidesLiMax).css({ "left":"100%"}).addClass('active')
        .siblings().removeClass('active').end()
        .stop().animate({ "left":0},aniTime).find('img').stop().animate({
            rotateY:'0deg',translateX:'0' 
        },aniTime,function(){
          imgNow = imgNext; 
          liNow = imgNext;
          imgNext = null;
          if(navliState){
            if(absClick>1){
              moveImg((imgNow+1)%slidesLiMax,'rightBtn');
              absClick--; 
            }else{
              navliState=false;
              absClick=null;
              timer = setInterval(autoMove,autoClick);
            }
          }else{
            timer = setInterval(autoMove,autoClick);
          }
        });
      }

      //左鍵click時
      if(btnid=='leftBtn'){
        //change li (position) then change img (rotateY)
        //prve-1 --> prev 
        $silderLi.eq((imgNext-1)% slidesLiMax).css({"left":"-200%"})
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({ "left":"-100%"},aniTime)
        .find('img').stop().animate({ rotateY:'45deg',translateX:'150px'},aniTime);
        //now --> next
        $silderLi.eq((imgNext+1)% slidesLiMax).css({"left":"0"})
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({"left":"100%"},aniTime)
        .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},aniTime);
        //next --> next+1
        $silderLi.eq((imgNext+2)% slidesLiMax).css({"left":"100%"})
        .stop().animate({"left":"200%"},aniTime)
        .find('img').stop().animate({rotateY:'0deg',translateX:'0' },aniTime);
        //prev --> now
        $silderLi.eq(imgNext% slidesLiMax).css({"left":"-100%"})
        .addClass('active').siblings().removeClass('active').end()
        .stop().animate({"left":0},aniTime).find('img').stop().animate({rotateY:'0deg', translateX:'0' 
        },aniTime,function(){
          imgNow = imgNext; 
          liNow =imgNext;
          imgNext = null;
          if(navliState){
            if(absClick>1){
              moveImg((imgNow-1)%slidesLiMax ,'leftBtn');
              absClick--; 
            }else{
              navliState=false;
              absClick=null;
              timer = setInterval(autoMove,autoClick);
            }
          }else{
            timer = setInterval(autoMove,autoClick);
          }
        });
      }

      //init
      if(btnid=='init'){
        //prve-1 --> prev 
        $silderLi.eq((imgNext-1)% slidesLiMax).css({"left":"-200%"})
        .addClass('imgprev').siblings().removeClass('imgprev').end()
        .stop().animate({ "left":"-100%"},initTime)
        .find('img').stop().animate({ rotateY:'45deg',translateX:'150px'},initTime);
        //now --> next
        $silderLi.eq((imgNext+1)% slidesLiMax).css({"left":"0"})
        .addClass('imgnext').siblings().removeClass('imgnext').end()
        .stop().animate({"left":"100%"},initTime)
        .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},initTime);
        //prev --> now
        $silderLi.eq(imgNext% slidesLiMax).css({"left":"-100%"})
        .addClass('active').siblings().removeClass('active').end()
        .stop().animate({"left":0},initTime).find('img').stop().animate({rotateY:'0deg', translateX:'0' 
        },initTime,function(){
          imgNow = imgNext; 
          liNow = imgNext;
          imgNext = null;
        });
      }
    }

    $next.on('mousedown touchstart', function(e){
      clearInterval(timer);
      var _id = $(this).attr('id');
      if( imgNext==null && slidesLiMax>1){
        imgNext= (imgNow+1)%slidesLiMax;
        moveImg(imgNext,_id);              
      }
      return false;
    });

    $prev.on('mousedown', function(e){
      clearInterval(timer);
      var _id = $(this).attr('id');
      if( imgNext==null && slidesLiMax>1){
        imgNext= (imgNow-1+slidesLiMax)%slidesLiMax;
        moveImg(imgNext,_id);
      }
      return false;
    });

    $navLi.on('click', function(e) {
      var _this = $(this);
      if (imgNext == null && !_this.hasClass("active")){
        clearInterval(timer);
        clicknum = _this.index()-liNow;   
        absClick = Math.abs(clicknum);
        //判斷方向後click
        if(absClick < slidesLiMax-1){
          navliState=true;
          clicknum>0 ? $next.mousedown() : $prev.mousedown() ;
        }
        //第0張跟最後1張的切換
        if(absClick == (slidesLiMax-1)){
          clicknum>0 ? $prev.mousedown() : $next.mousedown();
        }          
      };
      return false;
    });

    $silderLi.on("mousedown touchstart",function(e){
      clearInterval(timer);
      if(e.type == "mousedown"){   e.preventDefault();}
      if(!dragState && imgNext==null ){
        dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
        dragDate = new Date();
        dragState = true;
      }
    });

    $silderLi.on("mouseup touchend",function(e){
      var _this = $(this);
      if(dragState) {
        var passDate = new Date()-dragDate;
        var x = e.type == "mouseup" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
        if(passDate>200 && dragStartX!=x){
          if(x > dragStartX){ $prev.mousedown();}
          else if(x < dragStartX){ $next.mousedown(); }
          _this.find('a').on("click dblclick",function(){return false});
        }else{    
          if(_this.hasClass('imgnext')){
            _this.find('a').on("click dblclick",function(){return false});
            $next.mousedown();
          }else if(_this.hasClass('imgprev')){
            _this.find('a').on("click dblclick",function(){return false});
            $prev.mousedown();
          }else if(_this.hasClass('active') ){
            _this.find('a').off(); 
          }         
        }  
        dragState = false;
      }else{
        _this.find('a').on("click dblclick",function(){return false});
      }  
    });
    
    timer = setInterval(autoMove,autoClick);
    return element;
  }

  $("#rotateSlides").rotateSlides();

});