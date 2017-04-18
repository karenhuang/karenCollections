kn.album = {
	setList:function(){
		// albumCont.html set list
		kn.common.oneData = albumContData();
		if(kn.common.oneData.records[0]){
			kn.album.getList();
		}
	},
	getList:function(){
		var h2text =$(".th-albumCont h2");
		var liDom="";
		var albumCont = $(".th-albumCont");
		var ulCont = $(".md-albumBlock");
		var ww = 0;
		var hh = 0;
		h2text.append(kn.common.oneData.records[0].title);
		for(var i=0; i<kn.common.oneData.records[0].photo.length;i++){
			ww = parseInt(kn.common.oneData.records[0].photo[i].width,10);
			hh = parseInt(kn.common.oneData.records[0].photo[i].height,10);
			if(ww > hh){
				liDom+='<li id="'+kn.common.oneData.records[0].photo[i].id+'" class="horizontal">'+
				'<img data-width="'+kn.common.oneData.records[0].photo[i].width+'"'+
				'data-height="'+kn.common.oneData.records[0].photo[i].height+'"'+
				'src="images/'+kn.common.oneData.records[0].photo[i].photo_name+'" alt=""></li>'					
			}else{
				liDom+='<li id="'+kn.common.oneData.records[0].photo[i].id+'" class="unbent">'+
				'<img data-width="'+kn.common.oneData.records[0].photo[i].width+'"'+
				'data-height="'+kn.common.oneData.records[0].photo[i].height+'"'+
				'src="images/'+kn.common.oneData.records[0].photo[i].photo_name+'" alt=""></li>'
			}
		}
		ulCont.append(liDom);
		$(".md-albumBlock li img").load(function(){kn.album.cuttingImg()});
		kn.album.contlistClick();
	},
	cuttingImg:function(){
		if($(window).innerWidth()>630){
			$(".md-albumBlock li").attr("style","").css({height:$(".md-albumBlock .horizontal img").height()});
		}else{
			$(".md-albumBlock li").attr("style","");
		}
	},
  albumPopup:function(id){
    //albumPop左右切換
    var element = $(".md-album-popup"),//輪播最大外框
        bigimgUl = element.find(".pt-bannerList"),
        bigimgLi = element.find(".pt-bannerList li"),
        bigimg = element.find(".pt-bannerList li img"),
        pagenum = element.find(".pageNum span"),
        ptNext = element.find(".pt-next"),
        ptPrev = element.find(".pt-prev"),
        hfPrve = element.find(".half-prev"),
        hfNext = element.find(".half-next"),
        window_W = $(window).width(),
        btnCont = $(".btnCont"),
        imgMax = bigimgLi.length,
        startPos, nowAnimate,
        _id = "#cont"+id,
        imgNow = $(_id).index(),
        imgNext = null,
        nextClick = 5000;

    //初始預設;
    bigimgLi.eq(imgNow).addClass('active').css({left:0}).siblings().removeClass('active').css({"left":'100%'});
    $(".md-albumBlock li").eq(imgNow).addClass('on').siblings().removeClass("on");
    if(imgMax<2){ ptNext.hide(); ptPrev.hide(); }

    function moveNext(num) {
      imgNext = num;
      startPos = imgNext > imgNow ? 100: -100;
      nowAnimate = imgNext > imgNow ? -100: 100;          
      imgNext = imgNext > imgNow ? imgNext%imgMax : (imgNext+imgMax)%imgMax;
      bigimgLi.eq(imgNow).stop().animate({left: nowAnimate+"%"});
      $(".md-albumBlock li").eq(imgNow).removeClass('on');
      pagenum.text(bigimgLi.eq(imgNext).index()+1);
      bigimgLi.eq(imgNext).addClass('active').css({"left": startPos+"%"})
      .stop().animate({left: 0}, function() {
        if($(window).width()>720){ bigimgUl.css({"padding-top":bigimgLi.eq(imgNext).find("img").height()});}
        kn.common.idNow = bigimgLi.eq(imgNext).attr("id").substring(4); //for shareBtn 
        kn.album.shareFn(kn.common.oneData,kn.common.idNow);
        $(".md-albumBlock li").eq(imgNext).addClass('on');
        imgNow = imgNext;
        imgNext = null;
      }).siblings().removeClass('active');
    }

    $(window).resize(function(){if($(window).width()>720){ bigimgUl.css({"padding-top":bigimgLi.eq(imgNow).find("img").height()});}}).resize();

    function checkKey(e){
      e = e || window.event;
      if(e.keyCode == '37'){
        ptPrev.mousedown();
        hfPrve.mousedown();
      }else if(e.keyCode == '39'){
        ptNext.mousedown();
        hfNext.mousedown();
      }
    }
    document.onkeydown = checkKey;
    //大圖左右按鈕;
    function nextImg(){
      if (imgNext == null && imgMax>1) {
        imgNext = imgNow + 1;
        moveNext(imgNext);
      }
      return false;
    }
    function prevImg() {
      if (imgNext == null  && imgMax>1) {
        imgNext = imgNow - 1;
        moveNext(imgNext);
      }
      return false;
    }
    ptNext.on("mousedown", nextImg);
    ptPrev.on("mousedown", prevImg);
    hfNext.on("mousedown", nextImg);
    hfPrve.on("mousedown", prevImg);
    
  },  
  albumSetpop:function(n,pId){
    //album及首頁的 相簿pop
    var bigImg = $(".th-maskbg .pt-bannerList");
    var pagenum = $(".th-maskbg .pageNum");
    var pagestring ="";
    var popImg="";
    var apiData={};
    kn.common.idNow = pId; //for shareBtn 
    kn.common.indexNow = 0 //for shareBtn
    apiData = kn.common.oneData;
    for(var i=0; i<apiData.records[0].photo.length;i++){
      popImg+='<li id="cont'+apiData.records[0].photo[i].id+'"><img src="images/'+apiData.records[0].photo[i].photo_name
      +'" data-height="'+apiData.records[0].photo[i].height
      +'" data-width="'+apiData.records[0].photo[i].width+'"></li>'
    }  
    bigImg.append(popImg);
    pagestring ='Image <span>'+n+'</span> of '+apiData.records[0].photo.length+'';
    pagenum.append(pagestring);
    $(".md-album-popup").maskSet();
    kn.album.albumPopup(pId);
    kn.album.shareFn(kn.common.oneData,pId);
  },
  shareFn:function(data,id){
    var apiData = data;
    var n = kn.common.indexNow ;
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    var arrayI=0;
    for(var i=0; i<apiData.records[n].photo.length ;i++){
      if(apiData.records[n].photo[i].id == id){
        arrayI=i;
      }
    }
    $(".fbBtn").off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href);      
      kn.common.shareFB(apiData.records[n].title,apiData.records[n].photo[arrayI].photo_name,_href);
    });
    $('.twitterBtn').off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href); 
      kn.common.shareTwitter(apiData.records[n].title,_href);
    });
    $('.weiboBtn').off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href); 
      kn.common.shareWeibo(apiData.records[n].title,apiData.records[n].photo[arrayI].photo_name,_href)
    }); 
  },
	contlistClick:function(){
		// albumCont li click open lightBox
		$(".md-albumBlock li").on('click',function(){
			var _id = $(this).attr("id");
			if($(window).innerWidth()>700){
				$('body').addClass('albumhiddenY');
				$(".th-maskbg").addClass('showMask');	
				$(".th-maskbg .gp-mdCont").load("popupPage/popalbum.html",function(){
					kn.album.albumSetpop(($("#"+_id).index()+1),_id);
				});				
			}
		});
	}
}

//run kn.album.setList
if($(".th-albumCont").length>0){
	kn.album.setList();
}

//album 最新更新
$("#albumNew").click(function(){
	kn.common.setData(albumNewlist); 
	kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
	$(this).addClass('active').siblings().removeClass('active');
}).click();
//album 最多觀看
$("#albumMost").click(function(){
	kn.common.setData(albumMostlist);  
	kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
	$(this).addClass('active').siblings().removeClass('active');
});
//album 更多
$("#albumMore").click(function(e){
	e.preventDefault();
	var _index = $("#dataBtn").find(".active").index();
	var element = "";
	if(_index==0){
		kn.common.setData(albumNewlist); 
		element = "albumNew";
	}else{ 
		kn.common.setData(albumMostlist); 
		element = "albumMost";
	}
	kn.common.setList(element,"albumSort",$(this).attr("id"));
});

// albumCont 右側ad hover
$(".th-albumCont .md-adCont .pt-adCont").adHover();


//albumCont list img cutting
$(window).resize(function(){kn.album.cuttingImg();}).resize();





