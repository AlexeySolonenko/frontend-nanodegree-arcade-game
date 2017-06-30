// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
  this.sprite = 'images/char-boy.png';
  this.x = userVars.xCell*2;
  this.y = userVars.yCell*userVars.yCells-userVars.yCell*1.5;
};

Player.prototype.update = function(dt){
  
};
Player.prototype.speed = 1;

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput = function(key){
  
  //if((this.x<0) || (this.y<0) || (this.x > (document.body.canvas.width-this.width)));
  
    if((key == 'left')&&(this.x>0)) this.x = this.x-userVars.xCell*this.speed;
    if((key == 'up')&&(this.y>0)) this.y = this.y-userVars.yCell*this.speed;
    if((key == 'right')&&(this.x < ((document.getElementsByTagName("CANVAS")[0].width) - 110))) 
      this.x = this.x+this.speed*userVars.xCell;
    if((key == 'down')&& (this.y < ((document.getElementsByTagName("CANVAS")[0].width) - userVars.xCell*1.5-5))) this.y = this.y+this.speed*userVars.yCell;
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0;i<2;i++){
  allEnemies[i] = new Enemy(i,i);
};
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify obj.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode],player);
});


