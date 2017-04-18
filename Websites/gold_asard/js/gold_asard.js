/**
 * Created by Karen on 2015/4/2.
 */
$(document).ready(function () {
    //切換得獎公告與領獎須知的按鈕
    $(".btnTo1").hide();
    $(".btnTo2").click(function () {
        $(".btnTo2").css("display","none");
        $(".btnTo1").css("display","block");
        //切換title圖片
        $(".superwoman").css('background-image','url("images/winnerSuper2.png")');
    });
    //切換得獎公告與領獎須知的按鈕
    $(".btnTo1").click(function () {
        $(".btnTo1").css("display","none");
        $(".btnTo2").css("display","block");
        //切換title圖片
        $(".superwoman").css('background-image','url("images/winnerSuper1.png")');
    });

    //切換得獎公告與領獎須知兩個區塊
    $(".btnTo1,.btnTo2").click(function(){
        //防止下一次click時,前一個尚未跑完
        $(".tabBox ul li").first().stop(true,true);
        // 跑完第一個li後,把第一li物件附加到最後一個li元素的後面,並把margin-left歸零
        $(".tabBox ul li").first().animate({'margin-left': $(".tabBox ul li").first().width()*-1 },function(){
            $(".tabBox ul li").last().css('margin-left','0').after( $(".tabBox ul li").first().css('margin-left','0') );
        });
    });


    //m版menu開闔
    $(".menuList").hide();
    $(".menuBtn").click(function () {
        $(".menuList").slideToggle();
    });

    //goTop
    $(".mfooter").click(function(){
        $("html,body").animate({scrollTop:0},800);//點擊go to top按鈕時，以800毫秒的速度回到頂部
    });

    //menu滑動
    $(".menuList>ul>li").eq(0).click(function(){
        $("html,body").animate({scrollTop: $(".mBlock2").offset().top},800);//點擊go to top按鈕時，以800毫秒的速度回到頂部
    });
    $(".menuList>ul>li").eq(1).click(function(){
        $("html,body").animate({scrollTop: $(".mBlock4").offset().top},800);//點擊go to top按鈕時，以800毫秒的速度回到頂部
    });
});