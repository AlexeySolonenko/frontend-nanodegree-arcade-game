
gd.player = new gd.Player('images/char-boy.png');



/*
var checkCollisions = function(){
  
  gd.allEnemies.forEach(function(enemy){

    var xReach = gd.cellWidth * 0.6;
    var yReach = gd.cellHeight * 0.6;
    if(
        (Math.abs(enemy.x - gd.player.x) < xReach)&&
        (Math.abs(enemy.y - gd.player.y) < yReach)
      )
      {
        // console.log('collision');
        gd.player.dying();
      }
  });
};
*/

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
  gd.player.moveUp();
};
document.getElementsByClassName('btnLeft')[0].onclick = function(){
  gd.player.moveLeft();
};
document.getElementsByClassName('btnDn')[0].onclick = function(){
  gd.player.moveDown();;
};
document.getElementsByClassName('btnRight')[0].onclick = function(){
  gd.player.moveRight();
};
document.getElementsByClassName('btnPause')[0].onclick = function(){
  gd.pause();
};


