



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
  this.speed = gd.getRandomInt(100,200);
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
  if(this.y > ((document.getElementsByTagName("CANVAS")[0].height) - 2*gd.cellHeight)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.x < (0 - 6*gd.cellWidth)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.y < (-gd.cellHeight*0.5)) {
    gd.allGameObjects[this.ID] = 'free';
  };
  if(this.leftattempts > 30){
    gd.allGameObjects[this.ID] = 'free';
  };
};


// @param: dt, a time delta between ticks
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
  this.dodging = 0;
  this.leftback = 0;
  this.rightStep = 0;
  this.leftattempts = 0;
  gd.Enemy.call(this,x,y,sprite,ID,direction,type);
};
gd.EnemySoldier.prototype = Object.create(gd.Enemy.prototype);
gd.EnemySoldier.prototype.constructor = gd.EnemySoldier;

/*
*
*
* ENEMY-SOLDIER DEFINE DIRECTION FUNCTION
*
*
*/


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
  
  // Let's make shortnamed local variables for surroundings
  var rightFree = false; // if no enemy and not blocked on the right
  var leftFree = false; // if no enemy and not blocked on the left
  var topFree = false; // if no enemy and not blocked on the top
  var belowFree = false; // if no enemy and not blocked below
  
  // functions to define if there are enemies and/or obstacles among
  // neighbours in each direction;
  
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
  
  rightFree = gd.notBlockedNoEnemy1(this.rightNeighbourArr);
  leftFree = gd.notBlockedNoEnemy1(this.leftNeighbourArr);
  topFree = gd.notBlockedNoEnemy1(this.topNeighbourArr);
  belowFree = gd.notBlockedNoEnemy1(this.belowNeighbourArr);
  
  // local shortnamed variables to designate direction;
  var up = false;
  var down = false;
  var stay = false;
  var right = false;
  var left = false;
  var belowNative = false;
  var aboveNative = false;
  var inNative = false;
  
  if(this.direction == 'up'){up = true;down = false;stay = false;right = false;left = false;};
  if(this.direction == 'down'){up = false;down = true;stay = false;right = false;left = false;};
  if(this.direction == 'stay'){up = false;down = false;stay = true;right = false;left = false;};
  if(this.direction == 'right'){up = false;down = false;stay = false;right = true;left = false;};
  if(this.direction == 'left'){up = false;down = false;stay = false;right = false;left = true;};  

  if(this.y > this.nativeRow*1.05){belowNative = true;};
  if(this.y < this.nativeRow*0.95){aboveNative = true;};
  
  // local shortnamed variable to designate dodging;
  var dodging = false;
  var steppedLeft = false;
  var steppedRight = false;
  
  if(this.dodging>0){ dodging = true;} else { dodging = false;};
  
  if((this.leftback-this.x)>(0.3*gd.cellWidth)){steppedLeft = true;}
  else {steppedLeft = false;};
  
  if((this.x - this.rightStep)>(0.3*gd.cellWidth)&&(this.rightStep!=0)){
    steppedRight = true;
  };
  
  /* if(dodging){
    
  } else if(returning&&(!dodging)){
    
  } else if((!dodging){
    
  };*/
  
  if((right)&&(!rightFree)&&(!dodging)){
    if((topFree)&&(belowFree)){
      if(upOrDown){this.direction = 'up';};
      if(!upOrDown){this.direction = 'down';};
    } else if(topFree){this.direction = 'up';
    } else if (belowFree){this.direction = 'down';
    } else if ((!topFree)&&(!belowFree)){
      this.direction = 'left';
      this.leftback = this.x;
    };
    this.dodging++;
  } else if((!dodging)&&rightFree){
    this.direction = 'right';
    //if(steppedRight){this.rightStep = this.x;};
    if(this.rightStep==0){this.rightStep = this.x};
  } else if(dodging&&left&&steppedLeft&&topFree&&belowFree){
      if(upOrDown){this.direction = 'up';};
      if(!upOrDown){this.direction = 'down';};
      this.dodging++;
      this.leftback = 0;
  } else if(dodging&&left&&steppedLeft&&topFree){
    this.direction = 'up';
    this.dodging++;
    this.leftback = 0;
  } else if(dodging&&left&&steppedLeft&&belowFree){
    this.direction = 'down';
    this.dodging++;
    this.leftback = 0;
  } else if(dodging&&(up||down)&&rightFree){
    this.direction = 'right';
    this.dodging = 0;
  } else if(dodging&&up&&(!topFree)){
    this.direction = 'left';
    this.leftback = this.x;
  } else if(dodging&&down&&(!belowFree)){
    this.direction = 'left';
    this.leftback = this.x;
    
  };
  if((!dodging)&&topFree&&belowNative&&right&&steppedRight){
    this.direction = 'up';
  };
  if((!dodging)&&belowFree&&aboveNative&&right&&steppedRight){
    this.direction = 'down';
  };
  if(((!belowNative)&&(!aboveNative))||dodging){
    this.rightStep = 0;
  };
  if(left){this.leftattempts++;};
}; 

/**
* 
* END OF   defineDirection function   
*
*/

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
  
  
  //for(var i = 10,j=0, k=0;i<(4+gd.getRandomInt(0,1))+10;i++){
    
  for(var i = 0,j=0, k=0;i<((gd.numRows-2)+gd.getRandomInt(0,3));i++){
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
