/**
 * Created by Karen on 2014/8/14.
 */


$(window).load(function(){
    //點擊logo 頁面至頂
    $('.header_logo').click(function(){
        $('html,body').animate({ scrollTop: $('.bodyCont').offset().top-130 }, 500);
        $('.header_menu > ul >li').removeClass('menuOn');
    });
    //menu滑動效果
    $('.header_menu > ul >li').eq(0).click(function () {
        $('html,body').animate({ scrollTop: $('.ChungYeung').offset().top-130 }, 500);
        $(this).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    });
    $('.header_menu > ul >li').eq(1).click(function () {
        $('html,body').animate({ scrollTop: $('.GreatMountain').offset().top-130 }, 500);
        $(this).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    });
    $('.header_menu > ul >li').eq(2).click(function () {
        $('html,body').animate({ scrollTop: $('.Classics').offset().top-130 }, 500);
        $(this).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    });
    $('.header_menu > ul >li').eq(3).click(function () {
        $('html,body').animate({ scrollTop: $('.FoodFun').offset().top-130 }, 500);
        $(this).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    });
    $('.header_menu > ul >li').eq(4).click(function () {
        $('html,body').animate({ scrollTop: $('.viewoftaishan').offset().top-130 }, 500);
        $(this).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    });

    //scroll到各個class所屬的高度後menu加上menuOn
    $(window).scroll(function(){
        var scroll = $(window).scrollTop()+165;
        if(scroll <  $('.ChungYeung').offset().top){
            $('.header_menu > ul >li').removeClass('menuOn');
        }else if ( scroll < $('.GreatMountain').offset().top ){
            $('.header_menu > ul >li').eq(0).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
        }else if ( scroll < $('.Classics').offset().top ){
            $('.header_menu > ul >li').eq(1).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
        }else if ( scroll < $('.FoodFun').offset().top ){
            $('.header_menu > ul >li').eq(2).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
        }else if ( scroll < $('.viewoftaishan').offset().top ){
            $('.header_menu > ul >li').eq(3).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
        }else if ( scroll > $('.viewoftaishan').offset().top ){
            $('.header_menu > ul >li').eq(4).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
        }
    });

    //reload時抓當前高度並以menu的class"menuOn"顯示當前所在位置
    var scroll = $(window).scrollTop()+165;
    if(scroll <  $('.ChungYeung').offset().top){
        $('.header_menu > ul >li').removeClass('menuOn');
    }else if ( scroll < $('.GreatMountain').offset().top ){
        $('.header_menu > ul >li').eq(0).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    }else if ( scroll < $('.Classics').offset().top ){
        $('.header_menu > ul >li').eq(1).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    }else if ( scroll < $('.FoodFun').offset().top ){
        $('.header_menu > ul >li').eq(2).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    }else if ( scroll < $('.viewoftaishan').offset().top ){
        $('.header_menu > ul >li').eq(3).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    }else if ( scroll > $('.viewoftaishan').offset().top ){
        $('.header_menu > ul >li').eq(4).addClass('menuOn').siblings('.menuOn').removeClass('menuOn');
    }

});


$(document).ready(function(){
    //圖片淡入淡出
    var _animateSpeed = 2500,
    //加入計時器, 輪播時間及控制開關
        timer, _showSpeed =6000, _stop = false;

    function moveNext(){
        $('.autopic_content_img').dblclick();
    }

    //照片大於一張的時候才做淡入淡出
    if($('.autopic_content_img>ul>li').length>1){
        //在最後一張的透明度設為0
        $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).css({'opacity':'0'});
        //預先在最後一張加上class=picOn,以待點擊時確保是弟一張為顯示的圖片
        $('.autopic_content_img>ul>li').eq($('.autopic_content_img>ul>li').length-1).addClass('picOn');

        //漸變---
        $('.autopic_content_img').dblclick(function(){
            $('.autopic_content_img>ul>li').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>ul>li').length).addClass('picOn').siblings('.picOn').removeClass('picOn');
            $('.autopic_content_img>ul>li').eq($('.picOn').index()).stop().animate({'z-index':10, 'opacity':1},_animateSpeed).siblings().stop().animate({'z-index':0, 'opacity':0},_animateSpeed);


            //下一張
            $('.autopic_content_img').animate( _animateSpeed, function(){
                if(!_stop) {
                    timer = setTimeout(moveNext, _showSpeed);
                }
            });

        }).dblclick().end();
    }
});