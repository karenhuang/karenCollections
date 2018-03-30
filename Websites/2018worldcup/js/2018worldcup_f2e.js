$(function(){
  $(".th-sliderShow").sliderShow();
  $(window).scroll(function(){
    if($(this).scrollTop() > ($(".th-sliderShow").height()*4/5)){
      $('body').addClass('fixednav');
    }else{
      $('body').removeClass('fixednav');
    }
  });

});

$(window).load(function(){
  $('.md-cheerleading').cheerleadingSliderShow();

  $('.th-sliderShow .pt-h1 a').on('click',function(){
    $('html, body').stop().animate({scrollTop:$('body').find('.'+ $(this).attr('data-anchor') +'').offset().top},500);
  });
});