$(function(){
    var moveRate=0,//移動比例
        moveY=0,//目前垂直移動的距離
        moveY1Start=0,//第1段動作,垂直滾動的起點
        moveY1Final=2000,//第1段動作,垂直滾動的終點,也是第2段動作,垂直滾動的起點
        moveY1_2Final=1000,
        moveY2Final=2800,//第2段動作,垂直滾動的終點,也是第3段動作,垂直滾動的起點
        moveY3Final=5000,//第3段動作,垂直滾動的終點
        moveY3_2Final=5000,
        moveY4Final=7000,//第4段動作,垂直滾動的終點
        moveY5Final=8000,
        bgMove_Now=0,//圖片目前水平移動的距離
        catMove_Now=0,//貓咪目前水平移動的距離
        star_now=0,//星星目前寬度or長度
        opacity_now=0,
        logoCat_now=0,
        starTop_now=0,
        tv_now=0,
        bgMove1_Start=0,//圖片第1段動作,水平移動的起點
        bgMove1_Final=3030,//圖片第1段動作,水平移動的終點,也是第3段動作,水平移動的起點
        bgMove2_Start=317,//圖片第2段動作,垂直移動的起點
        bgMove2_Final=-480,//圖片第2段動作,垂直移動的終點
        bgMove3_Final=4850,//第3段動作,水平移動的終點,也是第5段動作,水平移動的起點
        bgMove4_Final=530,//圖片第4段動作,垂直移動的終點
        bgMove5_Final=5800,//第5段動作,水平移動的終點
        catMove2_Start=490,//貓咪第2段動作,垂直移動起點
        catMove2_Final=600,//貓咪第2段動作,垂直移動終點
        catMove3_Start=250,//貓咪第3段動作,水平移動起點
        catMove3_Final=750,//貓咪第3段動作,水平移動終點
        tvMove1_Start=-920,
        tvMove1_Final=-290,
        opacity_Start=0,
        opacity_Final=1,
        logoCat_Start=700,
        logoCat_Final=1700,
        starW1_Start=200,//第1段星星起點寬度
        starW1_Final=3260,//第1段星星終點寬度
        starW2_Start=0,//第2段星星起點高度
        starW2_Final=950,//第2段星星終點高度
        starW3_Start=0,//第3段星星起點寬度
        starW3_Final=2380,//第3段星星終點寬度
        starW5_Final=600,//第5段星星終點寬度
        starW4_Start=0,//第4段星星起點高度
        starW4_Final=950,//第4段星星終點高度
        starTop4_Start=1200,
        starTop4_Final=150,
        dragStartX=0,
        dragState=false,
        dragDate=null,
        imgPos=0;//走路圖的起始position

    //走路換圖    
    function catWalk(){ 
        imgPos!= -117 ? imgPos -= 117 : imgPos=0;
        $("#moveItem").css({'backgroundPosition':imgPos+'px 0'});
    }
    $('body').on('touchstart',function(event){
        if (!dragState) {
            dragStartX = event.originalEvent.changedTouches[0].pageX;
            dragState = true;
            dragDate = new Date();
        }
    });
    $('body').on('touchend',function(event){ dragState = false;});
    $('body').on('mousewheel touchmove',function(event){
        if(dragState){ var x = event.originalEvent.changedTouches[0].pageX;            }
        function state(rStart,rFinal){
            //pc mousewheel時
            if(0>event.deltaY && moveY>=rStart && moveY<rFinal){
                moveY+=100;
                catWalk();//cat walk
            }else if(0<event.deltaY && moveY>rStart){
                moveY-=100;
                catWalk();//cat walk
            }
            //phone touchmove時
            if(x>dragStartX && moveY>=rStart && moveY<rFinal){
                moveY+=20;catWalk();//cat walk
            }else if(x<dragStartX && moveY>rStart){
                moveY-=20;catWalk();//cat walk
            }   
        }
        //第1段移動(0~1000)
        if(moveY<=moveY1_2Final){
            state(moveY1Start,moveY1_2Final);//帶入起始點跟終點條件
            moveRate=moveY/(moveY1_2Final-moveY1Start);//換算移動比例
            logoCat_now=moveRate*(logoCat_Final-logoCat_Start);
            tv_now=moveRate*(tvMove1_Final-tvMove1_Start);
            opacity_now=moveRate*(opacity_Final-opacity_Start);
            $('.logoCat').css({left:logoCat_Start+logoCat_now});
            $('.tv').css({top:tvMove1_Start+tv_now,opacity:opacity_now});
        }  
        //第1段移動(0~2000)
        if(moveY<=moveY1Final){
            state(moveY1_2Final,moveY1Final);//帶入起始點跟終點條件
            moveRate=moveY/(moveY1Final-moveY1Start);//換算移動比例
            bgMove_Now=moveRate*(bgMove1_Final-bgMove1_Start);
            star_now=moveRate*(starW1_Final-starW1_Start);
            $('.mainBg').css({left:bgMove_Now*-1});
            $("#moveItem").removeClass().addClass('itemBg1');
            $('.star1').css({width:(starW1_Start+star_now)+'px'});
            moveY>=500?$('.bg_yellow').addClass('bgShow') : $('.bg_yellow').removeClass('bgShow') ;
            if(moveY==1100){
                $('.tvCat').css({opacity:1}).animate({left:'1847px'});
            }else if(moveY==1000){
                $('.tvCat').css({opacity:0}).animate({left:'2010px'});
            }
        }
        //第2段移動
        if( moveY>=moveY1Final && moveY<=moveY2Final){
            state(moveY1Final,moveY2Final);
            moveRate=(moveY-moveY1Final)/(moveY2Final-moveY1Final);
            bgMove_Now=moveRate*(bgMove2_Final-bgMove2_Start);
            catMove_Now=moveRate*(catMove2_Final-catMove2_Start);
            star_now=moveRate*(starW2_Final-starW2_Start);
            opacity_now=moveRate*(opacity_Final-opacity_Start);
            $('.mainBg').css({top:bgMove2_Start+bgMove_Now});
            $("#moveItem").removeClass().addClass('itemBg2').css({ top: catMove2_Start+catMove_Now});
            $('.star2').css({height:star_now+'px'});
            $(".block2").css({opacity:opacity_now});
        }
        //第3段移動
        if( moveY>=moveY2Final && moveY<=moveY3Final){
            state(moveY2Final,moveY3Final);
            moveRate=(moveY-moveY2Final)/(moveY3Final-moveY2Final);
            bgMove_Now=moveRate*(bgMove3_Final-bgMove1_Final);
            catMove_Now=moveRate*(catMove3_Final-catMove3_Start);
            star_now=moveRate*(starW3_Final-starW3_Start);
            $('.mainBg').css({left:(bgMove1_Final+bgMove_Now)*-1});
            $("#moveItem").removeClass().addClass('itemBg1').css({ left: catMove3_Start+catMove_Now});
            $('.star3').css({width:star_now+'px'});
            moveY>=2900? $('.bg_red').addClass('bgShow'):$('.bg_red').removeClass('bgShow');
            if(moveY==4200){
                $(".listCat").animate({right:'-328px'});
            }else if(moveY==3900){
                $(".listCat").animate({right:0});
            }
        }
        //第4段移動
        if( moveY>=moveY3Final && moveY<=moveY4Final){
            state(moveY3Final,moveY4Final);
            moveRate=(moveY-moveY3Final)/(moveY4Final-moveY3Final);
            bgMove_Now=moveRate*(bgMove4_Final-bgMove2_Final);
            star_now=moveRate*(starW4_Final-starW4_Start);
            starTop_now=moveRate*(starTop4_Final-starTop4_Start);
            $('.mainBg').css({top:bgMove2_Final+bgMove_Now});
            $("#moveItem").removeClass().addClass('itemBg3').css({left:'725px'});
            $('.star4').css({height:star_now+'px',top:(starTop4_Start+starTop_now)+'px'});
        }
        //第5段移動
        if( moveY>=moveY4Final && moveY<=moveY5Final){
            state(moveY4Final,moveY5Final);
            moveRate=(moveY-moveY4Final)/(moveY5Final-moveY4Final);
            bgMove_Now=moveRate*(bgMove5_Final-bgMove3_Final);
            star_now=moveRate*(starW5_Final-starW3_Start);
            $('.mainBg').css({left:(bgMove3_Final+bgMove_Now)*-1});
            $("#moveItem").removeClass().addClass('itemBg1').css({ left: catMove3_Start+catMove_Now });
            $('.star5').css({width:star_now+'px'});
            moveY>=7100?$('.bg_blue').addClass('bgShow'):$('.bg_blue').removeClass('bgShow');
            if(moveY==7300){
                $('.infoCat').animate({left:'-70px'});
            }else if(moveY==7100){
                $('.infoCat').animate({left:'190px'});
            }
        }
    });
});
