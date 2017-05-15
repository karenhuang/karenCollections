$(window).load(function(){ 

  //首頁右側hover效果
  $(".md-activity .pt-adCont").adHover();

});





kn.index = {
  apiData:"",
  oldLIST:"",
  setList:function(elemId,moreBtn){
    var oldList = $(".th-asideInfo >div");
    var data;
    var liDom="";
    var dateTime ="";
    var array=[];
    kn.common.btnId = elemId;//通知共用albumSetpop
    data = kn.common.apiData;
    if(moreBtn != "indexMore"){ oldList.hide();}
    if(data.pageNo < data.totalPage){ $("#indexMore").show();}else{ $("#indexMore").hide(); }
    for(var i=0; i<data.records.length; i++){
      dateTime = data.records[i].ready_time;
      array = dateTime.substr(0,10).split("-");
      switch(data.records[i].category){
        case "photo":
          liDom+= '<div class="md-album">'+
                    '<a href="albumCont.html/'+data.records[i].id+'">'+
                    '<div class="album-cont">'+
                      '<figure id="'+data.records[i].id+'">'+
                        '<img src="images/'+data.records[i].banner_name+'" alt="'+data.records[i].title+'">'+
                        '<span class="sort">'+
                            '<p>'+data.records[i].sort_main+'</p>'+
                            '<span>'+data.records[i].sort_sub+'</span>'+
                        '</span>'+
                        '<figcaption>'+
                          '<i class="icon-photo"></i>'+data.records[i].title+
                          '<span class="times"><i>1,2342</i>次点击</span>'+
                          '<time>'+
                            '<span>'+array[0]+'</span>年'+
                            '<span>'+parseInt(array[1],10)+'</span>月'+
                            '<span>'+parseInt(array[2],10)+'</span>日'+
                          '</time>'+
                        '</figcaption>'+
                      '</figure>'+                           
                    '</div>'+
                    '</a>'+
                  '</div>'                
              break;
        case "video":
          liDom+= '<div class="md-video">'+
                    '<div class="video-cont">'+
                      '<figure id="'+data.records[i].id+'">'+
                        '<img src="images/'+data.records[i].banner_name+'" alt="'+data.records[i].title+'">'+
                        '<span class="sort">'+
                            '<p>'+data.records[i].sort_main+'</p>'+
                            '<span>'+data.records[i].sort_sub+'</span>'+
                        '</span>'+
                        '<div class="pt-btn"></div>'+
                        '<figcaption>'+
                          '<i class="icon-video"></i>'+data.records[i].title+
                          '<span class="times"><i>1,2342</i>次点击</span>'+
                          '<time>'+
                            '<span>'+array[0]+'</span>年'+
                            '<span>'+parseInt(array[1],10)+'</span>月'+
                            '<span>'+parseInt(array[2],10)+'</span>日'+
                          '</time>'+
                        '</figcaption>'+
                      '</figure>'+                           
                    '</div>'+
                  '</div>'  
              break;
      }
    }
    $(".th-asideInfo").append(liDom);
    kn.index.clickSetting();
    kn.common.checkQuery();
    if(moreBtn != "indexMore"){oldList.remove(); }
  },
  clickSetting:function(){
    $(".video-cont figure").on('click',function(){
      var _this =  $(this).parents(".md-video");
      var _id = $(this).attr("id");
      $('body').addClass('hiddenY');
      $(".th-maskbg").addClass('showMask');
      $(".th-maskbg .gp-mdCont").load("popupPage/popvideo.html",function(){
        kn.common.videoSetpop(_this.index(),_id);
      }); 
    });
  },
}



//預設先跑新更新
kn.common.setData(newlist);    
kn.index.setList("indexNew");

// 插入廣告(首頁m版)
function appendAdbanner(){
  var adCont = '<div class="md-adCont">'+
        '<div class="adCont">'+
            '<a href="" target="_blank">'+
                '<img src="images/300x250_wechat.jpg">'+
            '</a>'+
        '</div>'+
    '</div>'
  if($(".th-asideInfo > div").length>4){
    $(".th-asideInfo > div").eq(3).after(adCont)
  }  
}

appendAdbanner();


//index 最新更新
$("#indexNew").click(function(){
  kn.common.setData(newlist);  
  kn.index.setList($(this).attr("id"));
  $(this).addClass('active').siblings().removeClass('active');
});
//index 最多觀看
$("#indexMost").click(function(){
  kn.common.setData(mostlist);  
  kn.index.setList($(this).attr("id"));
  $(this).addClass('active').siblings().removeClass('active');
});

//index 更多
$("#indexMore").click(function(e){
  e.preventDefault();
  var _index = $("#dataBtn").find(".active").index();
  var element = "";
  var _this = $(this);
  if(_index==0){ 
    element = "indexNew";
    kn.common.setData(newlist2); 
    kn.index.setList(element,_this.attr("id"));
  }else{ 
    element = "indexMost";
    kn.common.setData(mostlist); 
    kn.index.setList(element,_this.attr("id"));
  }
});
