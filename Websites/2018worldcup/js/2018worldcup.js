var fcstData = {
  team32:{
    A:[],
    B:[],
    C:[],
    D:[],
    E:[],
    F:[],
    G:[],
    H:[]    
  },
  team16:{
    A:[],
    B:[],
    C:[],
    D:[]
  }

}
var fcstStatus={
  t32:true,
  t16:true
}

function setT32Data(group,el){
  var index = fcstData.team32[group].map(function(e){ return e.id;}).indexOf(el.attr('data-id'));
  if(index>=0){
    fcstData.team32[group].splice(index,1);
  }else{
    fcstData.team32[group].push({'id':el.attr('data-id'),'num':el.attr('data-num')}); 
  }
  // console.log(fcstData.team32);
}

function removeT32NumDom(dom){
  fcstStatus.t32 = false;
  $(".block16").find('.'+dom+'').removeClass('set').find('.setCountry').stop().animate({
    top: $(".block16").find('.'+dom+'').find('.setCountry').attr("data-Y")+'px',
    left: $(".block16").find('.'+dom+'').find('.setCountry').attr("data-X")+'px'
  },350,function(){
    var timer = setTimeout(function(){
      $(".block16").find('.'+dom+'').find('.setCountry').remove();
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
  el.parent().attr('data-num',num-1);
  if(num<3){
    removeT32NumDom((groupName+num)); 
    if(num==1){
      $(".block16 .pt-group >div").removeClass('hover');
      for(var i=0; i<(country.length); i++){  
        if(country.eq(i).attr('data-num')== 2){
          removeT32NumDom((groupName+(num+1)));         
        }
      }
    }
  }  
  setT32Data(groupName.toUpperCase(),el);
  for(var i=0; i<(country.length); i++){    
    for(var j=1; j<=(country.length-num); j++){  
      if(country.eq(i).attr('data-num')== (num+j)){
        setT32Data(country.eq(i).attr('data-group'),country.eq(i));
        country.eq(i).attr('data-num',0).find('.num').text(num);
        country.eq(i).removeClass('selected');
      }
    }
  }
}


$(".block32 .pt-country").off('click').on('click',function(){
  if(fcstStatus.t32){
    var self = $(this);
    var groupName = self.attr('data-group').toLowerCase();
    var grouplength = self.parent().find('.pt-country').length;
    var nextNum = self.siblings('.selected').length+1;
    if((self.parent().attr('data-num')/1)>=3){
      self.parent().removeClass('nonefinish');
    }
    if(!self.hasClass('selected')){
      self.addClass('selected').attr('data-num', nextNum).find('.num').text(nextNum);  
      self.siblings().not('.selected').find('.num').text(nextNum+1);
      self.parent().attr('data-num',nextNum);
      if(nextNum<grouplength-1){
        fcstStatus.t32 = false;
        // "1,2的animate動作";     
        var item16 = $(".block16").find('.'+groupName+nextNum+'').addClass('set');
        var disX = self.offset().left - item16.offset().left;
        var disY = self.offset().top - item16.offset().top;
        var dom = '<div class="setCountry" data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'
                  + disX +'px; top:'+ disY +'px;" data-after="-">'
                  +'<span class="name">'+ self.find('.name').text() +'</span>'
                  +'<ul class="competition"><li data-result="1">勝</li><li data-result="0">負</li></ul>'
                  +'</div>'
        item16.append(dom).find('.setCountry').stop().animate({top:0,left:0},350,function(){
          fcstStatus.t32 = true;
        });     
      }
      if((grouplength-2) == self.siblings('.selected').length){
        // "按3的時候自動觸發第4個";     
        self.siblings().not('.selected').click();
      }
      setT32Data(self.attr('data-group'),self);      
    }else{
      removeT32Num(self,self.attr('data-num'));
    }
  }
}).hover(function(){
  var group = $(this).parent().attr('data-group').toLowerCase();
  var groupNum = ($(this).parent().attr('data-num')/1)+1;
  if(groupNum<3){
    if($(this).attr('data-num')!=='1'){
      $(".block16").find('.'+group+groupNum+'').addClass('hover');
    }
  }
},function(){
  var group = $(this).parent().attr('data-group').toLowerCase();
  var groupNum = ($(this).parent().attr('data-num')/1)+1;
  if(groupNum<3){
    $(".block16").find('.'+group+groupNum+'').removeClass('hover');
  }
});


$(".block16 .pt-group >div").off('click').on('click',function(){
  var self = $(this);
  if($(this).hasClass('set')){
    var keys = Object.keys(fcstData.team32);
    var g32 = 0;    
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team32[keys[i]].length; j++){
        g32++;
      }
    }
    if(g32==32){
    // 暫時關閉檢查
      if(self.parent().find('.setCountry').length>1){
        self.siblings().find('.setCountry').removeClass('active');
        self.find('.setCountry').toggleClass('active');
      }
      if(self.find('.competition').length>0 ){
        self.find('.competition li').off('click').on('click',function(){
          fcstStatus.t32 = false;
          var liEl = $(this);
          var name = self.parent().attr('data-group');
          var num = self.parent().attr('data-item');

          if(self.attr('data-result')!= liEl.attr('data-result')){
            if(liEl.attr('data-result')=="1"){
              self.attr('data-result',liEl.attr('data-result')).find('.setCountry').attr('data-after',liEl.text()).addClass('win');
              self.siblings().attr('data-result',0).find('.setCountry').attr('data-after','負').removeClass('win');
      
            }else{
              self.attr('data-result',liEl.attr('data-result')).find('.setCountry').attr('data-after',liEl.text()).removeClass('win');
              self.siblings().attr('data-result',1).find('.setCountry').attr('data-after','勝').addClass('win');            
  
            }
            var item8 = $(".block8").find('.'+name+num+'');
            var disX = self.offset().left - item8.offset().left;
            var disY = self.offset().top - item8.offset().top;            
            var dom = '<div class="setCountry set" data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'
                    + disX +'px; top:'+ disY +'px;" data-after="-">'
                    +'<span class="name">'+ self.parent().find('.win').find('.name').text() +'</span>'
                    +'<ul class="competition"><li data-result="1">勝</li><li data-result="0">負</li></ul>'
                    +'</div>'

            if(item8.find('.setCountry').length>0){
              item8.append(dom).find('.setCountry').stop().animate({top:0,left:0},350,function(){
                // fcstStatus.t32 = true;
              }); 
              var first = item8.find('.setCountry').first();
              first.stop().animate({
                top: first.attr("data-Y")+'px',
                left: first.attr("data-X")+'px'
              },350,function(){
                var timer = setTimeout(function(){
                  first.remove();
                  // fcstStatus.t32 = true;
                },200);
              });
            }else{
              item8.append(dom).find('.setCountry').stop().animate({top:0,left:0},350,function(){
                // fcstStatus.t32 = true;
              }); 
            }            
          }







        });
      }

    // 暫時關閉檢查
    }else{
      $(".block32").each(function(){
        if($(this).attr('data-num')!='4'){
          $(this).addClass('nonefinish');
        }else{
          $(this).removeClass('nonefinish');
        }
      });
    }   
  }
});