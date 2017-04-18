$(function() {
    $("#menuBtn").click(function() {
        $("body").toggleClass('leftmenu');
    });

	$("#goTop").hide();

	$(window).scroll(function() {
		if($(this).scrollTop()>300){
			$("#goTop").show();
		}else{
			$("#goTop").hide();
		}
	});
	

	

    $("#goTop").click(function() {
        $("html,body").stop().animate({scrollTop: 0});
        return false;
    });

	$(".pt_prev, .pt_next").css({
		top: $(".imgbox img").height()*0.5
	});
});

$(window).resize(function() {
	$(".pt_prev, .pt_next").css({
		top: $(".imgbox img").height()*0.5
	});
});