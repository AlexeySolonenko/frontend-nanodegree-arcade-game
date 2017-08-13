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

    gd.allGameObjects[0].handleInput(allowedKeys[e.keyCode],gd.allGameObjects[0]);
});

document.getElementsByClassName('btnUp')[0].onclick = function(){
  gd.allGameObjects[0].moveUp();
};
document.getElementsByClassName('btnLeft')[0].onclick = function(){
  gd.allGameObjects[0].moveLeft();
};
document.getElementsByClassName('btnDn')[0].onclick = function(){
  gd.allGameObjects[0].moveDown();;
};
document.getElementsByClassName('btnRight')[0].onclick = function(){
  gd.allGameObjects[0].moveRight();
};
document.getElementsByClassName('btnPause')[0].onclick = function(){
  gd.pause();
};



