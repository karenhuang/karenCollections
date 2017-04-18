$(document).ready(function () {
   $('.newslist li:nth-child(2n) .yellowbg').css('background-color','#fffdbf');
   $('.foodText ul li:nth-child(2n) .bgblock').css('background-color','#ffebb7');


   $(window).scroll(function(){
      if($(this).scrollTop()>200){//當window的scrolltop距離大於1時，go to top按鈕淡出，反之淡入
         $(".goTop").fadeIn();
      } else {
         $(".goTop").fadeOut();
      }
   });
// go to top的點擊事件
   $(".goTop").click(function(){
      $("html,body").animate({scrollTop:0},800);//點擊go to top按鈕時，以800毫秒的速度回到頂部
   });
});
