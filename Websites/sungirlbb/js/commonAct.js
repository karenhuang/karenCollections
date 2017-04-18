//fb宣告
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1531920713508965',
    xfbml      : true,
    version    : 'v2.7'
  });
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

//--------僅測試用----------start
  function checkDataID(pId){
    return albumOne;
    // return videoOne;
    // return downloadOne;
  }
  function albumContData(){
    return albumContOne;
  }
//--------僅測試用-----------end 

var kn = kn || {}
kn.common={
  apiData:{},
  oneData:{},
  btnId:"",
  oldLIST:"",
  timer:"",
  iconClass:"",
  thCont:"",
  clickfn:"",
  moreStatus:false,
  indexNow:0,
  idNow:0,
  setData:function(data){
    return kn.common.apiData = data;
  },
  //album video download 組list page
  setList:function(elemId,parentClass,moreBtn){
    kn.common.btnId = elemId;
    kn.common.moreId = moreBtn;
    clearTimeout(kn.common.timer); 
    switch(parentClass){
      case "albumSort":
            if(moreBtn !="albumMore"){ i =0 }
            if(kn.common.apiData.pageNo < kn.common.apiData.totalPage){ $("#albumMore").show();}else{ $("#albumMore").hide(); }
            kn.common.oldLIST = $(".th-album .md-list li");
            kn.common.iconClass = "icon-photo";
            kn.common.thCont = $(".th-album .md-list");
            kn.common.timer = setTimeout(kn.common.getList(parentClass), 100);
            break;
      case "videoSort":
            if(moreBtn !="videoMore"){ i =0 }
            if(kn.common.apiData.pageNo < kn.common.apiData.totalPage){ $("#videoMore").show();}else{ $("#videoMore").hide(); }
            kn.common.oldLIST = $(".th-video .md-list li");
            kn.common.iconClass = "icon-video";
            kn.common.thCont = $(".th-video .md-list");
            kn.common.clickfn = kn.video.clickSetting;
            kn.common.timer = setTimeout(kn.common.getList(parentClass), 100);
            break;
      case "downloadSort":
            if(moreBtn !="downloadMore"){ i =0 }
            if(kn.common.apiData.pageNo < kn.common.apiData.totalPage){ $("#downloadMore").show();}else{ $("#downloadMore").hide(); }
            kn.common.oldLIST = $(".th-download .md-list li");
            kn.common.iconClass = "icon-download";
            kn.common.thCont = $(".th-download .md-list");
            kn.common.clickfn = kn.download.clickSetting;
            kn.common.timer = setTimeout(kn.common.getList(parentClass), 100);
            break;    
    }
  },
  getList:function(parentClass){
    var oldList = kn.common.oldLIST;
    var liDom = "";
    var data = kn.common.apiData;
    if(kn.common.moreId==null){ oldList.hide();}
    if(parentClass=="albumSort"){
      for(var i=0; i<data.records.length; i++){
        liDom+= '<a href="albumCont.html/'+data.records[i].id+'">'+
          '<li id="'+data.records[i].id+'" class="pt-cont">'+                             
              '<figure>'+
                  '<img src="images/'+data.records[i].banner_name+'" alt="'+data.records[i].title+'">'+
                  '<figcaption>'+
                      '<i class="'+kn.common.iconClass+'"></i>'+data.records[i].title+
                      '<span class="times"><i>1,2342</i>次点击</span>'+
                      '<button>觀看</button>'+
                  '</figcaption>'+
              '</figure>'+                                           
          '</li>'+
        '</a>'
      } 
      kn.common.thCont.append(liDom);      
      kn.common.checkQuery();
      if(kn.common.moreId==null){ oldList.remove(); }   
    }else{
      for(var i=0; i<data.records.length; i++){
        liDom+= '<li id="'+data.records[i].id+'" class="pt-cont">'+                             
              '<figure>'+
                  '<img src="images/'+data.records[i].banner_name+'" alt="'+data.records[i].title+'">'+
                  '<figcaption>'+
                      '<i class="'+kn.common.iconClass+'"></i>'+data.records[i].title+
                      '<span class="times"><i>1,2342</i>次点击</span>'+
                      '<button>觀看</button>'+
                  '</figcaption>'+
              '</figure>'+                                           
          '</li>'
      } 
      kn.common.thCont.append(liDom);      
      kn.common.clickfn();
      kn.common.checkQuery();
      if(kn.common.moreId==null){ oldList.remove(); }              
    }
  },
  shareFB:function(pTitle,pImg,pHref){
    FB.ui({
      method: 'feed',
      link: pHref,
      title:pTitle,
      picture: 'https://dl.dropboxusercontent.com/u/39078909/sungirl/images/'+ pImg //測試用
      // prcture :'正式的domain'+pImg //正式用
    },function (response) { });
  },
  shareTwitter:function(pTitle,pHref){
    window.open('http://twitter.com/?status='.concat(encodeURIComponent(pHref)).concat(' ').concat(encodeURIComponent(pTitle)));
  },
  shareWeibo:function(pTitle,pImg,pHref){
    var p = 'https://dl.dropboxusercontent.com/u/39078909/sungirl/images/'+ pImg; //測試用
    // var p = '正式的domain'+pImg //正式用
    window.open('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(pHref) + '&title=' + encodeURIComponent(pTitle) + '&pic=' + encodeURIComponent(p));
  },
  videoSetpop:function(n,pId){
    var iframeTag = $(".videoCont .pt-videoCont iframe");
    var hdText = $(".videoCont header");
    var apiData={};
    kn.common.idNow = pId; //for shareBtn 
    kn.common.indexNow = n //for shareBtn
    apiData = location.search==""? kn.common.apiData : kn.common.oneData;
    hdText.text(apiData.records[n].title);
    iframeTag.attr("src",apiData.records[n].video_url);
    $(".md-video-popup").maskSet();  
    kn.common.shareFn(kn.common.apiData);
  },
  shareFn:function(data,id){
    var apiData = data;
    var n = kn.common.indexNow ;
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    $(".fbBtn").off('click').on("click",function(e){
      e.preventDefault();
      var _href = clean_uri+"?i="+kn.common.idNow;
      $(this).attr("href",_href);      
      kn.common.shareFB(apiData.records[n].title,apiData.records[n].banner_name,_href);
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
      kn.common.shareWeibo(apiData.records[n].title,apiData.records[n].banner_name,_href)
    });       
  },
  checkQuery:function(){
    //檢查從分享回來的qeruy id是否存在
    var iNum = [];
    var pathArray = [];
    var pageName =[];
    var clean_uri = location.protocol + "//" + location.host + location.pathname;
    if(location.search!=""){
      iNum= location.search.split("=");
      kn.common.oneData = checkDataID(iNum[1]);//檢查id是否存在 checkDataID()由後端提供
      if(!!kn.common.oneData.records[0].id){
        pathArray = location.pathname.split("/");
        pageName = pathArray[(pathArray.length-1)].split(".");
        kn.common.buildPop(iNum[1],pageName[0]);        
      }else{
        //不存在就導回
        location.href = clean_uri;
      }
    }
  },
  buildPop:function(pId,pPathname){
    //query id存在時要組燈箱畫面
    $('body').addClass('hiddenY');
    $(".th-maskbg").addClass('showMask');
    switch(pPathname){
      case "":
            $(".th-maskbg .gp-mdCont").load("popupPage/popvideo.html",function(){
              kn.common.videoSetpop(0,pId);
            });   
            break;
      case "index":
            $(".th-maskbg .gp-mdCont").load("popupPage/popvideo.html",function(){
              kn.common.videoSetpop(0,pId);
            });   
            break;
      case "video":
            $(".th-maskbg .gp-mdCont").load("popupPage/popvideo.html",function(){
              kn.common.videoSetpop(0,pId);
            }); 
            break;
      case "download":
            $(".th-maskbg .gp-mdCont").load("popupPage/popdownload.html",function(){
              kn.download.downloadSetpop(0,pId);
            });  
            break;  
    }
  }
}