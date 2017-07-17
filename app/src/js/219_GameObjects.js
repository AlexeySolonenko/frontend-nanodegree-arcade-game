


/*
*
*
* GD MOVING OBJECT
*
*
*/

gd.movingObject = function(){
  this.x = arguments[0];
  this.y = arguments[1];
  this.sprite = arguments[2];
  this.ID = arguments[3];
  this.speed = arguments[4];
  
  this.direction = 'stay';
  
   
};

gd.movingObject.prototype.constructor = gd.movingObject;


gd.movingCall = function(){
  gd.movingObject(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
};