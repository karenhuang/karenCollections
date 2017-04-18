
kn.download = {
  shareImg:"",
  shareTitle:"",
  //download.html的相簿list click
  clickSetting:function(){
    $(".pt-cont").on('click',function(){
      var _this = $(this);
      var _id = $(this).attr("id");
      $('body').addClass('hiddenY');
      $(".th-maskbg").addClass('showMask');
      $(".th-maskbg .gp-mdCont").load("popupPage/popdownload.html",function(){
        kn.download.downloadSetpop(_this.index(),_id);
      });  
    });
  },
  downloadSetpop:function(n,pId){
    var hdText = $(".downloadCont header"),
        bigImg = $("#dwnload-bigImg"),
        pc1 = $("#pc-img1"),
        pc2 = $("#pc-img2"),
        pc3 = $("#pc-img3"),
        pc4 = $("#pc-img4"),
        mobile1 = $("#mobile-img1"),
        mobile2 = $("#mobile-img2"),
        mobile3 = $("#mobile-img3"),
        mobile4 = $("#mobile-img4"),
        liDom="",
        popdata,
        imgsrc = "";
    kn.common.idNow = pId; //for shareBtn 
    popdata = location.search==""? kn.common.apiData : kn.common.oneData;
    imgsrc = "images/"+popdata.records[n].banner_name;
    kn.download.shareImg = popdata.records[n].banner_name;
    kn.download.shareTitle = popdata.records[n].title;
    hdText.text(popdata.records[n].title);
    bigImg.attr("src",imgsrc);
    pc1.attr("href",popdata.records[n].pc_img1);
    pc2.attr("href",popdata.records[n].pc_img2);
    pc3.attr("href",popdata.records[n].pc_img3);
    pc4.attr("href",popdata.records[n].pc_img4);
    mobile1.attr("href",popdata.records[n].mobile_img1);
    mobile2.attr("href",popdata.records[n].mobile_img2);
    mobile3.attr("href",popdata.records[n].mobile_img3);
    mobile4.attr("href",popdata.records[n].mobile_img4);
    $(".md-download-popup").maskSet();
    kn.download.shareFn();
  },
  shareFn:function(){
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    $(".fbBtn").off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href); 
      kn.common.shareFB(kn.download.shareTitle,kn.download.shareImg,_href);
    });
    $('.twitterBtn').off('click').on("click",function(e){ 
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href); 
      kn.common.shareTwitter(kn.download.shareTitle,_href);
    });
    $('.weiboBtn').off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href); 
      kn.common.shareWeibo(kn.download.shareTitle,kn.download.shareImg,_href);
    });    
  },
}

//download 最新更新
$("#downloadNew").click(function(){
  kn.common.setData(downloadNewlist);
  kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
  $(this).addClass('active').siblings().removeClass('active');
}).click();
//download 最多觀看
$("#downloadMost").click(function(){
  kn.common.setData(downloadMostlist);
  kn.common.setList($(this).attr("id"),$(this).parent().attr("class"));
  $(this).addClass('active').siblings().removeClass('active');
});
//download 更多
$("#downloadMore").click(function(){
  var _index = $("#dataBtn").find(".active").index();
  var element = "";
  if(_index==0){
    kn.common.setData(downloadNewlist); 
    element = "downloadNew";
  }else{ 
    kn.common.setData(downloadMostlist); 
    element = "downloadMost";
  }
  kn.common.setList($(this).attr("id"));
});



