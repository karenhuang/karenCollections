$(window).load(function() {
    var _hd_H = $('h1').height(),
        $win = $(window),
        scrollT = $win.scrollTop(),
        $wrap = $('#wrap'),
        _fixed = $wrap.hasClass('fixed'),
        $comDiv = $('.main_content>div'),
        $navLi = $('nav ul li'),
        _n = 0;


	//resetmenu active and fixed or not-----
	function menuReset(){
		//resetmenu active
		if ((scrollT + 40) >= $("#awards").offset().top) {
	        _n=2;
	    }else if ((scrollT + 40) >= $("#pokegame").offset().top) {
	       	_n=1;
	    }else if ((scrollT + 40) >= $('h1').height()) {
	        _n=0;
	    }
	    $navLi.removeClass('active').eq(_n).addClass('active');

	    //menu fixed or not
	    if ($wrap.width() < 960 && scrollT >= _hd_H) {
	        if (!_fixed) {
	            $wrap.addClass('fixed');
	        }
	    } else {
	        if (_fixed || $wrap.width() > 960 || scrollT < _hd_H) {
	            $wrap.removeClass('fixed');
	        }
	    }
	}
	menuReset();



    $win.scroll(function() {
        scrollT = $win.scrollTop();
        // //resetmenu active-----
		menuReset();
    });
    $win.resize(function() {
        scrollT = $win.scrollTop();
        //reset the height of h1
        _hd_H = $('h1').height();
        //resetmenu-----
		menuReset();
    });;


    $navLi.click(function() {
    	var $this = $(this),
            _index = $this.index();
        //避免外連的li click時 $comDiv對應不到
        if ($this.index() < $navLi.length - 1) { 
            var	_offsetH = $comDiv.eq(_index).offset().top;
            //pc版不須扣menu高度
            if ($wrap.width() > 960) {
                $('body, html').stop().animate({
                    scrollTop: _offsetH
                });
            } else {
            	//m版許要扣menu高度
                $('body, html').stop().animate({
                    scrollTop: _offsetH - 40
                });
            }
			return false;
        } 
    });



    //TOP
    $(window).scroll(function(){
        var ST = $(window).scrollTop();
        if(ST > 0){
            var TOP = $(window).height() - 51 - 10;
            $("#goTop").stop().animate({top:TOP});
        }else{
            $("#goTop").stop().animate({top:-51});
        }
    });
    $("#goTop").click(function(){
        $("html,body").stop().animate({scrollTop:0});
        return false;
    });
});
