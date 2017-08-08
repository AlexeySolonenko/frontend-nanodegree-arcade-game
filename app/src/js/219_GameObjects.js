


/*
*
*
* GD MOVING OBJECT
*
*
*/

gd.MovingObject = function(){
  this.x = arguments[0];
  this.y = arguments[1];
  this.sprite = arguments[2];
  this.ID = arguments[3];
  this.speed = arguments[4];
  this.direction = arguments[5];
  this.type = arguments[6];
  this.leftNeighbour = 'free'; // can be   enemy || player || blocked ||  free
  this.rightNeighbour = 'free';
  this.topNeighbour = 'free';
  this.belowNeighbour = 'free';
  this.leftNeighbourArr = [];
  this.rightNeighbourArr = [];
  this.topNeighbourArr = [];
  this.belowNeighbourArr = [];
  this.collidees = [];
  this.kind='movingObject';
  
};

//gd.MovingObject.prototype.constructor = gd.MovingObject;

gd.MovingObject.prototype.test = function(){
  console.log('test');
};
gd.MovingObject.prototype.move = function(dt){  
 
  var incr = 0;
  incr = gd.movementFrozen*(dt*this.speed-(dt*this.speed)%1); 

  if(this.direction == 'right'){this.x = this.x + incr;};
  if(this.direction == 'left'){this.x = this.x - incr;};
  if(this.direction == 'down'){this.y = this.y + incr;};
  if(this.direction == 'up'){this.y = this.y - incr;};  
  if(this.direction == 'stay'){this.x = this.x; this.y = this.y;};
 

};

gd.notBlockedNoEnemy1 = function(arr){
  var types = '';
  for(var i = 0;i<arr.length;i++){
    types += gd.allGameObjects[arr[i]].type;    
  };
  if((types.search('blocked')==-1)&&(types.search('enemy')==-1)){
    return true;
  } else return false;
};
  
gd.blockedOrEnemy1 = function(arr){
  var types = '';
  for(var i = 0;i<arr.length;i++){
    types += gd.allGameObjects[arr[i]].type;    
  };
  if((types.search('blocked')!=-1)||(types.search('enemy')!=-1)){
    return true;
  } else return false;
};



