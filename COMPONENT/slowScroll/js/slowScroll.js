
$(function(){
	$.slowScroll();
	console.log(111)
});


(function($){
	$.slowScroll = function(options){
		var step = 300; //每滾動一次的距離
		var aniSpeed = 300; //移動速度
		var posNow = 0; //現在位置
        var lastTime = new Date(); 

		$("html,body").mousewheel(function(evt,delta,deltaX,deltaY) {
				var now = new Date();
			    if( (now-lastTime) >100){
			    	posNow = $(window).scrollTop()+step*(-deltaY);
					$("html,body").stop(true).animate({scrollTop:posNow},aniSpeed);	  
	        		lastTime = new Date(); 
			    }
	    	return false;
	    });
	}
})(jQuery);


