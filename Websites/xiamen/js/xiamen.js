$(document).ready(function () {
   $(".goTop").click(function () {
      $("html, body").animate({scrollTop:0},800);
   });

});


$(window).load(function () {
   $(function(){
      //�Ϥ��H�J�H�X
      var _animateSpeed = 3500,_animateFadeout=1500,
      //�[�J�p�ɾ�, �����ɶ��α���}��
          timer, _showSpeed =5000, _stop = false;


      function moveNext(){
         $('.autopic_content_img').click();
      }

      //�Ӥ��j��@�i���ɭԤ~���H�J�H�X
      if($('.autopic_content_img>ul>li').length>1){
         //�b�̫�@�i���z���׳]��0
         $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).css({'opacity':'0'});
         //�w���b�̫�@�i�[�Wclass=picOn,�H���I���ɽT�O�O�̤@�i����ܪ��Ϥ�
         $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).addClass('picOn');

         //����---
         $('.autopic_content_img').click(function(){
            $('.autopic_content_img>ul>li').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>ul>li').length).addClass('picOn').siblings('.picOn').removeClass('picOn');
            $('.autopic_content_img>ul>li').eq($('.picOn').index()).animate({'z-index':10, 'opacity':1},_animateSpeed).siblings().animate({'z-index':0, 'opacity':0},_animateFadeout);


            //�U�@�i
            $('.autopic_content_img').animate( _animateSpeed, function(){
               if(!_stop) {
                  timer = setTimeout(moveNext, _showSpeed);
               }
            });

         }).click().end();


         //�p�G�ƹ����J��
         $('.autopic_content_img').mouseenter(function(){
            // �����}���έp�ɾ�
            _stop = true;
            clearTimeout(timer);
         });

         $('.autopic_content_img').mouseleave(function(){
            // �p�G�ƹ����X��
            // �}�Ҷ}���έp�ɾ�
            _stop = false;
            timer = setTimeout(moveNext, _showSpeed);
         });
      }
   });
});