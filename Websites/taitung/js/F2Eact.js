$(function() {
    $(".jq-menu").click(function() {
        $("body, html").toggleClass("actMenu");
        $('body, html').attr({'style':''});
    });

    // $('.jq-user').click(function(){
    //     $('body, html').toggleClass('userMenu');
    // });
    $('.jq-user').click(function(){
        if( $('html,body').hasClass('userMenu') ){
            $('html,body').removeClass('userMenu');
            $('html,body').css({"overflow":"visible"})
            $(".userMenu #wrap").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',function(){
                $('html,body').css({"overflow":"visible"})
            });            
            
        }else {
            $('html,body').addClass('userMenu');
            $('html,body').css({"overflow":"hidden"});

        }
    })


    $(window).resize(function(){
        if($(window).width()>980){
            $('html, body').removeClass("actMenu");
            $('html, body').removeClass("userMenu");
            $('body, html').attr({'style':''});
            
        }
    }).resize();


    //goTop
    $(".jq-top").click(function(){
        $("body").animate({scrollTop:0},400);
        return false;
    });


    //好玩套票商品資訊tab切換內容----------start
    $.fn.tabFn = function(){
        var $element = $(this),
            $menuUl = $element.find(".tabMenu"),
            $menuLi = $element.find(".tabMenu li"),
            $contUl = $element.find(".tabCont"),
            $contLi = $element.find(".tabCont li"),
            $icon = $element.find(".iconCont img"),
            $hiddenCont = $element.find(".hiddenCont"),
            contUl_W = $element.innerWidth(),
            tabNow = 0,
            tabNext = null,
            iconDis = 0,
            animTime = 300;


        $contLi.eq(0).addClass("show");

        $(window).resize(function(){
            if($("body").width()<960){
                $hiddenCont.attr("style","");
            }

        });
         
        function move(pIndex){
            tabNext = pIndex;;
            $menuLi.eq(tabNext).addClass('on').siblings().removeClass('on');
            iconDis = $menuLi.eq(tabNext).offset().left - $menuUl.offset().left+$menuLi.width()*0.5+7;//7=三角形寬的一半 
            $hiddenCont.css({"height":$contLi.eq(tabNow).height()}).stop().animate({"height":$contLi.eq(tabNext).height()},300);
            $contLi.removeClass("show").eq(tabNext).addClass("show");
            $icon.stop().animate({"left":iconDis},animTime,function(){   
                tabNow = tabNext;
                tabNext = null;
            });
        }

        $menuLi.on("click",function(){
            var _this = $(this);
            if (tabNext != null || _this.hasClass("on")) return false;
            move(_this.index());
        });
        return $element;
    }
    //好玩套票商品資訊tab切換內容----------end
    $(".th-productTab").tabFn();
    $(".th-customizedTab").tabFn();


    //好玩套票商品資訊的我要加購模組----------start
    $.fn.addfun = function(){
        var $element = $(this),//輪播最大外框
            $ptBtnList = $element.find(".pt-btnList"),
            $smallimgLi = $element.find(" .pt-btnList li"),
            $btnhidden = $element.find(".btnhidden"),
            $nextPage = $element.find(".nextPage"),
            $prevPage = $element.find(".prevPage"),
            window_W = $(window).width(),
            btnhidden_W = 0,
            imgMax = $smallimgLi.length,
            pageTotal = 0,
            moveNow = false,
            pageNow = 1, //小圖現在所在頁數
            ainValue = 0;//目前移動的正負值


        $(window).resize(function(){     
            if(window_W != $(window).width()){
                $ptBtnList.css({'left':0});
                pageNow = 1;
                ainValue = 0;
                smallimgRLBtn();
            }  
            btnhidden_W = $btnhidden.width(); 

            if($(window).width()>980){
                $ptBtnList.css({ 'width': btnhidden_W*Math.ceil($smallimgLi.length/3)}); 
                if(imgMax<4){ $prevPage.hide(); $nextPage.hide(); }
                $smallimgLi.css({'width':btnhidden_W/3 -5}); 
                pageTotal = Math.ceil($smallimgLi.length/3);//小圖的總頁數(3張為一頁)
            }else{
                $ptBtnList.css({ 'width': btnhidden_W*$smallimgLi.length}); 
                if(imgMax<2){ $prevPage.hide(); $nextPage.hide(); }
                $smallimgLi.css({'width':btnhidden_W -5}); 
                pageTotal = Math.ceil($smallimgLi.length);//小圖的總頁數(1張為一頁)
            }
        }).resize();
       
        //控制小圖換頁的左右箭頭消失出現
        $prevPage.hide();
        function smallimgRLBtn(){
            if(pageNow==1){$prevPage.hide();$nextPage.show();}
            else if(pageNow>1 && pageNow<pageTotal){$prevPage.show();$nextPage.show();}
            else if(pageNow==pageTotal){$nextPage.hide();$prevPage.show();}           
        }

        function pageAnimate(){
            moveNow = true;
            $ptBtnList.stop().animate({ 'left': ainValue*btnhidden_W+"px"},500,function(){
                moveNow = false;
                smallimgRLBtn();
            });
        }

        //小圖左右按鈕
        $nextPage.click(function(){
            if(pageTotal>pageNow && moveNow == false){
                pageNow+=1; ainValue-=1;
                pageAnimate(); 
            }
            return false;
        });
        $prevPage.click(function(){
            if(pageNow>1 && moveNow == false){
                pageNow-=1; ainValue+=1; 
                pageAnimate();
            }
            return false;
        });
        return $element;      
    }
    //好玩套票商品資訊的我要加購模組----------end

    $('.th-addMore').addfun();



    //好玩自由配收合清單---------------------start
    $(".th-complex1 .md-btn").on("click",function(){
        $(this).toggleClass('btnOpen');
        $(this).siblings('.md-cont').toggleClass('contOpen');
    });
    //好玩自由配收合清單---------------------end


    $(".jq-notYet").click(function(){
        $(this).css({"display":"none"});
        $(this).siblings(".already").css({"display":"block"});
    });

    $(".bt-notYet").on("click",function(){
        $(".th-qrcode").addClass('showqrcode');
    });
    $(".th-qrcode, .th-qrcode .pt-close").on("click",function(){
        $(".th-qrcode").removeClass('showqrcode');
    });

});