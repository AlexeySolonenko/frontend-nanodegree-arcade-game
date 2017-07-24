

/*
*
*
* SYSTEM-LEVEL VARIABLES AND FUNCTIONS
* Game control, pause, main menu, etc.
*
*
*/

gd.paused = false;
gd.gamePaused = 1;
gd.movementFrozen = 1; 
gd.hitsInThisCycle = 0;
gd.debugKey1 = false;

gd.pause = function(main){
if (gd.paused == true)
  {
    gd.paused = false;
    gd.gamePaused = 1;
    gd.movementFrozen = 1;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is running.";
    //window.requestAnimationFrame(main);
  }
else
  {
    gd.paused = true;
    gd.gamePaused = 0;
    gd.movementFrozen = 0;
    document.getElementsByClassName('infoPanel')[0].textContent = "Game is paused.";
  };
};



/*
*
*
* CHECK COLLISIONS - CRUCIAL, UNDER CONTINOUS EXPANSION
* AND KEY, CORNERSTONE GAME FUNCTION
* Returns a string concatenated of descriptions of 
* positional relations of obj2 to obj1
* accepts two arguments - obj1 and obj2
* any argument can be either Object or Array
* if some of the arguments is not Object and not Array
* 
*/

gd.resetPosRelations = function(obj){
 if(obj.hasOwnProperty('rightNeighbourArr')){obj.rightNeighbour=[];};
 if(obj.hasOwnProperty('leftNeighbourArr')){obj.leftNeighbour=[];};
 if(obj.hasOwnProperty('topNeighbourArr')){obj.topNeighbour=[];};
 if(obj.hasOwnProperty('belowNeighbourArr')){obj.belowNeighbour=[];};
 if(obj.hasOwnProperty('collidees')){obj.collidees=[];};
};


gd.checkCollisions = function(obj1,obj2){
  
  // TO REVIEW
  // return array of descriptive words about
  // how obj2 relates to obj1;
  // OBJ1 OBJ2 - AT RIGHT
  
  // OBJ2 OBJ1 - AT LEFT
  
  // OBJ1
  // OBJ2 - BELOW
  
  // OBJ2
  // OBJ1 - ATOP
  
  var result = '';
  if((obj1 == undefined)||(obj2==undefined)){return result};
  
  var dtX =  0;
  var dtY = 0;
  var dtXabs = 0;
  var dtYabs = 0;
  var xRelation = 0;
  var yRelation = 0;
  var xCloseBy = gd.cellWidth*1.1;
  var yCloseBy = gd.cellHeight*1.5;
  var xNeighbour = false;
  var yNeighbour = false;
  var xCollided = gd.cellWidth*0.5;
  var yCollided = gd.cellHeight*0.5;
  var i = 0; // var for for statements iterations
  var j = 0; // var for for statements iterations
  // if obj1 and obj2 are simple objects  
  if((obj1 instanceof Object)&&(obj2 instanceof Object)&&(!(obj1 instanceof Array))&&(!(obj2 instanceof Array))){
    // collision / atleft / atright / atop / below 

  
    if((obj1 == undefined)||(obj2==undefined)){
      return result;
    } else {
      
      
      dtX = obj1.x - obj2.x;
      dtY = obj1.y - obj2.y;
      dtXabs = (Math.abs(obj1.x - obj2.x));
      dtYabs = (Math.abs(obj1.y - obj2.y));

      if((dtX < 0)&&(dtXabs <= gd.cellWidth*0.7)&&(dtXabs >= gd.cellWidth*0.5)&&(dtYabs <= gd.cellHeight)){
        result = result + ' atright';
        if(obj1.rightNeighbourArr.indexOf(obj2.ID)==-1){obj1.rightNeighbourArr.push(obj2.ID);};
      };
      if((dtX > 0)&&(dtXabs <= gd.cellWidth*0.7)&&(dtXabs >= gd.cellWidth*0.5)&&(dtXabs <= gd.cellWidth)&&(dtYabs <= gd.cellHeight)){
        result = result + ' atleft';
        if(obj1.leftNeighbourArr.indexOf(obj2.ID)==-1){obj1.leftNeighbourArr.push(obj2.ID);};
      };
      if((dtY < 0)&&(dtYabs >= gd.cellHeight*0.5)&&(dtYabs < gd.cellHeight*0.7)&&(dtXabs <= gd.cellWidth)){
        result = result + ' below';
        if(obj1.belowNeighbourArr.indexOf(obj2.ID)==-1){obj1.belowNeighbourArr.push(obj2.ID);};
      };//dfg
      if((dtY > 0)&&(dtYabs >= gd.cellHeight*0.5)&&(dtYabs < gd.cellHeight*0.7)&&(dtXabs <= gd.cellWidth)){
        result = result + ' atop';
        if(obj1.topNeighbourArr.indexOf(obj2.ID)==-1){obj1.topNeighbourArr.push(obj2.ID);};
      };
      
      if((dtXabs < xCollided)&&(dtYabs < yCollided)){
        if(obj1.collidees.indexOf(obj2.ID)==-1){obj1.collidees.push(obj2.ID);};
        if(obj1.ID){result = result+'collisionID'+obj1.ID+';';}
        else {result = result+'collision';};
        // console.log('collision');
      };
      // console.log('result ',result,', ',dtXabs,', ',dtYabs,' ,',dtX,', ',dtY);
      return result;
    };
  }; // end of if statement - both are objects
 
  // if obj1 is an array, and obj2 is an object
  if((obj1 instanceof Array)&&(obj2 instanceof Object)&&(!(obj2 instanceof Array))){
  //  console.log('arr and obj');
    for(i=0;i<obj1.length;i++){
      result = result + gd.checkCollisions(obj1[i],obj2);
    };
    return result;
  };
  // if obj2 is an object and obj2 is an array
  if((obj1 instanceof Object)&&(!(obj1 instanceof Array))&&(obj2 instanceof Array)){
//    console.log('obj and arr');
    for(i=0;i<obj2.length;i++){
      result = result + gd.checkCollisions(obj1,obj2[i]);
    };
    return result;
  };
  
  // if obj1 is an array and obj2 is an array
  if((obj1 instanceof Array)&&(obj2 instanceof Array)){
  //  console.log('arr and arr');
    for(i=0;i<obj1.length;i++){
      result = result + gd.checkCollisions(obj1[i],obj2);
    };
    return result;
  };
  // if arguments were not processed by any of the above 
  // then returns 
  // result = 'Arguments could not be resolved. Expect arg1 [] or {}, arg2 [] or {}';
  return result;
  
}; // checkCollisions function




gd.debugKey1Flip = function(){
  if(gd.debugKey1==true){gd.debugKey1=false}
  else{gd.debugKey1 = true;};
};


gd.allGameObjects = [];
for (var i = 0;i<200;i++){
  gd.allGameObjects[i] = 'free';
};



