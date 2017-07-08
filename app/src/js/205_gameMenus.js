


/*
*
*
* GAME MENU
* 
*
*
*/

gd.gameMenuButtonHTML = '<div class="col-xs-%% btn btn-default %class% center-block"><h3>%data%</h3></div>';
gd.gameMenuContent = [];
gd.gameMenuContent[0] = {name:'START',itemClass:'gameMenuBtnStart',type:'button',cols:6};
gd.gameMenuContent[1] = {name:'BTN1',itemClass:'gameMenuBtnStart',type:'button',cols:6};
gd.gameMenuContent[2] = {name:'BTN2',itemClass:'gameMenuBtnStart',type:'button',cols:6};
gd.gameMenuContent[3] = {name:'BTN3',itemClass:'gameMenuBtnStart',type:'button',cols:6};

gd.gameMenuBuild = function(){
  for(var i = 0, width=0;i<gd.gameMenuContent.length;i++){
    var formattedHTML = '';
    formattedHTML = gd.gameMenuButtonHTML.replace('%data%',gd.gameMenuContent[i].name);
    formattedHTML = formattedHTML.replace('%class%',gd.gameMenuContent[i].itemClass);
    formattedHTML = formattedHTML.replace('col-xs-%%','col-xs-'+gd.gameMenuContent[i].cols);
    $('.gameMenuModal1 .modal-body').append(formattedHTML);
    width = width + gd.gameMenuContent[i].cols;
    if(width > 11){//||((width + gd.gameMenuContent[i+1].cols)>11)){
      $('.gameMenuModal1 .modal-body').append('<div class="col-xs-12"></div>');
      width = 0;
    };
  }; 
};
gd.gameMenuBuild();
gd.gameMenuModal1 = '<div class="gameMenuModal1"></div>';
document.getElementsByClassName('btnMenu')[0].onclick = function(){
        
        //document.getElementsByClassName('gameMenuModal1')[0].modal('show');
        if(!gd.paused){
          gd.pause();
        } else {
          
        };
        $('.gameMenuModal1').modal('show');
};

