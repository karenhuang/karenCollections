$(document).ready(function () {
//城市新玩法&創意行程小動畫
    var timer1, timer2;
    function move1(){
        $('.typeBtn>a>.img_nohover>i').eq($('.imgOn').index()-1).addClass('imgOn').siblings('.imgOn').removeClass('imgOn');
        timer1 = setTimeout(move1, 500);

        function move2(){
            $('.tripBtn>a>.img_nohover>i').eq($('.imgOn').index()-1).addClass('imgOn').siblings('.imgOn').removeClass('imgOn');
            timer2 = setTimeout(move2, 480);
        }
        setTimeout(move2, 200);
    }
    setTimeout(move1, 100);



//我要投稿input file的透明度=0 文字顯示由uploadInfo裡的p.text顯示
    $('.uploadInfo').change(function(){
        $(this).find('.text').text( $(this).find('input').val() );
    });

});

$(window).load(function () {
    //活動辦法的錨點
    $(".navText>.nav>li").eq(0).click(function(){
        $('html,body').animate({ scrollTop: $(".T1").offset().top }, 500);
    });
    $(".navText>.nav>li").eq(1).click(function(){
        $('html,body').animate({ scrollTop: $(".T2").offset().top }, 500);
    });
    $(".navText>.nav>li").eq(2).click(function(){
        $('html,body').animate({ scrollTop: $(".T3").offset().top }, 500);
    });

    //得獎公告的錨點
    $(".winCont>.nav>li").eq(0).click(function(){
        $('html,body').animate({ scrollTop: $(".areal_1").offset().top }, 500);
    });
    $(".winCont>.nav>li").eq(1).click(function(){
        $('html,body').animate({ scrollTop: $(".area1_2").offset().top }, 500);
    });


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