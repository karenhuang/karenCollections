$(window).load(function(){
    var $win = $(window),
        $silderUl = $('.silderUl'),
        $silderimg = $silderUl.find('img'),
        $next = $(".pt_next"),
        $prev = $(".pt_prev"),
        $imgactive = $silderUl.find('.active'),
        $imgprev = $silderUl.find('.imgprev'),
        $imgnext = $silderUl.find('.imgnext'),
        $silderLi = $silderUl.find('li'),
        $nav = $('nav'),
        $navLi = $nav.find('li'),
        $tabWord = $(".tabWord"),
        $tabWordLi = $tabWord.find('li'),
        btnid = null,
        silderLi_L = $silderLi.length,
        imgNow= 0,
        imgNext = null,
        aniTime = 400,
        initTime = 0,
        clicknum = null,
        liNow=0, 
        liNext=0,
        navliState = false,
        absClick = null,
        dragState = false, 
        dragStartX = 0, 
        dragDate= null;

    //判斷裝置
    var mobiles = new Array
            (
                "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
                "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
                "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
                "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
                "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
                "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
                "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
                "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
                "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
                "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
                "s8000", "bada", "googlebot-mobile"
            );

    var ua = navigator.userAgent.toLowerCase();
    var isMobile = false;
    for (var i = 0; i < mobiles.length; i++) {
        if (ua.indexOf(mobiles[i]) > 0) {
            isMobile = true;                
            break;
        }
    }



    $(window).resize(function() {
        $silderUl.each(function (index,element){
            var target = $(element);
            target.css({height:target.children("li").outerHeight(true)});
        });
    }).resize();

    //初始設定silder menu 及content active在第一個元素
    $navLi.eq(imgNow).addClass('active').siblings().removeClass('active');    
    $tabWordLi.eq(imgNow).addClass('active').siblings().removeClass('active');
    //$silderLi.eq(imgNow).addClass('active');
    moveImg(imgNow,'init');

    function moveImg(num,id){
        imgNext = num;
        btnid = id;
        //menu及content的下一個active
        $navLi.eq(imgNext% silderLi_L).addClass('active').siblings().removeClass('active');
        $tabWordLi.eq(imgNext% silderLi_L).addClass('active').siblings().removeClass('active');

        //右鍵click時的動態
        if(btnid=='rightBtn'){
            //change li (position) then change img (rotateY)
            //prev --> prev-1
            $silderLi.eq((imgNext-2)% silderLi_L).css({"left":"-100%"})
            .stop().animate({"left":"-200%"},aniTime)
            .find('img').stop().animate({rotateY:'0deg',translateX:'0'},aniTime);


            //now --> prev
            $silderLi.eq((imgNext-1)% silderLi_L).css({ "left":0})
            .addClass('imgprev').siblings().removeClass('imgprev').end()
            .stop().animate({"left":"-100%"},aniTime)
            .find('img').stop().animate({rotateY:'45deg',translateX:'150px'},aniTime);


            //next+1 --> next
            $silderLi.eq((imgNext+1)% silderLi_L).css({"left":"200%"})
            .addClass('imgnext').siblings().removeClass('imgnext').end()
            .stop().animate({"left":"100%"},aniTime)
            .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},aniTime);


            //next --> now
            $silderLi.eq(imgNext%silderLi_L).css({ "left":"100%"}).addClass('active')
            .siblings().removeClass('active').end()
            .stop().animate({ "left":0},aniTime).find('img').stop().animate({
                rotateY:'0deg',translateX:'0' 
            },aniTime,function(){
                imgNow = imgNext% silderLi_L; 
                liNow = imgNext% silderLi_L;
                imgNext = null;
                if(navliState && absClick>1){                    
                    moveImg(imgNow+1,'rightBtn');
                    absClick--; 
                }else if(absClick==1){
                    navliState=false;
                    absClick=null;
                }
            });
        }

        //左鍵click時
        if(btnid=='leftBtn'){
            //change li (position) then change img (rotateY)
            //prve-1 --> prev 
            $silderLi.eq((imgNext-1)% silderLi_L).css({"left":"-200%"})
            .addClass('imgprev').siblings().removeClass('imgprev').end()
            .stop().animate({ "left":"-100%"},aniTime)
            .find('img').stop().animate({ rotateY:'45deg',translateX:'150px'},aniTime);


            //now --> next
            $silderLi.eq((imgNext+1)% silderLi_L).css({"left":"0"})
            .addClass('imgnext').siblings().removeClass('imgnext').end()
            .stop().animate({"left":"100%"},aniTime)
            .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},aniTime);


            //next --> next+1
            $silderLi.eq((imgNext+2)% silderLi_L).css({"left":"100%"})
            .stop().animate({"left":"200%"},aniTime)
            .find('img').stop().animate({rotateY:'0deg',translateX:'0' },aniTime);


            //prev --> now
            $silderLi.eq(imgNext% silderLi_L).css({"left":"-100%"})
            .addClass('active').siblings().removeClass('active').end()
            .stop().animate({"left":0},aniTime).find('img').stop().animate({rotateY:'0deg', translateX:'0' 
            },aniTime,function(){
                imgNow = imgNext% silderLi_L; 
                //第一次取餘數取得0或負值+length後再取餘數取得正值,以利$navLi內的運算
                //clicknum = _this.index()-liNow 才會是正確的
                liNow = ((imgNext% silderLi_L)+silderLi_L)%silderLi_L;
                imgNext = null;
                if(navliState && absClick>1){                    
                    moveImg(imgNow-1,'leftBtn');
                    absClick--;                  
                }else if(absClick==1){
                    navliState=false;
                    absClick=null;
                }   
            });
        }

        //init
        if(btnid=='init'){
            //prve-1 --> prev 
            $silderLi.eq((imgNext-1)% silderLi_L).css({"left":"-200%"})
            .addClass('imgprev').siblings().removeClass('imgprev').end()
            .stop().animate({ "left":"-100%"},initTime)
            .find('img').stop().animate({ rotateY:'45deg',translateX:'150px'},initTime);


            //now --> next
            $silderLi.eq((imgNext+1)% silderLi_L).css({"left":"0"})
            .addClass('imgnext').siblings().removeClass('imgnext').end()
            .stop().animate({"left":"100%"},initTime)
            .find('img').stop().animate({rotateY:'-45deg',translateX:'-150px'},initTime);


            //prev --> now
            $silderLi.eq(imgNext% silderLi_L).css({"left":"-100%"})
            .addClass('active').siblings().removeClass('active').end()
            .stop().animate({"left":0},initTime).find('img').stop().animate({rotateY:'0deg', translateX:'0' 
            },initTime,function(){
                imgNow = imgNext% silderLi_L; 
                //第一次取餘數取得0或負值+length後再取餘數取得正值,以利$navLi內的運算
                //clicknum = _this.index()-liNow 才會是正確的
                liNow = ((imgNext% silderLi_L)+silderLi_L)%silderLi_L;
                imgNext = null;
                if(navliState && absClick>1){                    
                    moveImg(imgNow-1,'leftBtn');
                    absClick--;                  
                }else if(absClick==1){
                    navliState=false;
                    absClick=null;
                }   
            });
        }
    }


    $next.on('mousedown touchstart', function(e){
        var _id = $(this).attr('id');
        if( imgNext==null && silderLi_L>1){
            imgNext= imgNow+1;
            moveImg(imgNext,_id);              
        }
        return false;
    });

    $prev.on('mousedown touchstart', function(e){
        var _id = $(this).attr('id');
        if( imgNext==null && silderLi_L>1){
            //第一次取餘數取得0或負值+length後再取餘數取得正值,以便傳入的都是正值
            //clicknum = _this.index()-liNow 才會是正確的
            imgNext= (((imgNow-1)%silderLi_L)+silderLi_L)%silderLi_L;
            moveImg(imgNext,_id);
        }
        return false;
    });


    $navLi.on('mousedown touchstart click', function(e) {
        var _this = $(this);
        liNext = _this.index();
        if (imgNext != null || _this.hasClass("active")) return false;
        clicknum = _this.index()-liNow;    
        absClick = Math.abs(clicknum);
        function setIndex(){
            liNow = liNext;
            liNext = null;
        }
        setTimeout(setIndex, 500);
        
        //判斷方向後click
        if(clicknum>0 && absClick< silderLi_L-1){
            navliState=true;
            $next.mousedown(); 
        }
        if(clicknum<0 && absClick< silderLi_L-1){
            navliState=true;
            $prev.mousedown();
        }

        //第0張跟最後1張的切換
        if(clicknum>0 && absClick==silderLi_L-1){ $prev.mousedown(); }
        if(clicknum<0 && absClick==silderLi_L-1){ $next.mousedown(); }
        return false;
    });

   
    $silderLi.on("mousedown touchstart",function(e){
        if(!dragState && imgNext==null ){
            dragStartX = e.type == "mousedown" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            dragDate = new Date();
            dragState = true;
        }
        //防止被drag以致後續動作無法繼續
        if(e.type == "mousedown"){   e.preventDefault();}
    });
    $silderLi.on("mouseup touchend",function(e){
        var _this = $(this);
        if(dragState) {
            var passDate = new Date()-dragDate;
            var x = e.type == "mouseup" ? e.pageX : e.originalEvent.changedTouches[0].pageX;
            if(passDate>200 && dragStartX!=x){
                if(x > dragStartX){ $prev.mousedown();}
                else if(x < dragStartX){ $next.mousedown(); }
                _this.find('a').on("click dblclick",function(){return false});
            }else{    
                if(_this.hasClass('imgnext')){
                    _this.find('a').on("click dblclick",function(){return false});
                    $next.mousedown();
                }else if(_this.hasClass('imgprev')){
                    _this.find('a').on("click dblclick",function(){return false});
                    $prev.mousedown();
                }else if(_this.hasClass('active') ){
                    _this.find('a').off(); 
                    //是pc版才開燈箱
                    if(!isMobile){
                        $(".videoA").fancybox({
                            'width': 680,
                            'height': 500,
                            'padding': 3,
                            'autoScale': false,
                            'type': 'iframe'
                            , helpers: {
                                overlay: {
                                    locked: false // try changing to true and scrolling around the page
                                }
                            }
                        });
                    } 
                }         
            }  
            dragState = false;
        }else{
            _this.find('a').on("click dblclick",function(){return false});
        }  
    });
});