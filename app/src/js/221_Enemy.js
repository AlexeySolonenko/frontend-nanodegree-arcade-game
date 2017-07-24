



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

// Enemies our player must avoid
gd.Enemy = function(x,y,sprite,ID,direction,type) {
  this.sprite = sprite;
  this.x = 0 - gd.getRandomInt(1,5)*gd.cellWidth;  
  this.speed = gd.getRandomInt(40,200);
  this.y = y;
  this.ID = ID; // address in gd.allGameObjects array to referr to
  this.attacking = false;
  gd.MovingObject.call(this,x,y,sprite,ID,this.speed,direction,type);
};

gd.Enemy.prototype = Object.create(gd.MovingObject.prototype);
gd.Enemy.prototype.constructor = gd.Enemy;


gd.Enemy.prototype.dying = function(){
  gd.allGameObjects[this.ID] = 'free';
};

gd.Enemy.prototype.cannotDoIt = function(){
  
};
/*
gd.Enemy.prototype.moveLeft = function(){
var obstacleAtLeft = false;
obstacleAtLeft = !(gd.checkCollisions(gd.landscape.objects,this).search('atright')== -1);
if((this.x > 0)&&(!obstacleAtLeft)){
this.x = this.x-gd.cellWidth*gd.movementFrozen;
}
else {this.cannotDoIt();};

};

gd.Enemy.prototype.moveRight = function(){
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

gd.Enemy.prototype.moveUp = function(){
var obstacleAtop = false;
obstacleAtop = !(gd.checkCollisions(gd.landscape.objects,this).search('below') == -1);
if((this.y>0)&&(!obstacleAtop)){
this.y = this.y - gd.cellHeight*gd.movementFrozen;
} else {
this.cannotDoIt();
};
};

gd.Enemy.prototype.moveDown = function(){
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
*/
/*
*
*
* MOVE METHODE AND METHODE HELPERS
*
*
*
*/


gd.Enemy.prototype.eraser = function(){
  if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - gd.cellWidth)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.y > ((document.getElementsByTagName("CANVAS")[0].height) + gd.cellHeight)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.x < (0 - 6*gd.cellWidth)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.y < (-gd.cellHeight*0.5)) {
    gd.allGameObjects[this.ID] = 'free';
  };
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
gd.Enemy.prototype.update = function(dt){
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // this.moveEn(dt);
  
  /* 
  for(var i = 0;i<gd.allGameObjects.length;i++){
    if(gd.allGameObjects[i].type=='enemy'){
      gd.checkCollisions(gd.allGameObjects[i],gd.allGameObjects);
    };
   
  };
  */
  this.move(dt);
 
}; // function

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
gd.EnemySoldier = function(x,y,sprite,ID,direction,type){
  this.nativeRow = -100;
  this.dodgingY = 0;
  this.dodgingX = 0;
  gd.Enemy.call(this,x,y,sprite,ID,direction,type);
};
gd.EnemySoldier.prototype = Object.create(gd.Enemy.prototype);
gd.EnemySoldier.prototype.constructor = gd.EnemySoldier;

gd.EnemySoldier.prototype.defineDirection = function(){
  
  // if can go either up or down, then select at random
  // the below variable is just for random
  var tempRandom = gd.getRandomInt(0,9);
  var upOrDown = true;
  if(tempRandom < 5){
    upOrDown = true;
  } else if(tempRandom > 4){
    upOrDown = false;
  };
  
  
  var notBlockedNoEnemy1 = function(arr){
    var types = '';
    for(var i = 0;i<arr.length;i++){
      types += gd.allGameObjects[arr[i]].type;    
    };
    if((types.search('blocked')==-1)&&(types.search('enemy')==-1)){
      return true;
    } else return false;
  };
  
  var blockedOrEnemy1 = function(arr){
    var types = '';
    for(var i = 0;i<arr.length;i++){
      types += gd.allGameObjects[arr[i]].type;    
    };
    if((types.search('blocked')!=-1)||(types.search('enemy')!=-1)){
      return true;
    } else return false;
  };
  
  // if an EnemySoldier is moving up or right, and an opportunity appears
  // to turn left - then turn left
  if(((this.direction == 'up')||(this.direction == 'down'))&&(notBlockedNoEnemy1(this.rightNeighbourArr))){
    if(gd.debugKey1){console.log(this.rightNeighbourArr)};
    this.direction = 'right';
    if(this.dodgingY>0){this.dodgingX++;};
  // if right enemy is blocked, dodge further
  } else if((this.direction == 'up')&&(blockedOrEnemy1(this.topNeighbourArr))){
      this.dodgingX++;
      this.direction = 'left';
  }
    else if((this.direction == 'down')&&(blockedOrEnemy1(this.belowNeighbourArr))){
      this.dodgingX++;
      this.direction = 'left';      
  }
  // if an EnemySoldier was moving left, then, as soon as an opportunity appears
  // duck either up or down;
    else if((this.direction == 'left')&&(notBlockedNoEnemy1(this.topNeighbourArr))){
      this.direction = 'up';
      this.dodgingY++;
  } else if((this.direction == 'left')&&(notBlockedNoEnemy1(this.belowNeighbourArr))){
      this.direction = 'down';
      this.dodgingY++;
  } else if ((this.direction == 'left')&&(blockedOrEnemy1(this.leftNeighbourArr))){
  //else if((this.direction == 'left')&&((this.leftNeighbour.search('blocked')!=-1)||(this.leftNeighbour.search('enemy')!=-1))){
      this.direction = 'right';
//  } else if((this.direction == 'right')&&(blockedOrEnemy(this.rightNeighbour))){
  } else if((this.direction == 'right')&&(blockedOrEnemy1(this.rightNeighbourArr))){
    this.dodgingY++;
    //this.x-=4;
      if(notBlockedNoEnemy1(this.topNeighbourArr)&&notBlockedNoEnemy1(this.belowNeighbourArr)){
        if(upOrDown){this.direction = 'up';};
        if(!upOrDown){this.direction = 'down';};
    } else if(notBlockedNoEnemy1(this.topNeighbourArr)){
        this.direction = 'up';
    } else if(notBlockedNoEnemy1(this.belowNeighbourArr)){
        this.direction = 'down';
    } else if (blockedOrEnemy1(this.belowNeighbourArr)&&blockedOrEnemy1(this.topNeighbourArr)){
        this.direction = 'left';
    };
  } // else if
  // if there is another enemy or an obstacle ahead, try to change direction
  else if(((this.direction == 'right')||(this.direction == 'stay'))&&(notBlockedNoEnemy1(this.rightNeighbourArr))){
    this.direction = 'right'; // carry on, seek and attack
    if(this.dodgingX>1){this.dodgingX++;};
  }; 
   
  if(((this.direction == 'up')||(this.direction == 'down'))&&(this.dodgingY>0)){
    this.dodgingY++;
  };
  if((this.direction == 'right')&&(this.dodgingX>0)){
    this.dodgingX++;
  };
  if((this.direction =='right')&&(this.y > this.nativeRow)&&(notBlockedNoEnemy1(this.topNeighbourArr))&&(this.dodgingX>60)){
    this.direction = 'up';
  }else if ((this.direction == 'right')&&(this.y < this.nativeRow)&&(notBlockedNoEnemy1(this.belowNeighbourArr))&&(this.dodgingX>60)){
    this.direction = 'down';
  };
  if(((this.y < 1.1*this.nativeRow)&&(this.y > 0.9*this.nativeRow))&&(this.dodgingX > 50)){this.dodgingX=0;this.dodgingY=0;};
  
  if(gd.debugKey1){console.log();};
  if(gd.debugKey1){
    console.log(this.direction+' : ' + this.dodgingX,' ',this.dodgingY);
    console.log(this.topNeighbourArr);
    console.log(this.belowNeighbourArr);
    console.log(this.rightNeighbourArr);
  };
  this.leftNeighbour = 'free';
  this.rightNeighbour = 'free';
  this.topNeighbour = 'free';
  this.belowNeighbour = 'free';
  this.rightNeighbourArr = [];
  this.leftNeighbourArr = [];
  this.topNeighbourArr = [];
  this.belowNeighbourArr = [];
}; // defineDirection function


gd.EnemySoldierWild = function(x,y,sprite,ID){
  this.type = 'SoldierWild';
  gd.EnemySoldier.call(this,x,y,sprite,ID);
};
gd.EnemySoldierWild.prototype = Object.create(gd.EnemySoldier.prototype);
gd.EnemySoldierWild.prototype.constructor = gd.EnemySoldierWild;

gd.testEnemy = {};
gd.makeEnemySoldierWild = function(){
  gd.testEnemy = new gd.EnemySoldierWild(100,100,'images/enemy-bug.png',70); 
};
/*
*
*
* ENEMY ADDITIONAL FUNCTIONS
*
*
*/
/*
while(i != 1){
if(gd.checkCollisions.search('collisionID') != -1){
sliceStart = collisions.search('collisionID')+11;
sliceEnd = collisions.slice(sliceStart).search(';');
searchResult = collisions.slice(sliceStart,sliceStart+sliceEnd);
searchResult = Number(searchResult);
collisionsArr.push(searchResult);
collisions = collisions.slice(sliceStart+sliceEnd);
} else {
i = 1;
};
};
*/   
gd.swarmEnemies = function(){
  
  
  for(var i = 10,j=0, k=0;i<(4+gd.getRandomInt(0,1))+10;i++){
    
    //  for(var i = 0,j=0, k=0;i<((gd.numRows-2)*2+gd.getRandomInt(0,8));i++){
    j++;
    if(j>(gd.numRows-3)){j=0;};
    // j++;
    if(gd.allGameObjects[i] == 'free'){
      
      gd.allGameObjects[i] = new gd.EnemySoldier(i,((j+1)*gd.cellHeight-gd.cellHeight+gd.cellHeight*0.25),'images/enemy-bug.png',i,'right','enemy');
      //while(k!=1){
      if(!(gd.checkCollisions(gd.allGameObjects[i],gd.allGameObjects).search('collision')==-1)){
        gd.allGameObjects[i].x -= gd.cellWidth;
      } else {
        k = 1;
      }; 
      gd.allGameObjects[i].nativeRow = (j+1)*gd.cellHeight-gd.cellHeight*0.75;
    };

  };// for i - main loop
};// function
