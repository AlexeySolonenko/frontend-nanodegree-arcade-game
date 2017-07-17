



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
gd.Enemy = function(x,y,sprite,ID) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = 0 - gd.getRandomInt(1,5)*gd.cellWidth;
    this.speed = gd.getRandomInt(40,200);
    this.y = y;
    this.ID = ID; // address in gd.allEnemies array to referr to
    this.attacking = false;
};
gd.Enemy.prototype.constructor = gd.Enemy;

gd.Enemy.prototype.dying = function(){
  gd.allEnemies[this.ID] = 'free';
}

gd.Enemy.prototype.cannotDoIt = function(){
  
};

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

/*
*
*
* MOVE METHODE AND METHODE HELPERS
*
*
*
*/
gd.Enemy.prototype.move = function(dt){
  
   
  var upOrDown = 1;
  upOrDown = gd.getRandomInt(1,2);
  var obstacleAtRight = false;
  obstacleAtRight = !(gd.checkCollisions(gd.landscape.objects,this).search('atleft') == -1);
  // var notBeyondRightBorder = false;
  // notBeyondRightBorder = (this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth));
  var obstacleAtop = false;
  obstacleAtop = !(gd.checkCollisions(gd.landscape.objects,this).search('below') == -1);
  var notBeyondBottomBorder = false;
  notBeyondBottomBorder = (this.y < (document.getElementsByTagName("CANVAS")[0].height - gd.cellHeight*3.5));
  var obstacleBelow = false;
  obstacleBelow = !(gd.checkCollisions(gd.landscape.objects,this).search('atop') == -1);
  if(!obstacleAtRight){
    this.x = this.x + dt*this.speed*gd.movementFrozen;
  } else if(obstacleAtRight){
    if(gd.debugKey1){console.log(upOrDown);};
    if((!obstacleAtop)&&(!obstacleBelow)){
      if((upOrDown == 1)&&(this.y > gd.cellHeight)){this.moveUp();}
      else if((upOrDown == 2)&&(notBeyondBottomBorder)){this.moveDown();}
      else{
        this.moveLeft();
        if(!obstacleAtop){this.moveUp;}
        else if(!obstacleBelow){this.moveDown;};
      }
      ;
    } else if((obstacleAtop)&&(!obstacleBelow)&&(notBeyondBottomBorder)){
      this.moveDown();
    } else if((!obstacleAtop)&&(obstacleBelow)&&(this.y>gd.cellHeight)){
      this.moveUp();
  //  } else if((obstacleAtop)&&(obstacleBelow)){
    } else {
      this.moveLeft();
      if(!obstacleAtop){this.moveUp;}
      else if(!obstacleBelow){this.moveDown;};
    };
  }; // if there is obstacle at right

    
  // ENNEMY DYING IN ALL CASES
  if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - gd.cellWidth)) {
    gd.allEnemies[this.ID] = 'free';
  // gd.this.dying();
  
  //this = 'free';
  };
  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
gd.Enemy.prototype.update = function(dt){
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  this.move(dt);
  
  /*
  var upOrDown = 1;
  upOrDown = gd.getRandomInt(1,2);
  var obstacleAtRight = false;
  obstacleAtRight = !(gd.checkCollisions(gd.landscape.objects,this).search('atleft') == -1);
  // var notBeyondRightBorder = false;
  // notBeyondRightBorder = (this.x<(document.getElementsByTagName("CANVAS")[0].width - gd.cellWidth));
  var obstacleAtop = false;
  obstacleAtop = !(gd.checkCollisions(gd.landscape.objects,this).search('below') == -1);
  var notBeyondBottomBorder = false;
  notBeyondBottomBorder = (this.y < (document.getElementsByTagName("CANVAS")[0].height - gd.cellHeight*3.5));
  var obstacleBelow = false;
  obstacleBelow = !(gd.checkCollisions(gd.landscape.objects,this).search('atop') == -1);
  if(!obstacleAtRight){
    this.x = this.x + dt*this.speed*gd.movementFrozen;
  } else if(obstacleAtRight){
    if(gd.debugKey1){console.log(upOrDown);};
    if((!obstacleAtop)&&(!obstacleBelow)){
      if((upOrDown == 1)&&(this.y > gd.cellHeight)){this.moveUp();}
      else if((upOrDown == 2)&&(notBeyondBottomBorder)){this.moveDown();}
      else{
        this.moveLeft();
        if(!obstacleAtop){this.moveUp;}
        else if(!obstacleBelow){this.moveDown;};
      }
      ;
    } else if((obstacleAtop)&&(!obstacleBelow)&&(notBeyondBottomBorder)){
      this.moveDown();
    } else if((!obstacleAtop)&&(obstacleBelow)&&(this.y>gd.cellHeight)){
      this.moveUp();
  //  } else if((obstacleAtop)&&(obstacleBelow)){
    } else {
      this.moveLeft();
      if(!obstacleAtop){this.moveUp;}
      else if(!obstacleBelow){this.moveDown;};
    };
  }; // if there is obstacle at right

    
  // ENNEMY DYING IN ALL CASES
  if(this.x > ((document.getElementsByTagName("CANVAS")[0].width) - gd.cellWidth)) {
    gd.allEnemies[this.ID] = 'free';
  // gd.this.dying();
  
  //this = 'free';
  };
  */
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
gd.EnemySoldier = function(x,y,sprite,ID){
  gd.Enemy.call(this,x,y,sprite,ID);
}
gd.EnemySoldier.prototype = Object.create(gd.Enemy.prototype);
gd.EnemySoldier.prototype.constructor = gd.EnemySoldier;

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

gd.swarmEnemies = function(){
  for(var i = 0,j=0;i<((gd.numRows-2)*2+gd.getRandomInt(0,20));i++){
    j++;
    if(j>(gd.numRows-3)){j=0;};
    // j++;
    if(gd.allEnemies[i] == 'free'){  
        gd.allEnemies[i] = new gd.EnemySoldier(i,((j+1)*gd.cellHeight-gd.cellHeight*0.75),'images/enemy-bug.png',i);
        //j++;
    };
    if(gd.debugKey1){
      console.log(j);
    };
  };// for i - main loop
};// function
