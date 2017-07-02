

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
gd.allEnemies = [];
for(var i = 0;i<6;i++){
  var j = i;
  if(j>2) j = 0;
  gd.allEnemies[i] = new gd.EnemySoldier(i,((j+1)*userVars.yCell-userVars.yCell*.25),'images/enemy-bug.png');
};
gd.player = new gd.Player('images/char-boy.png');
var checkCollisions = function(){
  gd.allEnemies.forEach(function(enemy){
    if(
      (Math.abs(enemy.x - gd.player.x) < userVars.xCell/2)&&
      (Math.abs(enemy.y - gd.player.y) < userVars.yCell/2)
      )
      {
        console.log('collision');
        gd.player.dying();
      }
  });
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify obj.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'P',
        112: 'p'
    };

    gd.player.handleInput(allowedKeys[e.keyCode],gd.player);
});

document.getElementsByClassName('btnUp')[0].onclick = function(){
  console.log('hello');
};
document.getElementsByClassName('btnLeft')[0].onclick = function(){
  console.log('hello');
};
document.getElementsByClassName('btnDn')[0].onclick = function(){
  console.log('hello');
};
document.getElementsByClassName('btnRight')[0].onclick = function(){
  console.log('hello');
};
