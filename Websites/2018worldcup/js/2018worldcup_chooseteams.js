var fcstData = {
  team16:{
    A:[],
    B:[],
    C:[],
    D:[],
    E:[],
    F:[],
    G:[],
    H:[]    
  },
  team8:{
    A:[],
    B:[],
    C:[],
    D:[]
  },
  team4:{
    A:[],
    B:[]
  },
  team3:{
    A:[],
    B:[]
  },
  team2:{
    A:[],
    B:[]
  },
  teamThird:{
    A:[]
  },  
  teamFinals:{
    A:[]
  }
}
var clearfcstDate = $.extend(true, {}, fcstData);
var fcstStatus={
  t32:true,
  t16:true,
  t8:true,
  t4:true,
  t3:true,
  t2:true,
  t1:false
}
var clearfcstStatus = $.extend(true,{},fcstStatus);
var halfFcstData = null;
var copyAllFormDom;
var copyHalfFormDom;
$(function(){
  copyAllFormDom = $('.th-finals .gpmdCont').html();
  copyHalfFormDom = $('.th-finals .forClearHalf').html();
})


$.fn.getForecastForm = function(){
  var element = $(this);
  var block32 = element.find('.block32');
  var block16 = element.find('.block16');
  var block8 = element.find('.block8');
  var block4 = element.find('.block4');
  var block3 = element.find('.block3');
  var block2 = element.find('.block2');
  var block1 = element.find('.block1');
  var b32Country = block32.find(".pt-country");
  var b16Group = block16.find(".pt-group >div");
  var b8Group = block8.find('.pt-group >div');
  var b4Group = block4.find('.pt-group >div');
  var b3Group = block3.find('.pt-group >div');
  var b2Group = block2.find('.pt-group >div');
  var b1Group = block1.find('.pt-group >div');
  var clearAllBtn = element.find('.clearAllBtn');
  var clearBtn = element.find('.clearBtn');


  function setT16Data(group,el){
    var index = fcstData.team16[group].map(function(e){ return e.id;}).indexOf(el.attr('data-id'));
    if(index>=0){
      fcstData.team16[group].splice(index,1);
    }else{
      fcstData.team16[group].push({'id':el.attr('data-id'),'num':el.attr('data-num'),'name':el.find('.name').text()}); 
    }
    // console.log(fcstData.team16)
  }

  function removeT32NumDom(dom){
    fcstStatus.t32 = false;
    block16.find('.'+dom+'').removeClass('set').find('.setCountry').stop().animate({
      top: block16.find('.'+dom+'').find('.setCountry').attr("data-Y")+'px',
      left: block16.find('.'+dom+'').find('.setCountry').attr("data-X")+'px',
      width: '288px'
    },350,function(){
      var timer = setTimeout(function(){
        block16.find('.'+dom+'').find('.setCountry').remove();
        fcstStatus.t32 = true;
      },200);
    });   
  }

  function removeT32Num(el,pNum){
    var num = pNum/1;
    var country = el.parent().find('.pt-country');
    var groupName = el.attr('data-group').toLowerCase();
    el.attr('data-num',0).find('.num').text(num);
    el.removeClass('selected').siblings().not('.selected').find('.num').text(num);
    el.parent().attr('data-num',num-1).removeClass('finish');
    if(num<3){
      removeT32NumDom((groupName+num)); 
      if(num==1){
        b16Group.removeClass('hover');
        for(var i=0; i<(country.length); i++){  
          if(country.eq(i).attr('data-num')== 2){
            removeT32NumDom((groupName+(num+1)));         
          }
        }
      }
    }  
    setT16Data(groupName.toUpperCase(),el);
    for(var i=0; i<(country.length); i++){    
      for(var j=1; j<=(country.length-num); j++){  
        if(country.eq(i).attr('data-num')== (num+j)){
          setT16Data(country.eq(i).attr('data-group'),country.eq(i));
          country.eq(i).attr('data-num',0).find('.num').text(num);
          country.eq(i).removeClass('selected');
        }
      }
    }
  }

  function moveWinner(el,target,teams,originalW,changeToW){
    var speed = 350;
    var dom;
    var disX = el.offset().left - target.offset().left;
    var disY = el.offset().top - target.offset().top;   
    if(teams=='t3'){
      dom ='<div class="setCountry" data-id="'+el.find('.setCountry').attr('data-id')+'" data-X="'+ disX +'" data-Y="'+ disY 
            +'" style="position:absolute; left:'+ disX +'px; top:'+ disY +'px;">'
            +'<figure><img src="'+el.find('img').attr('src')+'" alt=""></figure>'
            +'<span class="name">'+ el.parent().find('.unchoose').find('.name').text() +'</span>'
            +'<span class="competition" data-result="1">胜</span>'
            +'</div>'
    }else{
      dom ='<div class="setCountry" data-id="'+el.find('.setCountry').attr('data-id')+'" data-X="'+ disX +'" data-Y="'+ disY 
            +'" style="position:absolute; left:'+ disX +'px; top:'+ disY +'px;">'
            +'<figure><img src="'+el.find('img').attr('src')+'" alt=""></figure>'
            +'<span class="name">'+ el.parent().find('.active').find('.name').text() +'</span>'
            +'<span class="competition" data-result="1">胜</span>'
            +'</div>'
    }     

    target.addClass('set');
    function getStatus(teams){
      switch(teams){
        case 't16':
          fcstStatus.t16 = true;
          break;
        case 't8':
          fcstStatus.t8 = true;
          break;
        case 't4':
          fcstStatus.t4 = true;
          break; 
        case 't3':
          fcstStatus.t4 = true;
          break; 
        case 't2':
          fcstStatus.t2 = true;
          break;      
      }  
    }


    if(target.find('.setCountry').length>0){
      target.removeClass('set');
      var first = target.find('.setCountry').first();
      if(teams=='t2'){
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed)
              .end().find('img').css({width:'50px','margin-left':'9px'}).stop().animate({width:'154px','margin-left':'0px'},speed);
        first.find('img').css({width:'154px','margin-left':'0px'}).stop().animate({width:'50px','margin-left':'9px'},speed);    
        first.css({width:changeToW}).stop().animate({top: first.attr("data-Y")+'px',left: first.attr("data-X")+'px',width:originalW},speed,function(){
          var timer = setTimeout(function(){
            first.remove();
            target.addClass('set');
            getStatus(teams)
          },200);
        });
      }else{
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed); 
        first.css({width:changeToW}).stop().animate({top: first.attr("data-Y")+'px',left: first.attr("data-X")+'px',width:originalW},speed,function(){
          var timer = setTimeout(function(){
            first.remove();
            target.addClass('set');
            getStatus(teams)
          },200);
        });
      }
    }else{
      // 第一次敲
      if(teams=='t2'){
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed,function(){
          getStatus(teams)
        }).end().find('img').css({width:'50px','margin-left':'9px'}).stop().animate({width:'154px','margin-left':'0px'},speed);   
      }else{
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed,function(){
          getStatus(teams)
        });       
      }
    }  
  }

  function setWinnerData(group,el,target,teams){
    var array;
    var index;
    switch(teams){
      case 'T8':
        array = fcstData.team8[group];
        break;
      case 'T4':
        array = fcstData.team4[group];
        break;
      case 'T3':
        array = fcstData.team3[group];
        break;
      case 'T2':
        array = fcstData.team2[group];
        break;
      case 'Ttiird':
        array = fcstData.teamThird[group];
        fcstStatus.t3 = true;
        fcstStatus.t2 = true;
        break;
      case 'Tfinals':
        array = fcstData.teamFinals[group];
        break;
    }

    index = array.map(function(e){ return e.groupName;}).indexOf(group+el.parent().attr('data-item'));
    if(index>=0){ array.splice(index,1); }
    array.push({
      'id':target.attr('data-id'),
      'name':target.find('.name').text(),
      'session': teams=='T3'? el.parent().attr('data-session')+'Lose': el.parent().attr('data-session')+'Win',
      'groupName': group+el.parent().attr('data-item'),
    }); 
    // console.log(fcstData.team8);
    // console.log(fcstData.team4);
    // console.log(fcstData.team3);
    // console.log(fcstData.teamFinals);
  }

  function checkRemoveNonfinish(){
    if($(this).find('.set').length>1){
      $(this).removeClass('nonefinish');
    }
  }

  b32Country.off('click').on('click',function(){
    if(fcstStatus.t32){
      var self = $(this);
      var groupName = self.attr('data-group').toLowerCase();
      var grouplength = self.parent().find('.pt-country').length;
      var nextNum = self.siblings('.selected').length+1;
      if((self.parent().attr('data-num')/1)>=1){ self.parent().removeClass('nonefinish'); }
      if(!self.hasClass('selected')){
        if((self.parent().attr('data-num')/1)<2){  
          self.addClass('selected').attr('data-num', nextNum).find('.num').text(nextNum);  
          self.siblings().not('.selected').find('.num').text(nextNum+1);
          self.parent().attr('data-num',nextNum);
          fcstStatus.t32 = false;  
          var item16 = $(".block16").find('.'+groupName+nextNum+'').addClass('set');
          var disX = self.offset().left - item16.offset().left;
          var disY = self.offset().top - item16.offset().top;
          var dom = '<div class="setCountry" data-id="'+self.attr('data-id')+'" data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'
                    + disX +'px; top:'+ disY +'px;">'
                    +'<figure><img src="'+self.find('img').attr('src')+'" alt=""></figure>'
                    +'<span class="name">'+ self.find('.name').text() +'</span>'
                    +'<span class="competition" data-result="1">胜</span>'
                    +'</div>'
          item16.append(dom).find('.setCountry').css({width:'288px'}).stop().animate({top:0,left:0,width:'218px'},350,function(){ fcstStatus.t32 = true; });     
          setT16Data(self.attr('data-group'),self);        
        }
        if((self.parent().attr('data-num')/1)==2){
          self.parent().addClass('finish');
        }
      }else{
        removeT32Num(self,self.attr('data-num'));
      }     
    }
  }).hover(function(){
    var group = $(this).parent().attr('data-group').toLowerCase();
    var groupNum = ($(this).parent().attr('data-num')/1)+1;
    if(groupNum<3){
      if($(this).attr('data-num')!=='1'){
        block16.find('.'+group+groupNum+'').addClass('hover');
      }
    }
  },function(){
    var group = $(this).parent().attr('data-group').toLowerCase();
    var groupNum = ($(this).parent().attr('data-num')/1)+1;
    if(groupNum<3){
      block16.find('.'+group+groupNum+'').removeClass('hover');
    }
  });

  b16Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team16);
    var g16 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team16[keys[i]].length; j++){
        g16++;
      }
    }  
    if(self.hasClass('set')){
      if(g16==16){
        if(fcstStatus.t16 && self.parent().find('.setCountry').length>1 && !self.hasClass('active')){
          fcstStatus.t32 = false;
          fcstStatus.t16 = false;
          if(halfFcstData==null){
            // copy teams16 data for clear half
            halfFcstData = $.extend(true,{},fcstData);
          }
          var name = self.parent().attr('data-group');
          var num = self.parent().attr('data-item');
          self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
          self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
          moveWinner(self,block8.find('.'+name+num+''),'t16','218px','178px');
          setWinnerData(name,self,self.find('.setCountry'),'T8'); 
        }
        b8Group.parent('.pt-group').each(checkRemoveNonfinish);        
      }
      else{
        self.find('.setCountry').removeClass('active'); 
        block32.each(function(){
          if($(this).attr('data-num')!='2'){
            $(this).addClass('nonefinish');
          }else{
            $(this).removeClass('nonefinish');
          }
        });
      }     
    }
  });

  b8Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team8);
    var g8 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team8[keys[i]].length; j++){
        g8++;
      }
    } 
    if(g8==8){
      if(fcstStatus.t8  && !self.hasClass('active')){
        fcstStatus.t16 = false;
        fcstStatus.t8 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        moveWinner(self,block4.find('.'+name+num+''),'t8','178px','178px');
        setWinnerData(name,self,self.find('.setCountry'),'T4');  
      }
      b4Group.parent('.pt-group').each(checkRemoveNonfinish);  
    }else{
      if(b8Group.hasClass('set')){
        b8Group.parent('.pt-group').each(function(){
          if($(this).find('.set').length>1){
            $(this).removeClass('nonefinish');
          }else{
            $(this).addClass('nonefinish');
          }
        });
      }
    }
  });

  b4Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team4);
    var g4 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team4[keys[i]].length; j++){
        g4++;
      }
    } 
    if(g4==4){
      if(fcstStatus.t4  && !self.hasClass('active')){
        fcstStatus.t8 = false;
        fcstStatus.t4 = false;
        fcstStatus.t2 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        moveWinner(self,block2.find('.'+name+num+''),'t4','178px','100px');
        setWinnerData(name,self,self.find('.setCountry'),'T2');  
        moveWinner(self.siblings(), block3.find('.'+name+(num/1+1)+ ''),'t3','178px', '238px');
        setWinnerData(name,self.siblings(),self.siblings().find('.setCountry'),'T3');  
      }
      b3Group.parent('.pt-group').each(checkRemoveNonfinish); 
      b2Group.parent('.pt-group').each(checkRemoveNonfinish); 
    }else{
      if(b4Group.hasClass('set')){
        b4Group.parent('.pt-group').each(function(){
          if($(this).find('.set').length>1){
            $(this).removeClass('nonefinish');
          }else{
            $(this).addClass('nonefinish');
          }
        });
      }
    }
  });


  b3Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team3);
    var g3 = 0;
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team3[keys[i]].length; j++){
        g3++;
      }
    } 
    if(g3==2){
      if(fcstStatus.t3  && !self.hasClass('active')){
        fcstStatus.t4 = false;
        fcstStatus.t3 = false;
        fcstStatus.t2 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        setWinnerData(name,self,self.find('.setCountry'),'Ttiird');  
        b3Group.parent('.pt-group').removeClass('nonefinish'); 
      }
    }else{
      if(b3Group.hasClass('set')){
        b3Group.parent('.pt-group').each(function(){
          if($(this).find('.set').length>1){
            $(this).removeClass('nonefinish');
          }else{
            $(this).addClass('nonefinish');
          }
        });        
      }
    }
  });

  b2Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team2);
    var g2 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team2[keys[i]].length; j++){
        g2++;
      }
    } 
    if(g2==2){
      if(fcstStatus.t2){
        if(!self.hasClass('active')){
          fcstStatus.t3 = false;
          fcstStatus.t2 = false;
          fcstStatus.t1 = true;
          $('.md-submitBtn input').get(0).disabled = false;
          var name = self.parent().attr('data-group');
          var num = self.parent().attr('data-item');
          self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
          self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
          moveWinner(self,block1.find('.'+name+num+''),'t2','100px','160px');
          setWinnerData(name,self,self.find('.setCountry'),'Tfinals');  
        }
      }else{
        b3Group.parent('.pt-group').addClass('nonefinish');  
      }
    }else{
      if(b2Group.hasClass('set')){
        b2Group.parent('.pt-group').each(function(){
          if($(this).find('.set').length>1){
            $(this).removeClass('nonefinish');
          }else{
            $(this).addClass('nonefinish');
          }
        });        
      }
    }
  });

  clearAllBtn.off('click').on('click',function(){
    if(element.find('.setCountry').length>0){
      $('.md-submitBtn input').get(0).disabled = true;
      $('html, body').stop().animate({scrollTop:element.find('.gpmdCont').offset().top - 50},500);
      element.find('.gpmdCont').empty().append(copyAllFormDom);
      fcstData = $.extend(true, {}, clearfcstDate);
      fcstStatus = $.extend(true,{},clearfcstStatus);
      // console.log(fcstData)
      element.getForecastForm();
    }  
  });

  clearBtn.off('click').on('click',function(){
    if(halfFcstData!=null){
      $('.md-submitBtn input').get(0).disabled = true;
      $('html, body').stop().animate({scrollTop:element.find('.md-finalsForm').offset().top - 50},500);
      element.find('.forClearHalf').empty().append(copyHalfFormDom);
      b16Group.removeClass('unchoose active').find(".competition").attr('data-result',0);
      fcstData = $.extend(true, {}, halfFcstData);
      fcstStatus = $.extend(true,{},clearfcstStatus);
      halfFcstData = null;
      // console.log(fcstData)
      element.getForecastForm();
    }
  });

  return element;
}


$('.th-finals').getForecastForm();
function getForecastData(){
  if(fcstStatus.t1){
    // console.log(fcstData)
    return fcstData;
  }
}
$('.md-submitBtn input').on('click', getForecastData);


var userData = {
  "team16": {
    "A": [
      {
        "id": "2",
        "num": "1",
        "name": "沙特阿拉伯"
      },
      {
        "id": "3",
        "num": "2",
        "name": "埃及"
      }
    ],
    "B": [
      {
        "id": "6",
        "num": "1",
        "name": "西班牙"
      },
      {
        "id": "7",
        "num": "2",
        "name": "摩洛哥"
      }
    ],
    "C": [
      {
        "id": "10",
        "num": "1",
        "name": "澳大利亚"
      },
      {
        "id": "11",
        "num": "2",
        "name": "秘鲁"
      }
    ],
    "D": [
      {
        "id": "14",
        "num": "1",
        "name": "冰岛"
      },
      {
        "id": "15",
        "num": "2",
        "name": "克罗地亚"
      }
    ],
    "E": [
      {
        "id": "17",
        "num": "1",
        "name": "巴西"
      },
      {
        "id": "18",
        "num": "2",
        "name": "瑞士"
      }
    ],
    "F": [
      {
        "id": "21",
        "num": "1",
        "name": "德国"
      },
      {
        "id": "22",
        "num": "2",
        "name": "墨西哥"
      }
    ],
    "G": [
      {
        "id": "25",
        "num": "1",
        "name": "比利时"
      },
      {
        "id": "26",
        "num": "2",
        "name": "巴拿马"
      }
    ],
    "H": [
      {
        "id": "29",
        "num": "1",
        "name": "波兰"
      },
      {
        "id": "30",
        "num": "2",
        "name": "塞内加尔"
      }
    ]
  },
  "team8": {
    "A": [
      {
        "id": "2",
        "name": "沙特阿拉伯",
        "session": "49Win",
        "groupName": "A1"
      },
      {
        "id": "10",
        "name": "澳大利亚",
        "session": "50Win",
        "groupName": "A2"
      }
    ],
    "B": [
      {
        "id": "17",
        "name": "巴西",
        "session": "53Win",
        "groupName": "B1"
      },
      {
        "id": "25",
        "name": "比利时",
        "session": "54Win",
        "groupName": "B2"
      }
    ],
    "C": [
      {
        "id": "6",
        "name": "西班牙",
        "session": "51Win",
        "groupName": "C1"
      },
      {
        "id": "14",
        "name": "冰岛",
        "session": "52Win",
        "groupName": "C2"
      }
    ],
    "D": [
      {
        "id": "29",
        "name": "波兰",
        "session": "56Win",
        "groupName": "D2"
      },
      {
        "id": "21",
        "name": "德国",
        "session": "55Win",
        "groupName": "D1"
      }
    ]
  },
  "team4": {
    "A": [
      {
        "id": "25",
        "name": "比利时",
        "session": "58Win",
        "groupName": "A2"
      },
      {
        "id": "10",
        "name": "澳大利亚",
        "session": "57Win",
        "groupName": "A1"
      }
    ],
    "B": [
      {
        "id": "14",
        "name": "冰岛",
        "session": "59Win",
        "groupName": "B1"
      },
      {
        "id": "29",
        "name": "波兰",
        "session": "60Win",
        "groupName": "B2"
      }
    ]
  },
  "team3": {
    "A": [
      {
        "id": "10",
        "name": "澳大利亚",
        "session": "61Lose",
        "groupName": "A1"
      }
    ],
    "B": [
      {
        "id": "14",
        "name": "冰岛",
        "session": "62Lose",
        "groupName": "B1"
      }
    ]
  },
  "team2": {
    "A": [
      {
        "id": "25",
        "name": "比利时",
        "session": "61Win",
        "groupName": "A1"
      }
    ],
    "B": [
      {
        "id": "29",
        "name": "波兰",
        "session": "62Win",
        "groupName": "B1"
      }
    ]
  },
  "teamThird": {
    "A": [
      {
        "id": "14",
        "name": "冰岛",
        "session": "63Win",
        "groupName": "A1"
      }
    ]
  },
  "teamFinals": {
    "A": [
      {
        "id": "25",
        "name": "比利时",
        "session": "64Win",
        "groupName": "A1"
      }
    ]
  }
}

function setForecastForm(){
  fcstStatus.t32 = false;
  var t16keys = Object.keys(userData.team16);
  for(var i=0; i<t16keys.length; i++){
   

    $(".block32").each(function(){
      if(t16keys[i] == $(this).attr('data-group') ){
        // console.log($(this).find('.pt-country').attr('data-id'))
        // console.log(userData.team16[t16keys[i]]);

      }
    });    
  }



  // $(".block32 .pt-country").each(function(){
  //   $(this).attr('datat-group')
  // });
}

setForecastForm()
