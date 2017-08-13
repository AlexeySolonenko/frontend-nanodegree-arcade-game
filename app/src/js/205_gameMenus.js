


/*
*
*
* GAME MENU
* 
*
*
*/

gd.gameMenuPrev = [];

gd.gameMenuSetPrev = function(dontSetPrev) {
  if(!dontSetPrev){
    var el = document.getElementsByClassName('game-menu-modal-body')[0];
    var classList = [];
    for(var i=0;i<el.childNodes.length;i++){
      if(el.childNodes[i].style.display != 'none') {
        classList = el.childNodes[i].classList;
      };
    };
    
    for(var i=0; i<classList.length; i++){
      if(classList[i].search('game-menu')!=-1) {
        gd.gameMenuPrev.push('.'+classList[i]);
      };
    };
  };
  
};


gd.gameMenuErase = function(dontSetPrev) {
  gd.gameMenuSetPrev(dontSetPrev);
  $('.game-menu-modal-body > div').hide(250);
};



gd.gameMenuSelectActiveSprite = function(){
  gd.playerActiveSprite = $('.game-menu-player-sprite .carousel-inner .active img').attr('src');
};

gd.gameMenuButtonHTML = '<div class="col-xs-%%"><button class="btn btn-block btn-default %class% "><h3>%data%</h3></button></div>';
gd.gameMenuContent = [];
gd.gameMenuContent[0] = {name:'CONTINUE',itemClass:'game-menu-btn-continue',type:'button',cols:6};
gd.gameMenuContent[1] = {name:'RULES',itemClass:'game-menu-btn-rules',type:'button',cols:6};
gd.gameMenuContent[2] = {name:'OPTIONS',itemClass:'game-menu-btn-options',type:'button',cols:6};
gd.gameMenuContent[3] = {name:'START OVER',itemClass:'game-menu-btn-restart',type:'button',cols:6};

gd.gameMenuHome = function() {
  for(var i = 0, width=0;i<gd.gameMenuContent.length;i++){
    var formattedHTML = '';
    formattedHTML = gd.gameMenuButtonHTML.replace('%data%',gd.gameMenuContent[i].name);
    formattedHTML = formattedHTML.replace('%class%',gd.gameMenuContent[i].itemClass);
    formattedHTML = formattedHTML.replace('col-xs-%%','col-xs-'+gd.gameMenuContent[i].cols);
    $('.game-menu-home').append(formattedHTML);
    width = width + gd.gameMenuContent[i].cols;
    if(width > 11){//||((width + gd.gameMenuContent[i+1].cols)>11)){
      $('.game-menu-home').append('<div class="col-xs-12"></div>');
      width = 0;
    };
  }; 
};



//TO DO - TO MOVE TO INIT
gd.gameMenuHome();
gd.gameMenuErase();
gd.gameMenuPrev = [];

gd.gameMenuModal1 = '<div class="gameMenuModal1"></div>';
document.getElementsByClassName('btnMenu')[0].onclick = function(){
        if(!gd.paused) { gd.pause();
        } else {  
        };
        gd.gameMenuErase();
        $('.game-menu-home').show(500);
        gd.gameMenuPrev.push('game-menu-home');
        $('.gameMenuModal1').modal('show');
};

gd.health = 50;

window.showGameMenuOptions = function(){
  $('.game-menu-options').show(1500);
};

$('.game-menu-btn-options').click(function(){
  gd.gameMenuErase();
  // (function(){$('.game-menu-options').show(1500);})();
  window.showGameMenuOptions();
});

$('.game-menu-btn-player-sprite').click(function(){
  gd.gameMenuErase();
  $('.game-menu-player-sprite').show(500);
});

$('.game-menu-btn-prev').click(function(){
  if(gd.gameMenuPrev.length>1){
    gd.gameMenuErase(true);
    $(gd.gameMenuPrev[gd.gameMenuPrev.length-1]).show(500);
    gd.gameMenuPrev.pop();
  };
});


$('.carousel-player-sprite-btn-ctrl').click(function(){
  gd.gameMenuSelectActiveSprite();
});

window.pauseDelayed = function(){
  setTimeout(function(){
    gd.pause();
  }, 1500);
};



$('.game-menu-btn-continue').click(function(){
  $('.gameMenuModal1').modal('hide');
  // (function(){setTimeout(gd.pause, 5000);
  //})();
  
});

$('.gameMenuModal1').on('hidden.bs.modal', function(){
  window.pauseDelayed();
});

/*
document.getElementsByClassName('btnPlayerSprite')[0].onclick = function(){
   $('.user-modal-player-sprite').modal('show');
};
*/


