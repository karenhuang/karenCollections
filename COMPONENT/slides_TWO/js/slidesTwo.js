$(window).load(function(){ 

  $("#twoSlider").twoSliderShow();
  $("#oneSlider ul").html($("#twoSlider li").clone().removeClass('active'));
  $("#oneSlider").sliderShow();

});
