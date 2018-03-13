var fcst = {
  status32:true,
  status16:true,
  team32:{
    A:[],
    B:[],
    C:[],
    D:[],
    E:[],
    F:[],
    G:[],
    H:[]    
  }
}

function setData(group,el){
  var index = fcst.team32[group].map(function(e){ return e.id;}).indexOf(el.attr('data-id'));
  if(index>=0){
    fcst.team32[group].splice(index,1);
  }else{
    fcst.team32[group].push({'id':el.attr('data-id'),'num':el.attr('data-num')}); 
  }
  // console.log(fcst.team32);
}

function removeNumDom(dom){
  fcst.status32 = false;
  $(".block16").find('.'+dom+'').find('.setCountry').stop().animate({
    top: $(".block16").find('.'+dom+'').find('.setCountry').attr("data-Y")+'px',
    left: $(".block16").find('.'+dom+'').find('.setCountry').attr("data-X")+'px'
  },350,function(){
    var timer = setTimeout(function(){
      $(".block16").find('.'+dom+'').find('.setCountry').remove();
      fcst.status32 = true;
    },200);
  });   
}

function removeNum(el,pNum){
  var num = pNum/1;
  var country = el.parent().find('.pt-country');
  var groupName = el.attr('data-group').toLowerCase();
  el.attr('data-num',0).find('.num').text(num);
  el.removeClass('selected').siblings().not('.selected').find('.num').text(num);
  el.parent().attr('data-num',num-1);
  if(num<3){
    removeNumDom((groupName+num)); 
    if(num==1){
      $(".block16 .pt-group >div").removeClass('hover');
      for(var i=0; i<(country.length); i++){  
        if(country.eq(i).attr('data-num')== 2){
          removeNumDom((groupName+(num+1)));         
        }
      }
    }
  }  
  setData(groupName.toUpperCase(),el);
  for(var i=0; i<(country.length); i++){    
    for(var j=1; j<=(country.length-num); j++){  
      if(country.eq(i).attr('data-num')== (num+j)){
        setData(country.eq(i).attr('data-group'),country.eq(i));
        country.eq(i).attr('data-num',0).find('.num').text(num);
        country.eq(i).removeClass('selected');
      }
    }
  }
}


$(".block32 .pt-country").off('click').on('click',function(){
  if(fcst.status32){
    var self = $(this);
    var groupName = self.attr('data-group').toLowerCase();
    var grouplength = self.parent().find('.pt-country').length;
    var nextNum = self.siblings('.selected').length+1;
     if(!self.hasClass('selected')){
      self.addClass('selected').attr('data-num', nextNum).find('.num').text(nextNum);  
      self.siblings().not('.selected').find('.num').text(nextNum+1);
      self.parent().attr('data-num',nextNum);
      if(nextNum<grouplength-1){
        fcst.status32 = false;
        // "1,2的animate動作";     
        var item16 = $(".block16").find('.'+groupName+nextNum+'');
        var disX = self.offset().left - item16.offset().left;
        var disY = self.offset().top - item16.offset().top;
        var dom = '<div class="setCountry" data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'
                  + disX +'px; top:'+ disY +'px;" data-after="-">'
                  +'<span class="name">'+ self.find('.name').text() +'</span>'
                  +'<ul class="competition"><li data-result="1">勝</li><li data-result="0">負</li></ul>'
                  +'</div>'
        item16.append(dom).find('.setCountry').stop().animate({top:0,left:0},350,function(){
          fcst.status32 = true;
        });     
      }
      if((grouplength-2) == self.siblings('.selected').length){
        // "按3的時候自動觸發第4個";     
        self.siblings().not('.selected').click();
      }
      setData(self.attr('data-group'),self);      
    }else{
      removeNum(self,self.attr('data-num'));
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
  var keys = Object.keys(fcst.team32);
  var g32 = 0;  
  for(var i=0; i<keys.length; i++){
    for(var j=0; j<fcst.team32[keys[i]].length; j++){
      g32++;
    }
  }
  if(g32==32){
    fcst.status32 = false;
    if(self.parent().find('.setCountry').length>1){
      self.siblings().find('.setCountry').removeClass('active');
      self.find('.setCountry').toggleClass('active');
    }
    if(self.find('.competition').length>0 ){
      self.find('.competition li').off('click').on('click',function(){
        if($(this).attr('data-result')=="1"){
          self.find('.setCountry').attr('data-after',$(this).text()).addClass('win');
          self.siblings().find('.setCountry').attr('data-after','負').removeClass('win');
        }else{
          self.find('.setCountry').attr('data-after',$(this).text()).removeClass('win');
          self.siblings().find('.setCountry').attr('data-after','勝').addClass('win');
        }
      });
    }
  }
});