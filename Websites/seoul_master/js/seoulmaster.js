$(document).ready(function () {
   $(window).scroll(function(){
      if($(this).scrollTop()>1){//當window的scrolltop距離大於1時，go to top按鈕淡出，反之淡入
         $(".goTop").fadeIn();
      } else {
         $(".goTop").fadeOut();
      }
   });
// go to top的點擊事件
   $(".goTop").click(function(){
      $("html,body").animate({scrollTop:0},800);//點擊go to top按鈕時，以800毫秒的速度回到頂部
   });

   var showTime=3000, animateTime=800, firstTime;
    function move(){
        $(".carousel_content").css({'background-position': '0px 0px'}).
            animate({'background-position': '-926px 0px'},animateTime,function(){
                linkChang();
                setTimeout(function(){
                    $(".carousel_content").css({'background-position': '-926px 0px'}).
                        animate({'background-position': '-926px -530px'},animateTime,function(){
                            linkChang();
                            setTimeout(function(){
                                $(".carousel_content").css({'background-position': '-926px -530px'}).
                                    animate({'background-position': '-926px -1060px'},animateTime,function(){
                                        linkChang();
                                        setTimeout(function(){
                                            $(".carousel_content").css({'background-position': '-926px -1060px'}).
                                                animate({'background-position': '0px -1060px'},animateTime,function(){
                                                    linkChang();
                                                    setTimeout(function(){
                                                        $(".carousel_content").css({'background-position': '0px -1060px'}).
                                                            animate({'background-position': '0px -530px'},animateTime,function(){
                                                                linkChang();
                                                                setTimeout(function(){
                                                                    $(".carousel_content").css({'background-position': '0px -530px'}).
                                                                        animate({'background-position': '0px 0px'},animateTime,function(){
                                                                            linkChang();
                                                                            setTimeout(move,showTime);
                                                                        });
                                                                },showTime);
                                                            });
                                                    },showTime);
                                                });
                                        },showTime);
                                    });
                            },showTime);
                        });
                },showTime);
            });
    }
   function linkChang(){
       $(".carousel_content>a").eq(($('.linkOn').index()+1 ) % $('.carousel_content>a').length).addClass('linkOn').siblings('.linkOn').removeClass('linkOn')
   }
   firstTime= setTimeout(move,showTime);



});



