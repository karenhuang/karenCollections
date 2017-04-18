kn.video = {
	//video.html的相簿list click
	clickSetting:function(){
    $(".pt-cont").on('click',function(){
    	var _this = $(this);
    	var _id = $(this).attr("id");
    	$('body').addClass('hiddenY');
    	$(".th-maskbg").addClass('showMask');
			$(".th-maskbg .gp-mdCont").load("popupPage/popvideo.html",function(){
				kn.common.videoSetpop(_this.index(),_id);
			}); 
    });
	},
}

//video 最新更新
$("#videoNew").click(function(){
	kn.common.setData(videoNewlist);  
	kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
	$(this).addClass('active').siblings().removeClass('active');
}).click();
//video 最多觀看
$("#videoMost").click(function(){
	kn.common.setData(videoMostlist);  
	kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
	$(this).addClass('active').siblings().removeClass('active');
});
//video 更多
$("#videoMore").click(function(e){
	e.preventDefault();
	var _index = $("#dataBtn").find(".active").index();
	var element = "";
	if(_index==0){
		kn.common.setData(videoNewlist); 
		element = "videoNew";
	}else{ 
		kn.common.setData(videoMostlist); 
		element = "videoMost";
	}	
	kn.common.setList($(this).attr("id"));
});

