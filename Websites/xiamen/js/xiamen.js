$(document).ready(function () {
   $(".goTop").click(function () {
      $("html, body").animate({scrollTop:0},800);
   });

});


$(window).load(function () {
   $(function(){
      //圖片淡入淡出
      var _animateSpeed = 3500,_animateFadeout=1500,
      //加入計時器, 輪播時間及控制開關
          timer, _showSpeed =5000, _stop = false;


      function moveNext(){
         $('.autopic_content_img').click();
      }

      //照片大於一張的時候才做淡入淡出
      if($('.autopic_content_img>ul>li').length>1){
         //在最後一張的透明度設為0
         $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).css({'opacity':'0'});
         //預先在最後一張加上class=picOn,以待點擊時確保是弟一張為顯示的圖片
         $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).addClass('picOn');

         //漸變---
         $('.autopic_content_img').click(function(){
            $('.autopic_content_img>ul>li').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>ul>li').length).addClass('picOn').siblings('.picOn').removeClass('picOn');
            $('.autopic_content_img>ul>li').eq($('.picOn').index()).animate({'z-index':10, 'opacity':1},_animateSpeed).siblings().animate({'z-index':0, 'opacity':0},_animateFadeout);


            //下一張
            $('.autopic_content_img').animate( _animateSpeed, function(){
               if(!_stop) {
                  timer = setTimeout(moveNext, _showSpeed);
               }
            });

         }).click().end();


         //如果滑鼠移入時
         $('.autopic_content_img').mouseenter(function(){
            // 關閉開關及計時器
            _stop = true;
            clearTimeout(timer);
         });

         $('.autopic_content_img').mouseleave(function(){
            // 如果滑鼠移出時
            // 開啟開關及計時器
            _stop = false;
            timer = setTimeout(moveNext, _showSpeed);
         });
      }
   });
});