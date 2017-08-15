


gd.enemyMessages = [
  'Hungry',
  'Eat tummy',
  'Smell meat',
  'Eat human',
  'Eat eyes',
  'Eat brains',
  'Crispy palms',
  'Smell prey',
  'I follow',
  'Grrrr',
  'Shshshshs',
  'Click clack',
  'Hot tips for tongue'
];

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
  this.hasMessage = false;
  this.speaking = false;
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
  var enemyMessageDiv = '';
  enemyMessageDiv = '.enemy-' + this.ID + '-html';
  // enemyMessageDivExists = false;
  // if($(enemyMessageDiv).html().length<2){enemyMessageDiv = false;};
  
  if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - gd.cellWidth)) {
    gd.allGameObjects[this.ID] = 'free';
    if(enemyMessageDiv){$(enemyMessageDiv).remove();};
    $(enemyMessageDiv).remove();
  };
  
  if(this.y > ((document.getElementsByTagName("CANVAS")[0].height) - 2*gd.cellHeight)) {
    gd.allGameObjects[this.ID] = 'free';
    if(enemyMessageDiv){$(enemyMessageDiv).remove();};
    $(enemyMessageDiv).remove();
  };
  
  if(this.x < (0 - 6*gd.cellWidth)) {
    gd.allGameObjects[this.ID] = 'free';
    if(enemyMessageDiv){$(enemyMessageDiv).remove();};
    $(enemyMessageDiv).remove();
  };
  
  if(this.y < (-gd.cellHeight*0.5)) {
    gd.allGameObjects[this.ID] = 'free';
    if(enemyMessageDiv){$(enemyMessageDiv).remove();};
    $(enemyMessageDiv).remove();
  };
  
  if(this.leftattempts > 30){
    gd.allGameObjects[this.ID] = 'free';
    if(enemyMessageDiv){$(enemyMessageDiv).remove();};
    $(enemyMessageDiv).remove();
  };
};


// @param: dt, a time delta between ticks
gd.Enemy.prototype.update = function(dt){
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.move(dt);
 
}; // update


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


gd.EnemySoldier.prototype.defineDirection = function() {
  
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


/*
*
*
* ENEMY WILD CLASS
*
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

/**
* 
* END OF   ENEMY WILD CLASS
*
*/

/*
*
*
* ENEMY ADDITIONAL FUNCTIONS
*
*
*/

  
gd.swarmEnemies = function() {
  
  
  //for(var i = 10,j=0, k=0;i<(4+gd.getRandomInt(0,1))+10;i++){
    
  for(var i = 10,j=0, k=0;i<((gd.numRows-2)+gd.getRandomInt(0,3))+10;i++) {
    j++;
    if(j>(gd.numRows-3)){j=0;};
    // j++;
    if(gd.allGameObjects[i] == 'free') {
      gd.allGameObjects[i] = new gd.EnemySoldier(i,((j+1)*gd.cellHeight-gd.cellHeight+gd.cellHeight*0.25),'images/enemy-bug.png',i,'right','enemy');
      //while(k!=1){
      if(!(gd.checkCollisions(gd.allGameObjects[i],gd.allGameObjects).search('collision')==-1)) {
        gd.allGameObjects[i].x -= gd.cellWidth;
      } else {
        k = 1;
      }; 
      gd.allGameObjects[i].nativeRow = (j+1)*gd.cellHeight-gd.cellHeight*0.75;
    };

  };// for i - main loop
};// swarmEnemies


gd.updateEnemiesDirections = function(dt){
  for(var i = 0;i<gd.allGameObjects.length;i++){
    if(gd.allGameObjects[i].type == 'enemy'){
      gd.allGameObjects[i].defineDirection();
      gd.allGameObjects[i].update(dt);  
    };
  };
}; // updateEnemiesDirections


gd.deleteEnemiesWentOutOfScreen = function(dt){
  for(var i = 0;i<gd.allGameObjects.length;i++){
    if(gd.allGameObjects[i].type == 'enemy'){
    // gd.checkCollisions(gd.allGameObjects[i],gd.allGameObjects);
    gd.allGameObjects[i].eraser();  
    };
  };
}; // deleteEnemiesWentOutOfScreen


/*
*
*
* GENERATE DIVS FOR TOOLTIPS OF ENEMIES FUNCTION
*
*
*/

gd.generateDivsForTooltipsOfEnemies = function() {
  
  for(var i = 10; i < gd.allGameObjects.length; i++) {
    var formattedHTML = '';
    if((gd.allGameObjects[i] != 'free') && (gd.allGameObjects[i].type == 'enemy')&& (gd.allGameObjects[i].hasMessage == false)) {
      gd.allGameObjects[i].hasMessage = true;
      formattedHTML = '<div class="enemy-'+gd.allGameObjects[i].ID+'-html"><b><small><span></span></small></b></div>';
      $('.html-atop-canvas').prepend(formattedHTML);
    }; // if not free and enemy
  }; // for 
};

/*
*
*
* ENEMY TELL FUNCTION
*
*
*/
window.hideEnemyMessage = function(div, obj) {
    
    setTimeout(function() {
      $(div).css('visibility','hidden');
      $(div).text('');
      if(obj.hasOwnProperty('speaking')){obj.speaking = false;};
  }, 2000);
  
};

gd.generateEnemyMessage = function() {
  var msg = '';
  var rand = gd.getRandomInt(0,gd.enemyMessages.length);
  
  msg = gd.enemyMessages[rand];
  return msg;
}

gd.Enemy.prototype.enemyTalking = function(msg) {  
  var enemyMessageDiv = '.enemy-' + this.ID + '-html'; 
  var obj = gd.allGameObjects[this.ID];
  var ifGoingToTalk = false;
  var rand = 0;
  rand = gd.getRandomInt(0,200);
  if(rand > 197){ifGoingToTalk = true;};
  if(gd.debugKey1){console.log(this);};
  if((this.speaking == false) && (ifGoingToTalk)) {
    $(enemyMessageDiv + ' span').text(msg);
    $(enemyMessageDiv).css('visibility','visible');
    this.speaking = true;
    window.hideEnemyMessage(enemyMessageDiv, obj);
  };  
};


/*
*
*
* ENEMIES TALKING
*
*
*/

gd.enemiesTalking = function() {
  var msg = '';
  for(var i = 10; i < gd.allGameObjects.length; i++) {
    if((gd.allGameObjects[i] != 'free') && (gd.allGameObjects[i].type == 'enemy') && (gd.allGameObjects[i].hasMessage)) {
      msg = gd.generateEnemyMessage();
      gd.allGameObjects[i].enemyTalking(msg);
    }; // if not free and enemy
  }; // for 
};






