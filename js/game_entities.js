
/*
*
*
* ENEMY CLASSES AND PROTOTYPE FUNCTIONS
*
*
*
*/


/*
*
*
* ENEMY SUPER CLASS
*
*
*/

// Enemies our player must avoid
gd.Enemy = function(x,y,sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = 0 - userF.getRandomInt(1,5)*userVars.xCell;
    this.speed = userF.getRandomInt(40,500);
    this.y = y;
};
gd.Enemy.prototype.constructor = gd.Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
gd.Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speed;
    if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - 110)) {
      this.x = 0 - userF.getRandomInt(1,5)*userVars.xCell;
      this.speed = userF.getRandomInt(40,500);
    };
    
};
// Draw the enemy on the screen, required method for game
gd.Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


/*
*
*
* ENEMY-SOLDIER SUBCLASS CLASS
*
*
*/
gd.EnemySoldier = function(x,y,dt){
  gd.Enemy.call(this,x,y,dt);
}
gd.EnemySoldier.prototype = Object.create(gd.Enemy.prototype);
gd.EnemySoldier.prototype.constructor = gd.EnemySoldier;



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
  this.returnToStart();
};
gd.Player.prototype.constructor = gd.Player;

gd.Player.prototype.update = function(dt){
  
};
gd.Player.prototype.speed = 1;

gd.Player.prototype.returnToStart = function(){
  this.x = userVars.xCell*2;
  this.y = userVars.yCell*userVars.yCells-userVars.yCell*1.5;
}

gd.Player.prototype.dying = function(){
  // $(this).css('visibility','none');
  this.returnToStart();
}
 
gd.Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

gd.Player.prototype.handleInput = function(key){
  
  //if((this.x<0) || (this.y<0) || (this.x > (document.body.canvas.width-this.width)));
  
    if((key == 'left')&&(this.x>0)) this.x = this.x-userVars.xCell*this.speed;
    if((key == 'up')&&(this.y>0)) this.y = this.y-userVars.yCell*this.speed;
    if((key == 'right')&&(this.x < ((document.getElementsByTagName("CANVAS")[0].width) - 110))) 
      this.x = this.x+this.speed*userVars.xCell;
    if((key == 'down')&& (this.y < ((document.getElementsByTagName("CANVAS")[0].width) - userVars.xCell*1.5-5))) {this.y = this.y+this.speed*userVars.yCell;}
    
};

// <pattern id="p" patternUnits="userSpaceOnUse" x="-22.8" y="-21.6" width="56.3" height="73">

/*
*
*
* CANVAS BUILDING FUNCTIONS
*
*
*/


gd.Playbutton = function(top, left, width, height, lWidth, fillColor, lineColor) {
    ctx.beginPath();
    ctx.rect(250, 350, 200, 100); 
    ctx.fillStyle = '#000000'; 
    ctx.fillStyle = 'rgba(225,225,225,0.5)';
    ctx.fillRect(25,72,32,32);
    ctx.fill(); 
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff'; 
    ctx.stroke();
    ctx.closePath();
    ctx.font = '40pt Kremlin Pro Web';
    ctx.fillStyle = '#000000';
    ctx.fillText('Start', 345, 415);
  }


gd.buildMock = function(){
  
}










