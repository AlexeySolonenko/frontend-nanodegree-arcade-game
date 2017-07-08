

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




gd.checkCollisions = function(obj1,obj2){
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
  var xCloseBy = gd.cellWidth*1.2;
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
      if((dtX < 0)&&(dtXabs < xCloseBy)&&(dtYabs < yCollided)){
        result = result + ' atright';
        // console.log('atright');
      };
      if((dtX > 0)&&(dtXabs < xCloseBy)&&(dtYabs < yCollided)){
        result = result + ' atleft';
        // console.log('atleft');
      };
      if((dtY < 0)&&(dtYabs < yCloseBy)&&(dtXabs < xCollided)){
        result = result + ' below';
       // console.log('atop');
      };
      if((dtY > 0)&&(dtYabs < yCloseBy)&&(dtXabs < xCollided)){
        result = result + ' atop';
        // console.log('below');
      };
      
      if((dtXabs < xCollided)&&(dtYabs < yCollided)){
        result = result+'collision';
        console.log('collision');
      };
      // console.log('result ',result,', ',dtXabs,', ',dtYabs,' ,',dtX,', ',dtY);
      return result;
    };
  };
 
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
  
};

