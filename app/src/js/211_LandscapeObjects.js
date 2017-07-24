



/*
*
*
* LANDSCAPE OBJECTS
* FENCES, STONES, WATER, SANDS, WALLS, GRASS, ETC. 
* AS A RULE - NOT PASSABLE. IN FUTURE WILL BE INTRODUCED
* A PASSABLE PROPERTY
*/

gd.landscape = {}; // object describing not-interactive, static
// and etc. objects like stones, sands, walls, barriers, fences. etc.

gd.landscape.stones = {}; // properties and settings for stones
gd.landscape.stones.numStones = 0;
gd.landscape.stones.Enabled = true;

gd.landscape.stones.calcNumStones = function(){
  var stoneZoneArea = 4;//build 0 to 2 stones max per each 8 
  var numStoneZones = (gd.numCols*gd.numRows -
   (gd.numRows*gd.numCols % stoneZoneArea)) / stoneZoneArea;
  var numStones = 0;
  var rand = 0;
  var j = 0;
  for(var i = 0;i<numStoneZones;i++){
    rand = gd.getRandomInt(0,9);
    j = 0;
    if(rand<3){j = 1;}
    else if(rand<1){j = 2;}
    else {j = 0;};
    numStones = numStones + j;
  }  
  return numStones;
};




// landscape Object superClass constructor
gd.landscape.LandscapeObject = function(sprite, type, kind, ID){
  this.sprite = sprite;
  this.type = type;
  this.kind = kind;
  this.leftNeighbour = 'free';
  this.rightNeighbour = 'free';
  this.belowNeighbour = 'free';
  this.topNeighbour = 'free';
  this.leftNeighbourArr = [];
  this.rightNeighbourArr = [];
  this.topNeighbourArr = [];
  this.belowNeighbourArr = [];
  this.collidees = [];
  this.ID = ID;
  var obj1 = {};
  obj1.x = gd.cellWidth * gd.getRandomInt(0,gd.numCols-2)+2*gd.cellWidth;
  obj1.y = 0;
  function checkY(obj){
    obj.y = gd.cellHeight * gd.getRandomInt(0,gd.numRows)+gd.cellHeight*0.25;
    if((obj.y>(gd.numRows-3)*gd.cellHeight)||(obj1.y < gd.cellHeight)){
      obj = checkY(obj);
      return obj;
    } else{
      return obj;
    };
  };
  obj1 = checkY(obj1);
  obj1.collidees = [];
  obj1.leftNeighbourArr = [];
  obj1.rightNeighbourArr = [];
  obj1.topNeighbourArr = [];
  obj1.belowNeighbourArr = [];
  
  function checkCollision(obj){
    for(var i = 0;i<gd.allGameObjects.length;i++){
      if(gd.allGameObjects[i]!='free'){
        if(gd.allGameObjects[i].kind=='stone'){
          gd.checkCollisions(obj,gd.allGameObjects[i]);
        }
      };
    };
    if(obj.collidees.length>0){
      obj.collidees = [];
      obj.x = gd.cellWidth * gd.getRandomInt(0,gd.numCols-1)+gd.cellWidth;
      obj = checkCollision(obj);
      return obj;
    } else{
      return obj;
    };
  };
  obj1 = checkCollision(obj1);
  
  // find x, check for collisions, do not put on 
  // water and to not put on grass
  this.y = obj1.y;
  this.x = obj1.x;
};
gd.landscape.LandscapeObject.prototype.constructor = gd.landscape.LandscapeObject;

gd.landscape.LandscapeObject.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y,gd.spriteWidth,gd.spriteHeight);

};

gd.landscape.LandscapeObject.prototype.move = function(){
  
};

gd.landscape.build = function(sprite){
  gd.landscape.stones.numStones = gd.landscape.stones.calcNumStones();
  for(var i = 101;i<gd.landscape.stones.numStones+101;i++){
    gd.allGameObjects[i] = new gd.landscape.LandscapeObject('images/Rock.png','blocked','stone',i);
  };
};


gd.landscape.renderAll = function(){
  for(var i = 0;i < gd.allGameObjects.length;i++){
    if((gd.allGameObjects[i].type=='blocked') && (gd.allGameObjects[i].kind=='stone')){
      gd.allGameObjects[i].render();
    };
  };
};

