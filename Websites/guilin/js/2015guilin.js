$(document).ready(function(){
    var _animateSpeed = 3000,
    //加入計時器, 輪播時間及控制開關
        timer, _showSpeed =5000, _stop = false;


    function move(){
        $('.autopic_img>div').eq($('.picOn').index()-1 ).addClass('picOn').siblings('.picOn').removeClass('picOn');
        clearTimeout(timer);
        //漸變---
        $('.autopic_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_img>div').length).siblings().css({'opacity':'1','z-index':'1'});
        $('.autopic_img>div').eq($('.picOn').index()).css({'z-index':'10','opacity':'1'});

        $('.autopic_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_img>div').length).css({'z-index':'11'});
        $('.autopic_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_img>div').length).animate({opacity:'0'},_animateSpeed);

        $('.autopic_img').stop().animate( _animateSpeed, function(){
            // 當移動到正確位置後, 依判斷來啟動計時器
            if(!_stop) {
                timer = setTimeout(move, _showSpeed);
            }
        });
    }
    var firstTime = setTimeout(move, 2000);


    //推薦景點點擊小圖換大圖
    $('.mPic .mSmallpic span').click(function(){
        $(this).parent().siblings().find('span').eq($(this).index()).stop().animate({'z-index':10,'opacity':1},800).siblings().stop().animate({'z-index':0,'opacity':0},800);
    });



    //運動旅遊點擊小圖換大圖
    $('.leftBtn').click(function(){
        var _this = $(this).parent('.mPic2').find('.mBigpic2'), _imgindex = _this.find('.imgOn');
       // alert(_imgindex.index());
        _this.find('span').eq( (_imgindex.index()-1) % _this.find('span').length).animate({'z-index':10,'opacity':1},800).addClass('imgOn').siblings().removeClass('imgOn').animate({'z-index':0,'opacity':0},800);

    });

    $('.rightBtn').click(function(){
        var _this = $(this).parent('.mPic2').find('.mBigpic2'), _imgindex = _this.find('.imgOn');
        _this.find('span').eq( (_imgindex.index()+1) % _this.find('span').length).animate({'z-index':10,'opacity':1},800).addClass('imgOn').siblings().removeClass('imgOn').animate({'z-index':0,'opacity':0},800);
    });



    //goTop
    $(".goTop").hide();
    $(window).scroll(function(){
        if($(this).scrollTop()>300){
            $(".goTop").fadeIn();
        } else {$(".goTop").fadeOut();}
    });
    $(".goTop").click(function(){
        $("html,body").animate({scrollTop:0},500);
    });
});