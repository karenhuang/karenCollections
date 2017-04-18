/**
 * Created by Karen on 2014/9/24.
 */

$(window).load(function(){
    var liWidth = $('.nextImgBox>ul>li').width() * $(".nextImgBox>ul>li").length ;
    $(".nextImgBox>ul").css('width',liWidth);

    var dbclick=false;
    if( $(".nextImgBox>ul>li").length>1 ){

        $(".rightbtn").click(function(){
            setTimeout(function(){
                //singleclick functionality should start here.
                if(dbclick ==false){
                    //防止下一次click時,前一個尚未跑完
                    $(".nextImgBox>ul>li").first().stop(true,true);
                    // 跑完第一個li後,把第一li物件附加到最後一個li元素的後面,並把margin-left歸零
                    $(".nextImgBox>ul>li").first().animate({'margin-left': $(".nextImgBox>ul>li").first().width()*-1 },500,function(){
                        $(".nextImgBox>ul>li").last().css('margin-left','0').after( $(".nextImgBox>ul>li").first().css('margin-left','0') );
                    });
                }
            },200)
        }).dblclick(function(){
            //dblclick時不做變化
            dbclick = true;
            setTimeout(function(){
                dbclick = false
            },300)
        });

    }else{
        $(".rightbtn").css({"display":"none"});
    }





    var Ldblclick=false;

    if( $(".nextImgBox>ul>li").length>1){
        $(".leftbtn").click(function(){
            setTimeout(function(){
                if(Ldblclick ==false){
                    // 先把第最後一個li物件附加到第一個li元素的前面,並把margin-left改為負的li的寬度
                    $(".nextImgBox>ul>li").first().before($(".nextImgBox>ul>li").last().css('margin-left',$(".nextImgBox>ul>li").first().width()*-1).animate({'margin-left': 0},500));
                }
            },200)
        }).dblclick(function(){
            //dblclick時不做變化
            Ldblclick = true;
            setTimeout(function(){
                Ldblclick = false
            },300)
        });
    }else{
        $(".leftbtn").css({"display":"none"});
    }



});
