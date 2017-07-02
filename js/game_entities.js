/*
*
*
* SYSTEM-LEVEL VARIABLES AND FUNCTIONS
*
*
*
*/

gd.paused = false;
gd.gamePaused = 1;
gd.pause = function(){
if (gd.paused == true)
  {
    gd.paused = false;
    gd.gamePaused = 1;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is running.";
  }
else
  {
    gd.paused = true;
    gd.gamePaused = 0;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is paused.";
  };
};














/*
*
*
* CANVAS BUILDING FUNCTIONS
*
*
*/

gd.cellWidth = 101;
gd.cellHeight = 83;
gd.numRows = 5;
gd.numCols = 6;
gd.windowVertical = false;
gd.windowHorizontal = false;

gd.setupGrid = function(){
  // find if window is vertical or horizontal
  if(window.innerWidth < window.innerHeight){
    gd.windowVertical = true;
    gd.windowHorizontal = false;
  }
  else if(window.innerWidth > window.innerHeight){
    gd.windowVertical = false;
    gd.windowHorizontal = true;    
  };
  // canvas is bound to a div whose width changes from 100% @media 
  // 992 to 9/12. Calculate canvas's div col width ratio:
  var canvasCols = 1;
  if (gd.windowVertical)
    {canvasCols = 1;}
  else{canvasCols = .75;};
  var maxCanvasWidth = window.innerWidth * canvasCols -30; // -100 for Bootstrap grid padding L+R
  gd.numCols = (maxCanvasWidth - maxCanvasWidth % gd.cellWidth) / gd.cellWidth - 1;
  if(gd.windowVertical){
    gd.numRows = (window.innerHeight*0.5 - (window.innerHeight*0.5) % gd.cellHeight)/ gd.cellHeight;
  }
  else if(gd.windowHorizontal){
    gd.numRows = (window.innerHeight - (window.innerHeight) % gd.cellHeight)/ gd.cellHeight - 1;
  };
  

  /* Change layout depending on position of user agent
   * Use bootstrap standard classes.
   *
   *
   *
  */
  if(gd.windowVertical){
    // main layout
    document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvasDiv')[0].classList.remove('col-xs-8', 'col-sm-8', 'col-md-8', 'col-lg-8');
    document.getElementsByClassName('canvasDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-6', 'col-xs-offset-0')
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-offset-4', 'col-xs-4');
    document.getElementsByClassName('btnSpacer')[0].classList.remove('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-4');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-4');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-6');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-4');
  }
  else if(gd.windowHorizontal){
    // main layout
    document.getElementsByClassName('gameMenuDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('gameMenuDiv')[0].classList.add('col-xs-1', 'col-sm-1', 'col-md-1', 'col-lg-1');
    document.getElementsByClassName('canvasDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('canvasDiv')[0].classList.add('col-xs-8', 'col-sm-8', 'col-md-8', 'col-lg-8');
    document.getElementsByClassName('controlsDiv')[0].classList.remove('col-xs-12', 'col-sm-12', 'col-md-12', 'col-lg-12');
    document.getElementsByClassName('controlsDiv')[0].classList.add('col-xs-3', 'col-sm-3', 'col-md-3', 'col-lg-3');
    // buttons
    document.getElementsByClassName('btnUp')[0].classList.remove('col-xs-offset-4', 'col-xs-4');
    document.getElementsByClassName('btnUp')[0].classList.add('col-xs-6', 'col-xs-offset-0')
    document.getElementsByClassName('btnSpacer')[0].classList.add('hidden-xs', 'hidden-sm', 'hidden-md', 'hidden-lg');
    //document.getElementsByClassName('btnSpacer')[0].classList.add('col-xs-offset-4' 'col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnLeft')[0].classList.add('col-xs-6');
    document.getElementsByClassName('btnDn')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnDn')[0].classList.add('col-xs-6');
    document.getElementsByClassName('btnRight')[0].classList.remove('col-xs-4');
    document.getElementsByClassName('btnRight')[0].classList.add('col-xs-6');
        
    
  
  };
  
    
    
}



















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
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
gd.allEnemies = [];
for (var i = 0;i<100;i++){
  gd.allEnemies[i] = 'free';
};
// Enemies our player must avoid
gd.Enemy = function(x,y,sprite,nestAddress) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = 0 - gd.getRandomInt(1,5)*gd.cellWidth;
    this.speed = gd.getRandomInt(40,500);
    this.y = y;
    this.nestAddress = nestAddress; // address in gd.allEnemies array to referr to
};
gd.Enemy.prototype.constructor = gd.Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
gd.Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*this.speed;
    if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - gd.cellWidth)) {
      // this.x = 0 - gd.getRandomInt(1,5)*gd.cellWidth;
      // this.speed = gd.getRandomInt(40,500);
    gd.allEnemies[this.nestAddress] = 'free';
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
gd.EnemySoldier = function(x,y,sprite,nestAddress){
  gd.Enemy.call(this,x,y,sprite,nestAddress);
}
gd.EnemySoldier.prototype = Object.create(gd.Enemy.prototype);
gd.EnemySoldier.prototype.constructor = gd.EnemySoldier;


/*
*
*
* ENEMY ADDITIONAL FUNCTIONS
*
*
*/

gd.swarmEnemies = function(){
  for(var i = 0;i<(gd.numRows-2)*2;i++){
    var j = i;
    if(j>(gd.numRows-3)) j = 0;
    if(gd.allEnemies[i] == 'free'){  
      gd.allEnemies[i] = new gd.EnemySoldier(i,((j+1)*gd.cellHeight-gd.cellHeight*0.75),'images/enemy-bug.png',i);
    }
  };
};


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
  this.x = gd.cellWidth*2;
  this.y = gd.numRows*gd.cellHeight - gd.cellHeight*1.75;
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
  
    if(key == 'left') this.moveLeft();
    if(key == 'up') this.moveUp();
    if(key == 'right') this.moveRight();
    if(key == 'down') this.moveDown();
    
};

gd.Player.prototype.moveLeft = function(){
  if(this.x>0){this.x = this.x-gd.cellWidth*gd.gamePaused};
};

gd.Player.prototype.moveRight = function(){
  if(this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth)){
    this.x = this.x + gd.cellWidth*gd.gamePaused;
  };
};

gd.Player.prototype.moveUp = function(){
  if(this.y>0){
    this.y = this.y - gd.cellHeight*gd.gamePaused;
  };
};

gd.Player.prototype.moveDown = function(){
  if(this.y < (document.getElementsByTagName("CANVAS")[0].height - gd.cellHeight*2.5)){
    this.y = this.y + gd.cellHeight*gd.gamePaused;
  };
};
// <pattern id="p" patternUnits="userSpaceOnUse" x="-22.8" y="-21.6" width="56.3" height="73">












