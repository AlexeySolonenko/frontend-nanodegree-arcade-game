

/*
*
*
* PLAYER AUX FUNCTIONS AND VARS
*
*
*/

gd.playerActiveSprite = '';
gd.playerAllSprites = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png'
];

gd.playerActiveSprite = gd.playerAllSprites[1];

/*
*
*
* PLAYER SUPER-CLASS 
*
*
*/



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
gd.Player = function(sprite,ID){
  this.sprite = gd.playerActiveSprite;
  this.returnToStart(); // defines 
  this.name = 'Player Prototype';
  this.namePosition = {};
  this.health = 20;
  this.leftNeighbour = 'free'; // can be   bro || blocked ||  free
  this.rightNeighbour = 'free';
  this.topNeighbour = 'free';
  this.belowNeighbour = 'free';
  this.type = 'player';
  this.outOfBorders = false;
  this.message = '';
  this.beingCongratulated = false;
  gd.MovingObject.call(this,-100,-100,sprite,ID,0,'stay','player');
};
gd.Player.prototype = Object.create(gd.MovingObject.prototype);
gd.Player.prototype.constructor = gd.Player;


gd.Player.prototype.update = function(dt){
  
};

  
gd.Player.prototype.speed = 1;
gd.Player.prototype.cannotDoIt = function(){
  
};

gd.Player.prototype.returnToStart = function(){
  this.beingCongratulated = false;
  this.x = gd.cellWidth*2;
  this.y = gd.numRows*gd.cellHeight - gd.cellHeight*1.75;
  this.health = 20;
};

gd.Player.prototype.dying = function(){
  // $(this).css('visibility','none');
  this.returnToStart();
};
 
 
gd.Player.prototype.render = function(){
  gd.allGameObjects[0].sprite=gd.playerActiveSprite;
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y,gd.spriteWidth,gd.spriteHeight);
};



gd.Player.prototype.moveLeft = function(){
  var noObstacleAtLeft = false;
  noObstacleAtLeft = gd.notBlockedNoEnemy1(this.leftNeighbourArr);;
  if( ((this.x - 0.9*gd.cellWidth)>0)&&noObstacleAtLeft){
      this.x = this.x-gd.cellWidth*gd.movementFrozen;
  }
  else {this.cannotDoIt();};
};

gd.Player.prototype.moveRight = function(){
  var noObstacleAtRight = false;
  noObstacleAtRight = gd.notBlockedNoEnemy1(this.rightNeighbourArr);
  var notBeyondRightBorder = false;
  notBeyondRightBorder = (this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth));
  if(noObstacleAtRight&&notBeyondRightBorder){
    this.x = this.x + gd.cellWidth*gd.movementFrozen;
  } else{
    this.cannotDoIt();
  };
};

gd.Player.prototype.moveUp = function() {
  var noObstacleAtop = false;
  noObstacleAtop = gd.notBlockedNoEnemy1(this.topNeighbourArr);
  if(gd.debugKey1){console.log(this.topNeighbourArr);};
  if(((this.y-0.1*gd.cellHeight)>0)&&noObstacleAtop) {
    this.y = this.y - gd.cellHeight*gd.movementFrozen;
  } else {
    this.cannotDoIt();
  };
};


gd.Player.prototype.moveDown = function() {
  var notBeyondBottomBorder = false;
  notBeyondBottomBorder = (this.y < (document.getElementsByTagName("CANVAS")[0].height - gd.cellHeight*2.5));
  var noObstacleBelow = false;
  noObstacleBelow = gd.notBlockedNoEnemy1(this.belowNeighbourArr);
  if(notBeyondBottomBorder&&noObstacleBelow) {
    this.y = this.y + gd.cellHeight*gd.movementFrozen;
  }else{
    this.cannotDoIt();
  };
};
// <pattern id="p" patternUnits="userSpaceOnUse" x="-22.8" y="-21.6" width="56.3" height="73">



gd.Player.prototype.handleInput = function(key) {
  
  //if((this.x<0) || (this.y<0) || (this.x > (document.body.canvas.width-this.width)));
  
    if(key == 'left') this.moveLeft();
    if(key == 'up') this.moveUp();
    if(key == 'right') this.moveRight();
    if(key == 'down') this.moveDown();
    if((key == 'q')||(key == 'Q')) gd.debugKey1Flip();
    
};


window.hidePlayer0Message = function() {
  setTimeout(function() {
    $('.player-html').tooltip("hide");
    $('.player-html')[0].setAttribute('title','');  
  }, 5000);
  
};


gd.Player.prototype.tell = function(msg) {
   
  var oneToolTipAlreadyActive = false;
  if($('.player-html + .tooltip').css('visibility') == 'visible') {
    oneToolTipAlreadyActive = true;
  };
    
  var newMsg = '';
  
  if(oneToolTipAlreadyActive) {
    newMsg = $('.player-html + .tooltip .tooltip-inner').html() + "<br /br>" + msg;
  } else {
    newMsg = msg;
  };
  
  //$('.player-html')[0].setAttribute('title',newMsg);

  if(!oneToolTipAlreadyActive) {
    $('.player-html').tooltip("show");
    window.hidePlayer0Message();
  };
  
  if(newMsg.length>20) {
    newMsg = newMsg + "<br /br>" + 'Aaaaa!';
  };
  
  $('.player-html + .tooltip .tooltip-inner').html(newMsg);
 
    
};

gd.Player.prototype.getAttacked = function() {
  if(gd.hitsInThisCycle > 0){ this.tell('Ouch!');};
  this.health = this.health - gd.hitsInThisCycle;
  gd.hitsInThisCycle = 0;
  if(this.health < 1)this.dying();
  
};  // END OF getAttacked


gd.Player.prototype.checkForWinLevel1 = function() {
  var result;
  var playerAtWater = false;
  
  if(this.y < 0) { playerAtWater = true; 
  };
  
  return playerAtWater;
};


gd.Player.prototype.checkForWin = function() {
  var result = [];
  var winMsg = '';

// CHECK IF PLAYER WON DEPENDING ON CURRENT GAME LEVEL
  if(gd.currentLevel == 1) {
    result[0] = {level:1};
    result[1] = this.checkForWinLevel1();    
  };

  
// PREPARE WIN MESSAGE DEPENDING ON CURRENT LEVEL
  winMsg = 'Congratulations! You won level ' + result[0]['level'] +
    '. Get ready for next challenge! Good luck!';
  
  if(result[1] && (gd.framesCounter > 2) && (!this.beingCongratulated)) {
    if(gd.debugKey1){console.log('won');};
    $('.modal-congrats .modal-body > div').html('');
    $('.modal-congrats .modal-body > div').html(winMsg);
    $('.modal-congrats').modal('show');
    this.beingCongratulated = true;
    this.returnToStart();
  };
  // modal-congrats-btn-next
  // modal-congrats-btn-same
  return result;
};

