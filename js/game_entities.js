
// TO DO 
// sprite, x, y, fo future - health, alo - 'empty';

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
gd.pause = function(main){
if (gd.paused == true)
  {
    gd.paused = false;
    gd.gamePaused = 1;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is running.";
    //window.requestAnimationFrame(main);
  }
else
  {
    gd.paused = true;
    gd.gamePaused = 0;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is paused.";
  };
};

gd.landscape = {}; // object describing not-interactive, static
// and etc. objects like stones, sands, walls, barriers, fences. etc.

gd.landscape.objects = [];// an array of unique stones, walls, barriers, sands, etc.
gd.landscape.stones = {}; // properties and settings for stones
gd.landscape.stones.numStones = 0;
gd.landscape.stones.Enabled = true;

gd.landscape.stones.calcNumStones = function(){
  var stoneZoneArea = 4;//build 0 to 2 stones max per each 8 
  var numStoneZones = (gd.numCols*gd.numRows -
   (gd.numRows*gd.numCols % stoneZoneArea)) / stoneZoneArea;
  var numStones = 0;
  var rand = 0;
  var j = 0;
  for(var i = 0;i<numStoneZones;i++){
    rand = gd.getRandomInt(0,9);
    j = 0;
    if(rand<3){j = 1;}
    else if(rand<1){j = 2;}
    else {j = 0;};
    numStones = numStones + j;
  }  
  return numStones;
};


gd.checkCollisions = function(obj1,obj2){
  // return array of descriptive words about
  // how obj2 relates to obj1;
  // OBJ1 OBJ2 - AT RIGHT
  
  // OBJ2 OBJ1 - AT LEFT
  
  // OBJ1
  // OBJ2 - BELOW
  
  // OBJ2
  // OBJ1 - ATOP
  
  var result = '';
  if((obj1 == undefined)||(obj2==undefined)){return result};
  
  var dtX =  0;
  var dtY = 0;
  var dtXabs = 0;
  var dtYabs = 0;
  var xRelation = 0;
  var yRelation = 0;
  var xCloseBy = gd.cellWidth*1.2;
  var yCloseBy = gd.cellHeight*1.5;
  var xNeighbour = false;
  var yNeighbour = false;
  var xCollided = gd.cellWidth*0.5;
  var yCollided = gd.cellHeight*0.5;
  var i = 0; // var for for statements iterations
  var j = 0; // var for for statements iterations
  // if obj1 and obj2 are simple objects  
  if((obj1 instanceof Object)&&(obj2 instanceof Object)&&(!(obj1 instanceof Array))&&(!(obj2 instanceof Array))){
    // collision / atleft / atright / atop / below 

    if((obj1 == undefined)||(obj2==undefined)){
      return result;
    } else {
      dtX = obj1.x - obj2.x;
      dtY = obj1.y - obj2.y;
      dtXabs = (Math.abs(obj1.x - obj2.x));
      dtYabs = (Math.abs(obj1.y - obj2.y));
      if((dtX < 0)&&(dtXabs < xCloseBy)&&(dtYabs < yCollided)){
        result = result + ' atright';
        // console.log('atright');
      };
      if((dtX > 0)&&(dtXabs < xCloseBy)&&(dtYabs < yCollided)){
        result = result + ' atleft';
        // console.log('atleft');
      };
      if((dtY < 0)&&(dtYabs < yCloseBy)&&(dtXabs < xCollided)){
        result = result + ' below';
       // console.log('atop');
      };
      if((dtY > 0)&&(dtYabs < yCloseBy)&&(dtXabs < xCollided)){
        result = result + ' atop';
        // console.log('below');
      };
      
      if((dtXabs < xCollided)&&(dtYabs < yCollided)){
        result = result+'collision';
        console.log('collision');
      };
      // console.log('result ',result,', ',dtXabs,', ',dtYabs,' ,',dtX,', ',dtY);
      return result;
    };
  };
 
  // if obj1 is an array, and obj2 is an object
  if((obj1 instanceof Array)&&(obj2 instanceof Object)&&(!(obj2 instanceof Array))){
  //  console.log('arr and obj');
    for(i=0;i<obj1.length;i++){
      result = result + gd.checkCollisions(obj1[i],obj2);
    };
    return result;
  };
  // if obj2 is an object and obj2 is an array
  if((obj1 instanceof Object)&&(!(obj1 instanceof Array))&&(obj2 instanceof Array)){
//    console.log('obj and arr');
    for(i=0;i<obj2.length;i++){
      result = result + gd.checkCollisions(obj1,obj2[i]);
    };
    return result;
  };
  
  // if obj1 is an array and obj2 is an array
  if((obj1 instanceof Array)&&(obj2 instanceof Array)){
  //  console.log('arr and arr');
    for(i=0;i<obj1.length;i++){
      result = result + gd.checkCollisions(obj1[i],obj2);
    };
    return result;
  };
  return result;
  
};

// landscape Object superClass constructor
gd.landscape.LandscapeObject = function(sprite, type, ID){
  this.sprite = sprite;
  this.type = type;
  this.ID = ID;
  var obj1 = {};
  obj1.x = gd.cellWidth * gd.getRandomInt(0,gd.numCols);
  obj1.y = 0;
  function checkY(obj){
    obj.y = gd.cellHeight * gd.getRandomInt(0,gd.numRows);
    if((obj.y>(gd.numRows-3)*gd.cellHeight)||(obj1.y < gd.cellHeight)){
      obj = checkY(obj);
      return obj;
    } else{
      return obj;
    };
  };
  obj1 = checkY(obj1);
  function checkCollision(obj){
    var collisionCheck = '';
    collisionCheck = gd.checkCollisions(gd.landscape.objects,obj);
    collisionCheck = collisionCheck.search('collision');
    if(collisionCheck == -1){
      return obj;
    } else {
      obj.x = gd.cellWidth * gd.getRandomInt(0,gd.numCols);
      obj = checkY(obj);
      obj = checkCollision(obj);
      return obj;
    };    
  };
  obj1 = checkCollision(obj1);
  
  // find x, check for collisions, do not put on 
  // water and to not put on grass
  this.y = obj1.y;
  this.x = obj1.x;
};
gd.landscape.LandscapeObject.prototype.constructor = gd.landscape.LandscapeObject;

gd.landscape.LandscapeObject.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,gd.spriteWidth,gd.spriteHeight);

};

gd.landscape.build = function(sprite){
  gd.landscape.stones.numStones = gd.landscape.stones.calcNumStones();
  for(var i = 0;i<gd.landscape.stones.numStones;i++){
    gd.landscape.objects[i] = new gd.landscape.LandscapeObject('images/Rock.png','stone',i);
  };
};


gd.landscape.renderAll = function(){
  for(var i = 0;i < gd.landscape.objects.length;i++){
    gd.landscape.objects[i].render();
  };
};















/*
*
*
* CANVAS BUILDING FUNCTIONS
*
*
*/

gd.cellWidth = 50;
gd.cellHeight = 40;
gd.spriteWidth = 50;
gd.spriteHeight = 80;
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

  var maxCanvasWidth = 0; //
  if (gd.windowVertical)
    {maxCanvasWidth = window.innerWidth * 1;}
  else
    {maxCanvasWidth = window.innerWidth * 0.75;}; // in horizontal canvas takes only 9/12 of the grid;
  var maxCanvasWidth = maxCanvasWidth -60; // -30 for Bootstrap grid padding L+R
  gd.numCols = (maxCanvasWidth - maxCanvasWidth % gd.cellWidth) / gd.cellWidth - 2;
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
    this.speed = gd.getRandomInt(40,200);
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,gd.spriteWidth,gd.spriteHeight);

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
      this.x = this.x-gd.cellWidth*gd.gamePaused}
  else {this.cannotDoIt();};

};

gd.Player.prototype.moveRight = function(){
  var obstacleAtRight = false;
  obstacleAtRight = !(gd.checkCollisions(gd.landscape.objects,this).search('atleft') == -1);
  var notBeyondRightBorder = false;
  notBeyondRightBorder = (this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth));
  if(!obstacleAtRight && notBeyondRightBorder){
    this.x = this.x + gd.cellWidth*gd.gamePaused;
  } else{
    this.cannotDoIt();
  };
};

gd.Player.prototype.moveUp = function(){
  var obstacleAtop = false;
  obstacleAtop = !(gd.checkCollisions(gd.landscape.objects,this).search('below') == -1);
  if((this.y>0)&&(!obstacleAtop)){
    this.y = this.y - gd.cellHeight*gd.gamePaused;
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
    this.y = this.y + gd.cellHeight*gd.gamePaused;
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










