$(document).ready(function(){
    $(".goTop").hide();
    $(function(){
        $(window).scroll(function(){
            if($(this).scrollTop()>1 && $(window).width()>480){
                $(".goTop").fadeIn();
            } else {
                $(".goTop").fadeOut();
            }
        });
    });

    $(".goTop a").click(function(){
        $("html,body").animate({scrollTop:0},800);
        return false;
    });

    //menu滑動效果
    $('.menu_content > ul >li').eq(1).click(function () { $('html,body').animate({ scrollTop: $('.content_photography').offset().top }, 1000); });
    $('.menu_content > ul >li').eq(2).click(function () { $('html,body').animate({ scrollTop: $('.content_intellectuality').offset().top }, 1000); });
    $('.menu_content > ul >li').eq(3).click(function () { $('html,body').animate({ scrollTop: $('.content_cuisine').offset().top }, 1000); });
    $('.menu_content > ul >li').eq(4).click(function () { $('html,body').animate({ scrollTop: $('.content_architecture').offset().top }, 1000); });
    $('.menu_content > ul >li').eq(5).click(function () { $('html,body').animate({ scrollTop: $('.content_hedonism').offset().top }, 1000); });

    //大圖淡入淡出
    var _animateSpeed = 3000,
    //加入計時器, 輪播時間及控制開關
        timer, _showSpeed =5000, _stop = false;

    //照片大於一張的時候才做淡入淡出
    if($('.autopic_content_img').length>1){
        //在第最後一張加上liOn的class並將最後一張透明度設為0
        $('.autopic_content_img>div').eq($('.autopic_content_img>div').length-1).addClass('picOn');
        $('.autopic_content_img>div').eq($('.autopic_content_img>div').length-1).css({'opacity':'0'});
//        $('.picture_pointright').click(function(){
//            $('.autopic_content_img>div').eq(($('.picOn').index()+1 ) % $('.autopic_content_img>div').length).addClass('picOn').siblings('.picOn').removeClass('picOn');
//            clearTimeout(timer);
//            //漸變---
//            $('.autopic_content_img>div').eq($('.picOn').index()-1 ).siblings().css({'opacity':'1','z-index':'1'});
//            $('.autopic_content_img>div').eq($('.picOn').index()).css({'z-index':'10','opacity':'1'});
//
//
//            $('.autopic_content_img>div').eq($('.picOn').index()-1 ).css({'z-index':'11'});
//            $('.autopic_content_img>div').eq($('.picOn').index()-1).animate({opacity:'0'},_animateSpeed);
//
//            $('.autopic_content_img').stop().animate( _animateSpeed, function(){
//                // 當移動到正確位置後, 依判斷來啟動計時器
//                if(!_stop) {
//                    timer = setTimeout(move, _showSpeed);
//                }
//            });
//        }).click().end();


    }


    $('.autopic_content_img').dblclick(function(){
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

    }).dblclick().end();

    //滑鼠移入時,暫停輪播
    $('.autopic_content_img, .autopic_content_opacity').mouseenter(function(){
        _stop = true;
        clearTimeout(timer);
    });

    //滑鼠移出時,繼續輪播
    $('.autopic_content_img, .autopic_content_opacity').mouseleave(function(){
        _stop = false;
        timer = setTimeout(move, _showSpeed);
    });

    function move(){
        $('.autopic_content_img').dblclick();
    }



    //行程講座報名button換圖
    $('.industry>a>img').mouseenter(function(){
        $(this).attr('src','image/button_hover.png');
    });
    $('.industry>a>img').mouseleave(function(){
        $(this).attr('src','image/button.png');
    });


});


$(window).load(function() {
    $(".hotimg").hide();
    if($(window).width()<481){
        $('.autopic_content_img').css({'height': $('.autopic_content_opacity>a>img').height()  });
        $('.autopic_content_img>div').css({ 'height':$('.autopic_content_opacity>a>img').height()  });
        $('.autopic_content_opacity').css({'margin-top': 0});
        $('.autopic_content_opacity').css({'margin-left': 0});

        //攝影達人mobile版高度
        $('.photography_longColorblock, .photography_position, .photography_infobox').css({'min-height':
            $('.photography_infobox>.infobox_text').height()+
            $('.photography_infobox>.infobox_text>.infobox_text_expert').height()*0.5
        });

        //知性達人mobile版高度
        $('.intellectuality_longColorblock, .intellectuality_position, .intellectuality_infobox').css({'min-height':
            $('.intellectuality_infobox>.infobox_text').height()+
            $('.intellectuality_infobox>.infobox_text>.infobox_text_expert').height()*0.6
        });

        //建築達人mobile版高度
        $('.architecture_longColorblock, .architecture_position, .architecture_infobox').css({'min-height':
            $('.architecture_infobox>.infobox_text').height()+
            $('.architecture_infobox>.infobox_text>.infobox_text_expert').height()*0.5
        });

        //美食達人mobile版高度
        $('.cuisine_longColorblock, .cuisine_position, .cuisine_infobox').css({'min-height':
            $('.cuisine_infobox>.infobox_text').height()+
            $('.cuisine_infobox>.infobox_text>.infobox_text_expert').height()*0.6
        });

        //愛玩達人mobile版高度
        $('.hedonism_longColorblock, .hedonism_position, .hedonism_infobox').css({'min-height':
            $('.hedonism_infobox>.infobox_text').height()+
            $('.hedonism_infobox>.infobox_text>.infobox_text_expert').height()*0.5
        });


        //行程講座 行程hot小icon在第一筆資料才出現
        $('.travel_details_content>ul>li').eq(0).find('.hotimg').css({'display':'inline-block', 'margin-right':'5px'});
        $('.travel_details_content>ul>li').eq(0).find('.traveltitle').css({'width':'100%'});

    }else{
        $('.autopic_content_img').css({'height': $('.autopic_content_opacity>a>img').height()  });
        $('.autopic_content_img>div').css({ 'height':$('.autopic_content_opacity>a>img').height()  });
        $('.autopic_content_opacity').css({'margin-top': $('.autopic_content_opacity>a>img').height() * -0.5});
        $('.autopic_content_opacity').css({'margin-left': $('.autopic_content_opacity>a>img').width() * -0.5});


        //攝影達人高度, pc高度700
        $('.photography_longColorblock, .photography_position, .photography_bgtitle').css({'min-height': '700px'});
        //知性達人高度,  pc高度700
        $('.intellectuality_longColorblock, .intellectuality_position, .intellectuality_bgtitle').css({'min-height': '700px'});
        //建築達人高度,  pc高度700
        $('.architecture_longColorblock, .architecture_position, .architecture_bgtitle').css({'min-height': '700px'});
        //美食達人高度,  pc高度700
        $('.cuisine_longColorblock, .cuisine_position, .cuisine_bgtitle').css({'min-height': '700px'});
        //愛玩達人高度,  pc高度700
        $('.hedonism_longColorblock, .hedonism_position, .hedonism_bgtitle').css({'min-height': '700px'});


        //行程講座 行程hot小icon在第一筆資料才出現
        $('.travel_details_content>ul>li').eq(0).find('.hotimg').css({'display':'inline-block', 'margin-right':'5px'});
        $('.travel_details_content>ul>li').eq(0).find('.traveltitle').css({'width':'470px'});
    }



    //動態調整----------------------
    $(window).resize(function(){

        if($(window).width()<481){
            $('.autopic_content_img').css({'height': $('.autopic_content_opacity>a>img').height()  });
            $('.autopic_content_img>div').css({ 'height':$('.autopic_content_opacity>a>img').height()  });
            $('.autopic_content_opacity').css({'margin-top': 0});
            $('.autopic_content_opacity').css({'margin-left': 0});

            //攝影達人mobile版高度
            $('.photography_longColorblock, .photography_position, .photography_infobox').css({'min-height':
                $('.photography_infobox>.infobox_text').height()+
                $('.photography_infobox>.infobox_text>.infobox_text_expert').height()*0.5
            });

            //知性達人mobile版高度
            $('.intellectuality_longColorblock, .intellectuality_position, .intellectuality_infobox').css({'min-height':
                $('.intellectuality_infobox>.infobox_text').height()+
                $('.intellectuality_infobox>.infobox_text>.infobox_text_expert').height()*0.6
            });

            //建築達人mobile版高度
            $('.architecture_longColorblock, .architecture_position, .architecture_infobox').css({'min-height':
                $('.architecture_infobox>.infobox_text').height()+
                $('.architecture_infobox>.infobox_text>.infobox_text_expert').height()*0.5
            });

            //美食達人mobile版高度
            $('.cuisine_longColorblock, .cuisine_position, .cuisine_infobox').css({'min-height':
                $('.cuisine_infobox>.infobox_text').height()+
                $('.cuisine_infobox>.infobox_text>.infobox_text_expert').height()*0.6
            });

            //愛玩達人mobile版高度
            $('.hedonism_longColorblock, .hedonism_position, .hedonism_infobox').css({'min-height':
                $('.hedonism_infobox>.infobox_text').height()+
                $('.hedonism_infobox>.infobox_text>.infobox_text_expert').height()*0.5
            });


            //行程講座 行程hot小icon在第一筆資料才出現
            $('.travel_details_content>ul>li').eq(0).find('.hotimg').css({'display':'inline-block', 'margin-right':'5px'});
            $('.travel_details_content>ul>li').eq(0).find('.traveltitle').css({'width':'100%'});

        }else{
            $('.autopic_content_img').css({'height': $('.autopic_content_opacity>a>img').height()  });
            $('.autopic_content_img>div').css({ 'height':$('.autopic_content_opacity>a>img').height()  });
            $('.autopic_content_opacity').css({'margin-top': $('.autopic_content_opacity>a>img').height() * -0.5});
            $('.autopic_content_opacity').css({'margin-left': $('.autopic_content_opacity>a>img').width() * -0.5});

            //攝影達人高度, pc高度700
            $('.photography_longColorblock, .photography_position, .photography_bgtitle').css({'min-height': '700px'});
            //知性達人高度,  pc高度700
            $('.intellectuality_longColorblock, .intellectuality_position, .intellectuality_bgtitle').css({'min-height': '700px'});
            //建築達人高度,  pc高度700
            $('.architecture_longColorblock, .architecture_position, .architecture_bgtitle').css({'min-height': '700px'});
            //美食達人高度,  pc高度700
            $('.cuisine_longColorblock, .cuisine_position, .cuisine_bgtitle').css({'min-height': '700px'});
            //愛玩達人高度,  pc高度700
            $('.hedonism_longColorblock, .hedonism_position, .hedonism_bgtitle').css({'min-height': '700px'});


            //行程講座 行程hot小icon在第一筆資料才出現
            $('.travel_details_content>ul>li').eq(0).find('.hotimg').css({'display':'inline-block', 'margin-right':'5px'});
            $('.travel_details_content>ul>li').eq(0).find('.traveltitle').css({'width':'470px'});
        }





    });






});
