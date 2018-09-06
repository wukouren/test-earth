window.Alert = function(options){
  let self = this;
  $('.custom-alert').remove();
  $('body').css({
    overflow:'hidden'
  })
  var clientH = document.documentElement.clientHeight || document.body.clientHeight;
  this.changeTop = function(){
    setTimeout(function(){
      // console.log(container.height(),clientH,btn.height());
      if(self.container.height() > clientH - self.btn.height()){
        self.container.find('.custom-alert-c').css({maxHeight:clientH-30-30+'px',overflowY:'auto'})
        self.container.css({top:0,bottom:0}).removeClass('visiHide');
      }else{
        self.container.removeClass('visiHide')
        let top = '-'+(self.container.height()/2);
        self.container.css({marginTop:top+'px'})  
        // self.container.css({marginTop:top-clientH+'px'}).removeClass('visiHide');
        // setTimeout(function(){
          self.container.addClass('animated bounceIn');
        // })
      }
    },0)
  }
  this.changeContent = function(options){
    if(!self.el){
      self.el = $('<div class="custom-alert '+(options["buttons"].length>1?'custom-confirm':'')+'">\
          <div class="custom-alert-bg"></div>\
          <div class="custom-alert-w visiHide">\
          </div>\
        </div>');
      self.container = self.el.find('.custom-alert-w');
      self.btn = self.el.find('.custom-alert-btn');
    }
    self.container.html((options["hasClose"]?'<div class="custom-alert-close">\
                <i class="custom-alert-close-i"></i>\
              </div>':'')+'\
              <div class="custom-alert-c">\
                '+options["content"]+'\
              </div>\
              <div class="custom-alert-btn alert-btns-has-'+options["buttons"].length+'">\
                '+(_.map(options["buttons"],function(item){
                    return '<button type="button" '+(item['attr']?item['attr']:'')+'class="btn btn1 '+item["cssClass"]+'">'+item["label"]+'</button>'
                  }).join('<div class="custom-alert-btn-sep"></div>'))+'\
              </div>');
    self.el.delegate('.custom-alert-close','click',function(){
      self.remove()
    })
    _.each(options["buttons"],function(i){
      self.el.delegate('.'+i["cssClass"],'click',function(){
        if(i['action']){
          i['action']();
        }
      })
    })
    if(options['delay']){
      setTimeout(function(){
        self.remove();
      },options['delay'])
    }
    // let top = '-'+(container.height()/2)
    // container.css({marginTop:top+'px'})
  }
  this.remove = function(){
    self.container.addClass('bounceOut');
    setTimeout(function(){
      self.el.remove();  
      $('body').css({overflow:'inherit'})
    },800)
  }
  this.changeContent(options);
  $('body').append(self.el);
  self.changeTop()
}