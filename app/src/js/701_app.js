
gd.player = new gd.Player('images/char-boy.png');





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify obj.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'P',
        112: 'p',
        81 : 'q',
        113 : 'Q',
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



