$(document).ready(function () {
    $(window).scroll(function(){
        if($(this).scrollTop()>99){//當window的scrolltop距離大於99時，go to top按鈕淡出，反之淡入
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