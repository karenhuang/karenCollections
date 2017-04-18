$(document).ready(function(){
    var _animateSpeed = 3000,
    //加入計時器, 輪播時間及控制開關
        timer, _showSpeed =5000, _stop = false;


    function move(){
        $('.autopic_content_img>div').eq($('.picOn').index()-1 ).addClass('picOn').siblings('.picOn').removeClass('picOn');
        clearTimeout(timer);
        //漸變---
        $('.autopic_content_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>div').length).siblings().css({'opacity':'1','z-index':'1'});
        $('.autopic_content_img>div').eq($('.picOn').index()).css({'z-index':'10','opacity':'1'});

        $('.autopic_content_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>div').length).css({'z-index':'11'});
        $('.autopic_content_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>div').length).animate({opacity:'0'},_animateSpeed);

        $('.autopic_content_img').stop().animate( _animateSpeed, function(){
            // 當移動到正確位置後, 依判斷來啟動計時器
            if(!_stop) {
                timer = setTimeout(move, _showSpeed);
            }
        });
    }
    var firstTime = setTimeout(move, 2000);
});