



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
    this.x = this.x + dt*this.speed*gd.movementFrozen;
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
