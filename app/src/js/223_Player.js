




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
gd.Player = function(sprite){
  this.sprite = 'images/char-boy.png';
  this.returnToStart(); // defines 
};
gd.Player.prototype.constructor = gd.Player;

gd.Player.prototype.update = function(dt){
  
};
gd.Player.prototype.speed = 1;
gd.Player.prototype.cannotDoIt = function(){
  
};

gd.Player.prototype.returnToStart = function(){
  this.x = gd.cellWidth*2;
  this.y = gd.numRows*gd.cellHeight - gd.cellHeight*1.75;
};

gd.Player.prototype.dying = function(){
  // $(this).css('visibility','none');
  this.returnToStart();
};
 
gd.Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y,gd.spriteWidth,gd.spriteHeight);
};



gd.Player.prototype.moveLeft = function(){
  var obstacleAtLeft = false;
  obstacleAtLeft = !(gd.checkCollisions(gd.landscape.objects,this).search('atright')== -1);
  if((this.x > 0)&&(!obstacleAtLeft)){
      this.x = this.x-gd.cellWidth*gd.movementFrozen;
  }
  else {this.cannotDoIt();};

};

gd.Player.prototype.moveRight = function(){
  var obstacleAtRight = false;
  obstacleAtRight = !(gd.checkCollisions(gd.landscape.objects,this).search('atleft') == -1);
  var notBeyondRightBorder = false;
  notBeyondRightBorder = (this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth));
  if(!obstacleAtRight && notBeyondRightBorder){
    this.x = this.x + gd.cellWidth*gd.movementFrozen;
  } else{
    this.cannotDoIt();
  };
};

gd.Player.prototype.moveUp = function(){
  var obstacleAtop = false;
  obstacleAtop = !(gd.checkCollisions(gd.landscape.objects,this).search('below') == -1);
  if((this.y>0)&&(!obstacleAtop)){
    this.y = this.y - gd.cellHeight*gd.movementFrozen;
  } else {
    this.cannotDoIt();
  };
};

gd.Player.prototype.moveDown = function(){
  var notBeyondBottomBorder = false;
  notBeyondBottomBorder = (this.y < (document.getElementsByTagName("CANVAS")[0].height - gd.cellHeight*2.5));
  var obstacleBelow = false;
  obstacleBelow = !(gd.checkCollisions(gd.landscape.objects,this).search('atop') == -1);
  if(notBeyondBottomBorder&&!obstacleBelow){
    this.y = this.y + gd.cellHeight*gd.movementFrozen;
  }else{
    this.cannotDoIt();
  };
};
// <pattern id="p" patternUnits="userSpaceOnUse" x="-22.8" y="-21.6" width="56.3" height="73">

gd.Player.prototype.handleInput = function(key){
  
  //if((this.x<0) || (this.y<0) || (this.x > (document.body.canvas.width-this.width)));
  
    if(key == 'left') this.moveLeft();
    if(key == 'up') this.moveUp();
    if(key == 'right') this.moveRight();
    if(key == 'down') this.moveDown();
    
};
